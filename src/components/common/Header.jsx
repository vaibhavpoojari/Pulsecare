import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
  MoonIcon,
  SunIcon,
  XMarkIcon,
  WifiIcon,
  ExclamationTriangleIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import { useAuth } from "../../contexts/AuthContext";
import { useTheme } from "../../contexts/ThemeContext";
import { useOffline } from "../../contexts/OfflineContext";
import PropTypes from "prop-types";
import NotificationDropdown from "../NotificationDropdown";

const ConfirmationModal = ({ onClose, onConfirm }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm transition-opacity duration-300">
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6 rounded-2xl shadow-2xl max-w-sm w-full mx-4 transform scale-100 transition-all">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-extrabold text-gray-900 dark:text-white font-heading">
            Confirm Sign Out
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-1 rounded-lg"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
          Are you sure you want to log out of PulseCare AI?
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-xs font-semibold bg-rose-600 hover:bg-rose-700 text-white rounded-xl transition shadow-md"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

ConfirmationModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

const Header = () => {
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const { isOnline, queuedActions } = useOffline();
  const navigate = useNavigate();

  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      navigate("/login");
    }
  };

  const getRoleDisplay = (role) => {
    switch (role) {
      case "patient":
        return "Patient";
      case "doctor":
        return "Doctor";
      case "pharmacist":
        return "Pharmacist";
      default:
        return role || "User";
    }
  };

  const displayName =
    user?.name || user?.displayName || user?.email || "User";

  const profilePath = user?.role ? `/${user.role}/profile` : "/login";

  return (
    <>
      <header className="sticky top-0 z-30 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200/80 dark:border-gray-800/80 shadow-sm transition-colors">
        <div className="px-4 sm:px-6 py-3">
          <div className="flex justify-between items-center">
            {/* Left Brand Title */}
            <div
              className="flex items-center space-x-3 cursor-pointer group"
              onClick={() => navigate("/")}
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-teal-600 via-emerald-500 to-cyan-400 p-0.5 shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
                <div className="w-full h-full bg-white dark:bg-gray-900 rounded-[10px] flex items-center justify-center">
                  <svg className="w-5 h-5 text-emerald-500 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.684a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
              </div>
              <div>
                <h1 className="text-lg font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 dark:from-emerald-400 dark:to-cyan-400 font-heading">
                  PulseCare AI
                </h1>
                <span className="text-[10px] text-gray-400 dark:text-gray-500 block -mt-1 font-medium">Developed by Vaibhava G</span>
              </div>
            </div>

            {/* Right Tools & User Info */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              {!isOnline && (
                <div className="flex items-center space-x-1.5 px-3 py-1 bg-rose-100 dark:bg-rose-950/50 text-rose-800 dark:text-rose-300 rounded-xl text-xs font-semibold border border-rose-200 dark:border-rose-800">
                  <ExclamationTriangleIcon className="h-4 w-4" />
                  <span>Offline Mode</span>
                  {queuedActions.length > 0 && (
                    <span className="text-[10px] bg-rose-200 dark:bg-rose-900 px-1.5 py-0.5 rounded-full">
                      {queuedActions.length}
                    </span>
                  )}
                </div>
              )}

              {/* AI Quick Button */}
              {user && (
                <button
                  onClick={() => navigate(`/${user.role}/ai-assistant`)}
                  className="hidden md:flex items-center space-x-1.5 px-3 py-1.5 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 hover:from-emerald-500/20 hover:to-cyan-500/20 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 rounded-xl text-xs font-bold transition"
                >
                  <SparklesIcon className="w-3.5 h-3.5 text-emerald-500" />
                  <span>AI Assistant</span>
                </button>
              )}

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-xl text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-800 transition-colors"
                title={isDark ? "Switch to light mode" : "Switch to dark mode"}
                aria-label="Toggle dark mode"
              >
                {isDark ? (
                  <SunIcon className="h-5 w-5 text-amber-400" />
                ) : (
                  <MoonIcon className="h-5 w-5 text-slate-700" />
                )}
              </button>

              {/* Notification Dropdown */}
              <NotificationDropdown />

              {/* User Profile Info */}
              <div className="flex items-center space-x-2 pl-2 border-l border-gray-200 dark:border-gray-800">
                <Link
                  to={profilePath}
                  className="flex items-center space-x-2 hover:bg-gray-100/80 dark:hover:bg-gray-800/80 rounded-xl p-1.5 transition"
                >
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-600 text-white flex items-center justify-center font-bold text-xs shadow-sm">
                    {displayName.charAt(0).toUpperCase()}
                  </div>
                  <div className="hidden sm:block text-left">
                    <p className="text-xs font-bold text-gray-900 dark:text-gray-100 leading-tight">
                      {displayName}
                    </p>
                    <p className="text-[10px] text-gray-500 dark:text-gray-400 font-medium">
                      {getRoleDisplay(user?.role)}
                    </p>
                  </div>
                </Link>
                <button
                  onClick={() => setIsLogoutModalOpen(true)}
                  className="p-2 text-gray-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-xl transition"
                  title="Sign Out"
                >
                  <ArrowRightOnRectangleIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Logout confirmation popup */}
      {isLogoutModalOpen && (
        <ConfirmationModal
          onClose={() => setIsLogoutModalOpen(false)}
          onConfirm={handleLogout}
        />
      )}
    </>
  );
};

export default Header;
