import { toast } from "sonner";
import {
  GITHUB_CLIENT_ID,
  GITHUB_REDIRECT_URL,
  GITHUB_SCOPE,
} from "@/constant/social_auth";

export const handleGithubAuth = async (): Promise<boolean> => {
  try {
    const authUrl = `https://github.com/login/oauth/authorize?client_id=${encodeURIComponent(
      GITHUB_CLIENT_ID
    )}&redirect_uri=${encodeURIComponent(
      GITHUB_REDIRECT_URL
    )}&scope=${encodeURIComponent(GITHUB_SCOPE)}&allow_signup=true`;

    localStorage.setItem("githubAuthInProgress", "true");

    const popup = window.open(authUrl, "github-login", "width=600,height=700");
    if (!popup) {
      throw new Error(
        "Popup blocked by browser. Please allow popups for this site."
      );
    }

    const popupCheckInterval = setInterval(() => {
      if (popup.closed) {
        clearInterval(popupCheckInterval);
        if (localStorage.getItem("githubAuthInProgress")) {
          localStorage.removeItem("githubAuthInProgress");
          toast.error("Authentication cancelled");
        }
      }
    }, 1000);

    return new Promise((resolve, reject) => {
      const messageHandler = (event: MessageEvent) => {
        if (event.origin !== window.location.origin) return;

        const payload = event.data;
        if (!payload || !payload.action) return;

        if (payload.action === "github-authentication-success") {
          clearInterval(popupCheckInterval);
          window.removeEventListener("message", messageHandler);
          localStorage.removeItem("githubAuthInProgress");
          resolve(true);
        } else if (payload.action === "github-authentication-error") {
          clearInterval(popupCheckInterval);
          window.removeEventListener("message", messageHandler);
          localStorage.removeItem("githubAuthInProgress");
          reject(new Error(payload.message || "GitHub authentication failed"));
        }
      };

      window.addEventListener("message", messageHandler);
    });
  } catch (error) {
    localStorage.removeItem("githubAuthInProgress");
    throw error;
  }
};
