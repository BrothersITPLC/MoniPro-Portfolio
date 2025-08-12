import { GOOGLE_CLIENT_ID, REDIRECT_URL, SCOPE } from "@/constant/social_auth";
import { toast } from "sonner";

export const handleGoogleAuth = async () => {
  try {
    const authUrl = `https://accounts.google.com/o/oauth2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${encodeURIComponent(
      REDIRECT_URL
    )}&response_type=code&scope=${encodeURIComponent(SCOPE)}`;

    // Store auth in progress flag
    localStorage.setItem("googleAuthInProgress", "true");

    // Open the popup
    const popup = window.open(authUrl, "google-login", "width=600,height=600");

    if (!popup) {
      throw new Error(
        "Popup blocked by browser. Please allow popups for this site."
      );
    }

    // Check if popup was closed without completing auth
    const popupCheckInterval = setInterval(() => {
      if (popup.closed) {
        clearInterval(popupCheckInterval);
        if (localStorage.getItem("googleAuthInProgress")) {
          localStorage.removeItem("googleAuthInProgress");
          toast.error("Authentication cancelled");
        }
      }
    }, 1000);

    return new Promise((resolve, reject) => {
      const messageHandler = (event: MessageEvent) => {
        if (event.origin !== window.location.origin) return;

        if (
          event.data &&
          event.data.action === "google-authentication-success"
        ) {
          clearInterval(popupCheckInterval);
          window.removeEventListener("message", messageHandler);
          localStorage.removeItem("googleAuthInProgress");
          resolve(true);
        } else if (
          event.data &&
          event.data.action === "google-authentication-error"
        ) {
          clearInterval(popupCheckInterval);
          window.removeEventListener("message", messageHandler);
          localStorage.removeItem("googleAuthInProgress");
          reject(
            new Error(event.data.message || "Google authentication failed")
          );
        }
      };

      window.addEventListener("message", messageHandler);
    });
  } catch (error) {
    localStorage.removeItem("googleAuthInProgress");
    throw error;
  }
};
