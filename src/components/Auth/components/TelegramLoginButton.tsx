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
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginState  } from "../AutSlice"; // adjust to your actual slice

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
  botUsername: string;
  widgetSize?: "large" | "medium" | "small";
};

const TelegramLoginButton: React.FC<Props> = ({ botUsername, widgetSize = "large" }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.auth.user);

  useEffect(() => {
    // Define handler BEFORE loading widget
    window.onTelegramAuth = async (telegramUser: TelegramAuthPayload) => {
      try {
        const resp = await fetch("https://monipro.brothersit.dev/api/telegram/", {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(telegramUser),
        });

        const data = await resp.json();
        console.log("Telegram raw API response:", data);

        if (resp.ok) {
          console.log("Telegram login success:", data);

          // Update Redux user
          dispatch(loginState (data.user));

          // Navigate based on fresh user
          const freshUser = data.user;
          if (freshUser && !freshUser.organization_info_completed) {
            navigate("/home/comp-info");
          } else if (
            freshUser?.organization_info_completed &&
            freshUser?.user_have_completed_payment !== "success"
          ) {
            navigate("/home/payment");
          } else {
            navigate("/home/dashboard");
          }
        } else {
          console.error("Telegram login error:", data);
        }
      } catch (err) {
        console.error("Telegram login error:", err);
      }
    };

    // Load Telegram script
    const container = document.getElementById("telegram-login-widget");
    if (!container) return;
    container.innerHTML = "";
    const script = document.createElement("script");
    script.src = "https://telegram.org/js/telegram-widget.js?15";
    script.async = true;
    script.setAttribute("data-telegram-login", botUsername);
    script.setAttribute("data-size", widgetSize);
    script.setAttribute("data-onauth", "onTelegramAuth");
    container.appendChild(script);

    return () => {
      window.onTelegramAuth = undefined;
      container.innerHTML = "";
    };
  }, [botUsername, widgetSize, navigate, dispatch]);

  return <div id="telegram-login-widget" className="w-full flex justify-center" />;
};

export default TelegramLoginButton;
