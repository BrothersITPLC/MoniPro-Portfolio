
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
  label?: string;
}

const TelegramLoginButton: React.FC<TelegramLoginProps> = ({ botUsername, label  }) => {
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
    // script.setAttribute("data-onauth", "onTelegramAuth(user)");
    script.setAttribute("data-onauth", "onTelegramAuth");
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

//   return <div id="telegram-button-container"></div>;
    return (
    <div className="telegram-login-wrapper">
      {label && <p className="mb-2 text-sm text-gray-600">{label}</p>}
      <div id="telegram-button-container"></div>
    </div>
  );
};

export default TelegramLoginButton;
