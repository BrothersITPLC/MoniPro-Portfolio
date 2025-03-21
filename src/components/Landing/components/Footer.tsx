import { Separator } from "@/components/ui/separator";
import { Github, Twitter, Dribbble, Youtube, Twitch } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="container mx-auto py-8 space-y-8 bg-gray-100 dark:border-b-slate-700 dark:bg-background text-gray-950 dark:text-gray-100">
      <Separator className="my-4" />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 px-4">
        <div className="space-y-3">
          <h3 className="font-semibold text-lg">Follow US</h3>
          <div className="flex flex-col space-y-2">
            <a
              href="#"
              className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <Github className="h-4 w-4 mr-2" /> Github
            </a>
            <a
              href="#"
              className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <Twitter className="h-4 w-4 mr-2" /> Twitter
            </a>
            <a
              href="#"
              className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <Dribbble className="h-4 w-4 mr-2" /> Dribbble
            </a>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="font-semibold text-lg">Platforms</h3>
          <div className="flex flex-col space-y-2">
            <a
              href="#"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Web
            </a>
            <a
              href="#"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Mobile
            </a>
            <a
              href="#"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Desktop
            </a>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="font-semibold text-lg">About</h3>
          <div className="flex flex-col space-y-2">
            <a
              href="#"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Features
            </a>
            <a
              href="#"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Pricing
            </a>
            <a
              href="#"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              FAQ
            </a>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="font-semibold text-lg">Community</h3>
          <div className="flex flex-col space-y-2">
            <a
              href="#"
              className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <Youtube className="h-4 w-4 mr-2" /> Youtube
            </a>

            <a
              href="#"
              className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <Twitch className="h-4 w-4 mr-2" /> Twitch
            </a>
          </div>
        </div>
      </div>

      <Separator className="my-4" />

      <div className="text-center text-sm text-muted-foreground">
        <p>
          &copy; 2024 Landing page made by{" "}
          <a
            href="https://www.linkedin.com/in/leopoldo-miranda/"
            target="_blank"
            rel="noreferrer noopener"
            className="font-medium text-primary hover:underline"
          >
            Leo Miranda
          </a>
        </p>
      </div>
    </footer>
  );
};
