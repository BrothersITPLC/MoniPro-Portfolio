// // components/TelegramLoginButton.tsx
// import React, { useEffect } from "react";

// declare global {
//   interface Window {
//     onTelegramAuth?: (user: TelegramAuthPayload) => void;
//   }
// }

// export type TelegramAuthPayload = {
//   id: number;
//   first_name?: string;
//   last_name?: string;
//   username?: string;
//   photo_url?: string;
//   auth_date: number;
//   hash: string;
//   [k: string]: any;
// };

// type Props = {
//   botUsername: string;        
//   onSuccess?: (resp: any) => void;
//   onError?: (err: any) => void;
//   widgetSize?: "large" | "medium" | "small";
// };

// const TelegramLoginButton: React.FC<Props> = ({ botUsername, onSuccess, onError, widgetSize = "large" }) => {
//   useEffect(() => {
//     // Global callback used by the widget
//     window.onTelegramAuth = async (user: TelegramAuthPayload) => {
//       try {
//         const resp = await fetch("https://monipro.brothersit.dev/api/telegram/", {
//           method: "POST",
//           credentials: "include", // include cookies if you use Django session auth
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(user),
//         });

//         const data = await resp.json();
//         if (resp.ok) onSuccess?.(data);
//         else onError?.(data);
//       } catch (err) {
//         onError?.(err);
//       }
//     };

//     // Insert the Telegram widget script into container
//     const container = document.getElementById("telegram-login-widget");
//     if (!container) return;
//     container.innerHTML = ""; // clear previous
//     const script = document.createElement("script");
//     // version param (?15) commonly used in examples — keep it or remove to use default.
//     script.setAttribute("src", "https://telegram.org/js/telegram-widget.js?15");
//     script.setAttribute("async", "true");
//     script.setAttribute("data-telegram-login", botUsername);
//     script.setAttribute("data-size", widgetSize);
//     // callback: must be global function name as string
//     script.setAttribute("data-onauth", "onTelegramAuth");
//     // optionally request permission to send messages
//     // script.setAttribute("data-request-access", "write");
//     container.appendChild(script);

//     return () => {
//       // cleanup
//       window.onTelegramAuth = undefined;
//       container.innerHTML = "";
//     };
//   }, [botUsername, onSuccess, onError, widgetSize]);

//   return <div id="telegram-login-widget" />;
// };

// export default TelegramLoginButton;


// components/TelegramLoginButton.tsx
// components/TelegramLoginButton.tsx
import React, { useEffect } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginState } from "../AutSlice";
import { useTelegramExchangeMutation } from "../api";

declare global {
  interface Window {
    TelegramLoginWidget?: any;
  }
}

interface TelegramLoginProps {
  botUsername: string;
}

const TelegramLoginButton: React.FC<TelegramLoginProps> = ({ botUsername }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [telegramExchange] = useTelegramExchangeMutation();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://telegram.org/js/telegram-widget.js?21";
    script.async = true;
    script.setAttribute("data-telegram-login", botUsername);
    script.setAttribute("data-size", "large");
    script.setAttribute("data-userpic", "false");
    script.setAttribute("data-onauth", "onTelegramAuth(user)");
    document.getElementById("telegram-button-container")?.appendChild(script);

    // global callback
    (window as any).onTelegramAuth = async (user: any) => {
      try {
        const res = await telegramExchange(user).unwrap();
        dispatch(loginState({ user: res.user }));
        toast.success("Telegram login successful!");
        navigate("/home/comp-info");
      } catch (err) {
        toast.error("Telegram authentication failed");
        console.error(err);
      }
    };
  }, [botUsername, telegramExchange, dispatch, navigate]);

  return <div id="telegram-button-container"></div>;
};

export default TelegramLoginButton;
