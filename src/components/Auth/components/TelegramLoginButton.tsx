// components/TelegramLoginButton.tsx
import React, { useEffect } from "react";

declare global {
  interface Window {
    onTelegramAuth?: (user: TelegramAuthPayload) => void;
  }
}

export type TelegramAuthPayload = {
  id: number;
  first_name?: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
  auth_date: number;
  hash: string;
  [k: string]: any;
};

type Props = {
  botUsername: string;         // e.g. "my_bot"
  onSuccess?: (resp: any) => void;
  onError?: (err: any) => void;
  widgetSize?: "large" | "medium" | "small";
};

const TelegramLoginButton: React.FC<Props> = ({ botUsername, onSuccess, onError, widgetSize = "large" }) => {
  useEffect(() => {
    // Global callback used by the widget
    window.onTelegramAuth = async (user: TelegramAuthPayload) => {
      try {
        const resp = await fetch("https://monipro.brothersit.dev/api/telegram/", {
          method: "POST",
          credentials: "include", // include cookies if you use Django session auth
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(user),
        });

        const data = await resp.json();
        if (resp.ok) onSuccess?.(data);
        else onError?.(data);
      } catch (err) {
        onError?.(err);
      }
    };

    // Insert the Telegram widget script into container
    const container = document.getElementById("telegram-login-widget");
    if (!container) return;
    container.innerHTML = ""; // clear previous
    const script = document.createElement("script");
    // version param (?15) commonly used in examples — keep it or remove to use default.
    script.setAttribute("src", "https://telegram.org/js/telegram-widget.js?15");
    script.setAttribute("async", "true");
    script.setAttribute("data-telegram-login", botUsername);
    script.setAttribute("data-size", widgetSize);
    // callback: must be global function name as string
    script.setAttribute("data-onauth", "onTelegramAuth");
    // optionally request permission to send messages
    // script.setAttribute("data-request-access", "write");
    container.appendChild(script);

    return () => {
      // cleanup
      window.onTelegramAuth = undefined;
      container.innerHTML = "";
    };
  }, [botUsername, onSuccess, onError, widgetSize]);

  return <div id="telegram-login-widget" />;
};

export default TelegramLoginButton;
