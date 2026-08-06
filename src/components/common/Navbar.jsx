import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Bars3Icon, MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import { useTheme } from "../../contexts/ThemeContext";
import { useAuth } from "../../contexts/AuthContext";

import Contributor from "./Contributor";
import { useNavigate } from "react-router-dom";

import useScrollSpy from "../../hooks/useScrollSpy";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const { user } = useAuth();
  const location = useLocation();
  const mobileMenuRef = useRef(null);

  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";

  const sectionIds = [
    "home",
    "features",
    "pricing",
    "testimonials",
    "contact-form",
  ];
  const activeSection = useScrollSpy(sectionIds, 100);

  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  const handleNavigation = (id, isSection = true, path = null) => {
    if (path) {
      navigate(path, { replace: true });
      return;
    }
    if (!isSection) {
      navigate(`/${id}`, { replace: true });
      return;
    }
    if (location.pathname === "/") {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate("/", {
        state: { scrollTo: id },
      });
    }
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/");
    }
  };

  useEffect(() => {
    if (location.state && location.state.scrollTo) {
      const element = document.getElementById(location.state.scrollTo);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
          window.history.replaceState({}, document.title);
        }, 100);
      }
    }
  }, [location]);

  const { t, i18n } = useTranslation();

  const menuItems = isAuthPage
    ? [{ name: t("nav.home"), id: "home" }]
    : [
        { name: t("nav.home"), id: "home", isSection: true },
        { name: t("nav.features"), id: "features", isSection: true },
        { name: t("nav.pricing"), id: "pricing", isSection: true },
        { name: t("nav.blog"), path: "/blog", isSection: false },
        { name: t("nav.testimonials"), id: "testimonials", isSection: true },
        { name: t("nav.contact"), id: "contact-form", isSection: true },
      ];

  return (
    <header className="fixed top-3 left-0 right-0 z-50 px-4 max-w-7xl mx-auto">
      <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-gray-200/80 dark:border-gray-800/80 shadow-2xl rounded-2xl px-4 sm:px-6 py-3 transition-all duration-300">
        <div className="flex justify-between items-center">
          {/* Logo Section */}
          <a
            key="Logo"
            href="/"
            onClick={handleLogoClick}
            className="flex items-center group space-x-3 cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-600 via-emerald-500 to-cyan-400 p-0.5 shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-white dark:bg-gray-900 rounded-[10px] flex items-center justify-center">
                <svg className="w-6 h-6 text-emerald-500 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.684a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 dark:from-emerald-400 dark:via-teal-300 dark:to-cyan-400 text-xl tracking-tight leading-none">
                PulseCare<span className="text-cyan-600 dark:text-cyan-400 ml-1 text-xs font-semibold px-1.5 py-0.5 rounded-full bg-cyan-100 dark:bg-cyan-900/50 border border-cyan-300 dark:border-cyan-700">AI</span>
              </span>
              <span className="text-[10px] text-gray-400 dark:text-gray-500 tracking-wider uppercase font-medium mt-0.5">Smart Healthcare</span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          {!isAuthPage && (
            <div className="hidden lg:flex items-center space-x-1 bg-gray-100/70 dark:bg-gray-800/50 p-1.5 rounded-xl border border-gray-200/50 dark:border-gray-700/50">
              {menuItems.map((item) => (
                <a
                  key={item.id}
                  href={item.path ? item.path : `#${item.id}`}
                  onClick={(e) => {
                    handleNavigation(item.id, item.isSection, item.path);
                  }}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                    item.path
                      ? location.pathname === item.path
                        ? "bg-white dark:bg-gray-900 text-emerald-600 dark:text-emerald-400 shadow-sm"
                        : "text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400"
                      : activeSection === item.id
                      ? "bg-white dark:bg-gray-900 text-emerald-600 dark:text-emerald-400 shadow-sm"
                      : "text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400"
                  }`}
                >
                  {item.name}
                </a>
              ))}
            </div>
          )}

          {/* Actions & Utilities */}
          <div className="flex items-center space-x-3">
            {/* AI Assistant Shortcut */}
            <button
              onClick={() => navigate(user ? `/${user.role}/ai-assistant` : "/login")}
              className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 hover:from-emerald-500/20 hover:to-teal-500/20 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 rounded-xl text-xs font-bold transition shadow-sm"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span>AI Assistant</span>
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white bg-gray-100/80 dark:bg-gray-800/80 transition-colors"
              title={isDark ? "Switch to light mode" : "Switch to dark mode"}
              aria-label="Toggle dark mode"
            >
              {isDark ? (
                <SunIcon className="h-5 w-5 text-amber-400" />
              ) : (
                <MoonIcon className="h-5 w-5 text-slate-700" />
              )}
            </button>

            {/* Language Dropdown */}
            <select
              value={i18n.language}
              onChange={(e) => i18n.changeLanguage(e.target.value)}
              className="text-xs font-semibold bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl px-2 py-1.5 text-gray-700 dark:text-gray-200 focus:outline-none"
              aria-label="Select language"
            >
              <option value="en">EN</option>
              <option value="hi">HI</option>
            </select>

            {/* Role Button / Auth Links */}
            <div className="hidden lg:flex items-center space-x-3">
              {user ? (
                <Link
                  to={`/${user.role}`}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md transition"
                >
                  {user.name.split(" ")[0]}'s Portal ({user.role})
                </Link>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-xs font-bold text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition"
                  >
                    {t("auth.signIn")}
                  </Link>
                  <Link
                    to="/register"
                    className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-xl font-bold text-xs shadow-lg hover:scale-105 transition-transform duration-200"
                  >
                    {t("auth.getStarted")}
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition"
            >
              <Bars3Icon className="h-6 w-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="lg:hidden mt-2 bg-white/95 dark:bg-gray-900/95 backdrop-blur-2xl border border-gray-200 dark:border-gray-800 rounded-2xl shadow-2xl p-4 space-y-3"
        >
          {menuItems.map((item) => (
            <a
              key={item.id}
              href={item.path ? item.path : `#${item.id}`}
              onClick={(e) => {
                setIsMobileMenuOpen(false);
                handleNavigation(item.id, item.isSection, item.path);
              }}
              className="block px-4 py-2.5 rounded-xl text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 hover:text-emerald-600 dark:hover:text-emerald-400 transition"
            >
              {item.name}
            </a>
          ))}

          <div className="pt-3 border-t border-gray-200 dark:border-gray-800 flex flex-col gap-2">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                navigate(user ? `/${user.role}/ai-assistant` : "/login");
              }}
              className="w-full py-2.5 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 rounded-xl text-xs font-bold border border-emerald-200 dark:border-emerald-800"
            >
              AI Health Assistant
            </button>

            {user ? (
              <Link
                to={`/${user.role}`}
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full py-2.5 text-center bg-emerald-600 text-white rounded-xl text-xs font-bold"
              >
                Dashboard
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full py-2.5 text-center bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-xl text-xs font-bold"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full py-2.5 text-center bg-emerald-600 text-white rounded-xl text-xs font-bold"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
