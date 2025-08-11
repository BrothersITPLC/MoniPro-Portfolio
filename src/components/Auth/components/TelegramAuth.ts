import { toast } from "sonner";
import { TGREDIRECT_URL } from "@/app/constant";

const botId = import.meta.env.VITE_BOT_ID;

export const handleTelegramAuth = async () => {
  try {

    const TELEGRAM_AUTH_URL =
      `https://oauth.telegram.org/auth` +
      `?bot_id=${botId}` +
      `&origin=${encodeURIComponent(new URL(TGREDIRECT_URL).origin)}` +
      `&request_access=write`;
    
    // Flag for ongoing auth
    localStorage.setItem("telegramAuthInProgress", "true");

    // Open Telegram OAuth popup
    const popup = window.open(
      TELEGRAM_AUTH_URL,
      "telegram-login",
      "width=600,height=600"
    );

    if (!popup) {
      throw new Error(
        "Popup blocked by browser. Please allow popups for this site."
      );
    }

    // Detect popup close without auth
    const popupCheckInterval = setInterval(() => {
      if (popup.closed) {
        clearInterval(popupCheckInterval);
        if (localStorage.getItem("telegramAuthInProgress")) {
          localStorage.removeItem("telegramAuthInProgress");
          toast.error("Telegram authentication cancelled");
        }
      }
    }, 1000);

    return new Promise<void>((resolve, reject) => {
      const messageHandler = (event: MessageEvent) => {
        if (event.origin !== window.location.origin) return;

        if (
          event.data &&
          event.data.action === "telegram-authentication-success"
        ) {
          clearInterval(popupCheckInterval);
          window.removeEventListener("message", messageHandler);
          localStorage.removeItem("telegramAuthInProgress");
          resolve();
        } else if (
          event.data &&
          event.data.action === "telegram-authentication-error"
        ) {
          clearInterval(popupCheckInterval);
          window.removeEventListener("message", messageHandler);
          localStorage.removeItem("telegramAuthInProgress");
          reject(
            new Error(event.data.message || "Telegram authentication failed")
          );
        }
      };

      window.addEventListener("message", messageHandler);
    });
  } catch (error) {
    localStorage.removeItem("telegramAuthInProgress");
    throw error;
  }
};
