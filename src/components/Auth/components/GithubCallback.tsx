// GithubCallback.tsx
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "sonner";
import { useGithubExchangeMutation } from "../api";

export function GithubCallback() {
  const location = useLocation();
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [errorMessage, setErrorMessage] = useState("");
  const [githubExchange] = useGithubExchangeMutation();

  useEffect(() => {
    const handleCallback = async () => {
      const urlParams = new URLSearchParams(location.search);
      const code = urlParams.get("code");

      if (!code) {
        setStatus("error");
        setErrorMessage("Authorization code is missing");
        toast.error("Authorization code missing");
        setTimeout(() => window.close(), 2000);
        return;
      }

      try {
        const response = await githubExchange({ code }).unwrap();

        if (response.status === "success") {
          setStatus("success");

          if (window.opener) {
            window.opener.postMessage(
              { action: "github-authentication-success", user: response.user },
              window.location.origin
            );

            setTimeout(() => {
              try {
                window.opener.location.reload();
              } catch (e) {}
            }, 5000);
          }

          toast.success("GitHub Authentication successful!");

          setTimeout(() => {
            window.close();
          }, 5000);
        } else {
          if (window.opener) {
            window.opener.postMessage(
              {
                action: "github-authentication-error",
                message: response.message || "Authentication failed",
              },
              window.location.origin
            );
          }
          throw new Error(response.message || "Authentication failed");
        }
      } catch (error: any) {
        setStatus("error");
        const message =
          error instanceof Error
            ? error.message
            : "Authentication failed. Please try again.";
        setErrorMessage(message);
        toast.error(message);

        if (window.opener) {
          window.opener.postMessage(
            { action: "github-authentication-error", message },
            window.location.origin
          );
        }

        setTimeout(() => {
          window.close();
        }, 3000);
      }
    };

    handleCallback();
  }, [location, githubExchange]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96 text-center">
        <h2 className="text-2xl font-bold mb-6">GitHub Authentication</h2>

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
