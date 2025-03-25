import { Separator } from "@/components/ui/separator";
import { Github, Youtube } from "lucide-react";
import { Link } from "react-router-dom";
export const Footer = () => {
  return (
    <footer className="relative py-20 px-4 border-b-[1px] bg-white dark:border-b-slate-700 dark:bg-background">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center mb-12">
          <h2 className="text-xl md:text-3xl font-bold mb-6 text-center text-gray-900 dark:text-gray-300">
            Connect With Us
          </h2>
          <p className="text-xl text-gray-900 dark:text-gray-300 mb-12 max-w-2xl mx-auto text-center">
            Stay updated with our latest features and community updates
          </p>
        </div>

        <div className="flex justify-between w-full">
          <div className="space-y-3">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-300">
              Follow Us
            </h3>
            <div className="flex flex-col space-y-2">
              <a
                target="_blank"
                href="https://github.com/BrothersITPLC"
                className="flex items-center text-sm text-gray-900 dark:text-gray-300 hover:text-red-500 transition-colors"
              >
                <Github className="h-4 w-4 mr-2" /> Github
              </a>
              <a
                target="_blank"
                href="https://x.com/"
                className="flex items-center text-sm text-gray-900 dark:text-gray-300 hover:text-red-500 transition-colors"
              >
                <div className="flex items-center justify-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-twitter-x"
                    viewBox="0 0 16 16"
                  >
                    <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" />
                  </svg>
                  <p>X.com</p>
                </div>
              </a>
              <a
                target="_blank"
                href="https://discord.com/"
                className="flex items-center text-sm text-gray-900 dark:text-gray-300 hover:text-red-500 transition-colors"
              >
                <div className="flex items-center justify-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-discord"
                    viewBox="0 0 16 16"
                  >
                    <path d="M13.545 2.907a13.2 13.2 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.2 12.2 0 0 0-3.658 0 8 8 0 0 0-.412-.833.05.05 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.04.04 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032q.003.022.021.037a13.3 13.3 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019q.463-.63.818-1.329a.05.05 0 0 0-.01-.059l-.018-.011a9 9 0 0 1-1.248-.595.05.05 0 0 1-.02-.066l.015-.019q.127-.095.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.05.05 0 0 1 .053.007q.121.1.248.195a.05.05 0 0 1-.004.085 8 8 0 0 1-1.249.594.05.05 0 0 0-.03.03.05.05 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.2 13.2 0 0 0 4.001-2.02.05.05 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.03.03 0 0 0-.02-.019m-8.198 7.307c-.789 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612m5.316 0c-.788 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612" />
                  </svg>
                  <p>Discord</p>
                </div>
              </a>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-300">
              Platforms
            </h3>
            <div className="flex flex-col space-y-2">
              <a
                href="#"
                className="text-sm text-gray-900 dark:text-gray-300 hover:text-red-500 transition-colors"
              >
                Web
              </a>
              <a
                target="_blank"
                href="https://play.google.com/store/games"
                className="text-sm text-gray-900 dark:text-gray-300 hover:text-red-500 transition-colors"
              >
                Mobile
              </a>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-300">
              Community
            </h3>
            <div className="flex flex-col space-y-2">
              <a
                target="_blank"
                href="https://www.youtube.com/"
                className="flex items-center text-sm text-gray-900 dark:text-gray-300 hover:text-red-500 transition-colors"
              >
                <Youtube className="h-4 w-4 mr-2" /> Youtube
              </a>
              <a
                target="_blank"
                href="https://telegram.org/"
                className="flex items-center text-sm text-gray-900 dark:text-gray-300 hover:text-red-500 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-telegram"
                    viewBox="0 0 16 16"
                  >
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.287 5.906q-1.168.486-4.666 2.01-.567.225-.595.442c-.03.243.275.339.69.47l.175.055c.408.133.958.288 1.243.294q.39.01.868-.32 3.269-2.206 3.374-2.23c.05-.012.12-.026.166.016s.042.12.037.141c-.03.129-1.227 1.241-1.846 1.817-.193.18-.33.307-.358.336a8 8 0 0 1-.188.186c-.38.366-.664.64.015 1.088.327.216.589.393.85.571.284.194.568.387.936.629q.14.092.27.187c.331.236.63.448.997.414.214-.02.435-.22.547-.82.265-1.417.786-4.486.906-5.751a1.4 1.4 0 0 0-.013-.315.34.34 0 0 0-.114-.217.53.53 0 0 0-.31-.093c-.3.005-.763.166-2.984 1.09" />
                  </svg>
                  <p>Telegram</p>
                </div>
              </a>
              <Link
                to="/faq"
                className="text-sm text-gray-900 dark:text-gray-300 hover:text-red-500 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-patch-question"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8.05 9.6c.336 0 .504-.24.554-.627.04-.534.198-.815.847-1.26.673-.475 1.049-1.09 1.049-1.986 0-1.325-.92-2.227-2.262-2.227-1.02 0-1.792.492-2.1 1.29A1.7 1.7 0 0 0 6 5.48c0 .393.203.64.545.64.272 0 .455-.147.564-.51.158-.592.525-.915 1.074-.915.61 0 1.03.446 1.03 1.084 0 .563-.208.885-.822 1.325-.619.433-.926.914-.926 1.64v.111c0 .428.208.745.585.745" />
                    <path d="m10.273 2.513-.921-.944.715-.698.622.637.89-.011a2.89 2.89 0 0 1 2.924 2.924l-.01.89.636.622a2.89 2.89 0 0 1 0 4.134l-.637.622.011.89a2.89 2.89 0 0 1-2.924 2.924l-.89-.01-.622.636a2.89 2.89 0 0 1-4.134 0l-.622-.637-.89.011a2.89 2.89 0 0 1-2.924-2.924l.01-.89-.636-.622a2.89 2.89 0 0 1 0-4.134l.637-.622-.011-.89a2.89 2.89 0 0 1 2.924-2.924l.89.01.622-.636a2.89 2.89 0 0 1 4.134 0l-.715.698a1.89 1.89 0 0 0-2.704 0l-.92.944-1.32-.016a1.89 1.89 0 0 0-1.911 1.912l.016 1.318-.944.921a1.89 1.89 0 0 0 0 2.704l.944.92-.016 1.32a1.89 1.89 0 0 0 1.912 1.911l1.318-.016.921.944a1.89 1.89 0 0 0 2.704 0l.92-.944 1.32.016a1.89 1.89 0 0 0 1.911-1.912l-.016-1.318.944-.921a1.89 1.89 0 0 0 0-2.704l-.944-.92.016-1.32a1.89 1.89 0 0 0-1.912-1.911z" />
                    <path d="M7.001 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0" />
                  </svg>
                  FAQ
                </div>
              </Link>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-gray-200 dark:bg-gray-700" />

        <div className="text-center">
          <p className="text-gray-900 dark:text-gray-300">
            &copy; 2025 Powered By{" "}
            <a
              href="https://www.brothersitplc.com/"
              target="_blank"
              rel="noreferrer noopener"
              className="font-medium text-red-500 hover:text-red-600 hover:underline"
            >
              Brothers IT PLC
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};
