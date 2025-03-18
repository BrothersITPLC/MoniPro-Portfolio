import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Activity, Menu, X } from "lucide-react";

export function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    section: string
  ) => {
    e.preventDefault();
    if (window.location.pathname !== "/") {
      window.location.href = `/#${section}`;
    } else {
      const element = document.getElementById(section);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed w-full bg-gray-900/95 backdrop-blur-sm z-50 border-b border-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Activity className="h-8 w-8 text-red-500" />
              <span className="ml-2 text-xl font-bold">MonitorPro</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              onClick={(e) => handleNavClick(e, "hero")}
              className="hover:text-red-500 transition-colors"
            >
              Home
            </Link>
            <a
              href="#features"
              onClick={(e) => handleNavClick(e, "features")}
              className="hover:text-red-500 transition-colors"
            >
              Features
            </a>
            <a
              href="#pricing"
              onClick={(e) => handleNavClick(e, "pricing")}
              className="hover:text-red-500 transition-colors"
            >
              Pricing
            </a>
            <a
              href="#solutions"
              onClick={(e) => handleNavClick(e, "solutions")}
              className="hover:text-red-500 transition-colors"
            >
              Product
            </a>
            <Link
              to="/auth"
              className="bg-red-500 px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-white"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className="block px-3 py-2 hover:bg-gray-800 rounded-md"
            >
              Home
            </Link>
            <a
              href="#features"
              onClick={(e) => handleNavClick(e, "features")}
              className="block px-3 py-2 hover:bg-gray-800 rounded-md"
            >
              Features
            </a>
            <a
              href="#pricing"
              onClick={(e) => handleNavClick(e, "pricing")}
              className="block px-3 py-2 hover:bg-gray-800 rounded-md"
            >
              Pricing
            </a>
            <a
              href="#solutions"
              onClick={(e) => handleNavClick(e, "solutions")}
              className="block px-3 py-2 hover:bg-gray-800 rounded-md"
            >
              Product
            </a>
            <Link
              to="/auth"
              className="block text-center bg-red-500 px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
