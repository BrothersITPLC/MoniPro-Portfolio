import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "sonner";
import { useTelegramMutation } from "../api"; // adjust import based on your setup

export function TelegramCallback() {
  const navigate = useNavigate();
  const location = useLocation();
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [errorMessage, setErrorMessage] = useState("");
  const [telegramLogin] = useTelegramMutation();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Telegram OAuth sends the login data as URL params (or fragment)
        // Extract all query params from URL
        const urlParams = new URLSearchParams(location.search);

        // Telegram data keys based on Telegram Login Widget docs:
        // id, first_name, last_name, username, photo_url, auth_date, hash, etc.

        const telegramData: Record<string, string> = {};
        urlParams.forEach((value, key) => {
          telegramData[key] = value;
        });

        if (!telegramData.hash) {
          throw new Error("Telegram login hash is missing");
        }

        // Call RTK mutation to verify and login/signup
        const response = await telegramLogin(telegramData).unwrap();

        if (response.status === "success") {
          setStatus("success");

          if (window.opener) {
            window.opener.postMessage(
              { action: "telegram-authentication-success", user: response.user },
              window.location.origin
            );

            setTimeout(() => {
              window.opener.location.reload();
            }, 3000);
          }

          toast.success("Telegram Authentication successful!");

          setTimeout(() => {
            window.close();
          }, 3000);
        } else {
          throw new Error(response.message || "Authentication failed");
        }
      } catch (error) {
        setStatus("error");
        const message =
          error instanceof Error
            ? error.message
            : "Authentication failed. Please try again.";

        setErrorMessage(message);
        toast.error(message);

        if (window.opener) {
          window.opener.postMessage(
            { action: "telegram-authentication-error", message },
            window.location.origin
          );
        }

        setTimeout(() => {
          window.close();
        }, 3000);
      }
    };

    handleCallback();
  }, [location, telegramLogin, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96 text-center">
        <h2 className="text-2xl font-bold mb-6">Telegram Authentication</h2>

        {status === "loading" && (
          <>
            <div className="flex justify-center mb-4">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
            </div>
            <p>Processing your request...</p>
          </>
        )}

        {status === "success" && (
          <>
            <div className="flex justify-center mb-4 text-green-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <p className="text-green-600 font-medium">
              Authentication successful!
            </p>
          </>
        )}

        {status === "error" && (
          <>
            <div className="flex justify-center mb-4 text-red-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <p className="text-red-600 font-medium">Authentication failed</p>
            <p className="mt-2 text-sm text-red-500">{errorMessage}</p>
          </>
        )}

        <p className="mt-4 text-sm text-gray-500">
          This window will close automatically.
        </p>
      </div>
    </div>
  );
}
