import { Separator } from "@/components/ui/separator";
import { Github, Twitter, Linkedin, Youtube, Twitch } from "lucide-react";

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

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-300">
              Follow Us
            </h3>
            <div className="flex flex-col space-y-2">
              <a
                href="https://github.com/BrothersITPLC"
                className="flex items-center text-sm text-gray-900 dark:text-gray-300 hover:text-red-500 transition-colors"
              >
                <Github className="h-4 w-4 mr-2" /> Github
              </a>
              <a
                href=""
                className="flex items-center text-sm text-gray-900 dark:text-gray-300 hover:text-red-500 transition-colors"
              >
                <Twitter className="h-4 w-4 mr-2" /> Twitter
              </a>
              <a
                href="https://www.linkedin.com/company/brothers-it-plc"
                className="flex items-center text-sm text-gray-900 dark:text-gray-300 hover:text-red-500 transition-colors"
              >
                <Linkedin className="h-4 w-4 mr-2" /> Linkedin
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
                href="#"
                className="text-sm text-gray-900 dark:text-gray-300 hover:text-red-500 transition-colors"
              >
                Mobile
              </a>
              <a
                href="#"
                className="text-sm text-gray-900 dark:text-gray-300 hover:text-red-500 transition-colors"
              >
                Desktop
              </a>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-300">
              About
            </h3>
            <div className="flex flex-col space-y-2">
              <a
                href="#"
                className="text-sm text-gray-900 dark:text-gray-300 hover:text-red-500 transition-colors"
              >
                Features
              </a>
              <a
                href="#"
                className="text-sm text-gray-900 dark:text-gray-300 hover:text-red-500 transition-colors"
              >
                Pricing
              </a>
              <a
                href="#"
                className="text-sm text-gray-900 dark:text-gray-300 hover:text-red-500 transition-colors"
              >
                FAQ
              </a>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-300">
              Community
            </h3>
            <div className="flex flex-col space-y-2">
              <a
                href="#"
                className="flex items-center text-sm text-gray-900 dark:text-gray-300 hover:text-red-500 transition-colors"
              >
                <Youtube className="h-4 w-4 mr-2" /> Youtube
              </a>
              <a
                href="#"
                className="flex items-center text-sm text-gray-900 dark:text-gray-300 hover:text-red-500 transition-colors"
              >
                <Twitch className="h-4 w-4 mr-2" /> Twitch
              </a>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-gray-200 dark:bg-gray-700" />

        <div className="text-center">
          <p className="text-gray-900 dark:text-gray-300">
            &copy; 2024 Powered By{" "}
            <a
              href="https://www.linkedin.com/in/leopoldo-miranda/"
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
