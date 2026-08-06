import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  HomeIcon,
  UserGroupIcon,
  ClipboardDocumentListIcon,
  ChatBubbleLeftRightIcon,
  CogIcon,
  ChevronRightIcon,
  BellIcon,
  XMarkIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import { useAuth } from "../../contexts/AuthContext";

const patientMenuItems = [
  { name: "Dashboard", href: "/patient", icon: HomeIcon },
  { name: "AI Health Assistant", href: "/patient/ai-assistant", icon: SparklesIcon },
  { name: "Appointments", href: "/patient/appointments", icon: ClipboardDocumentListIcon },
  { name: "Prescriptions", href: "/patient/prescriptions", icon: ClipboardDocumentListIcon },
  { name: "Health Logs", href: "/patient/health-logs", icon: UserGroupIcon },
  { name: "Notifications", href: "/notifications", icon: BellIcon },
  { name: "Messages", href: "/patient/messages", icon: ChatBubbleLeftRightIcon },
  { name: "Settings", href: "/patient/settings", icon: CogIcon },
];

const doctorMenuItems = [
  { name: "Dashboard", href: "/doctor", icon: HomeIcon },
  { name: "AI Health Assistant", href: "/doctor/ai-assistant", icon: SparklesIcon },
  { name: "Schedule", href: "/doctor/schedule", icon: ClipboardDocumentListIcon },
  { name: "Patients", href: "/doctor/patients", icon: UserGroupIcon },
  { name: "Notifications", href: "/notifications", icon: BellIcon },
  { name: "Messages", href: "/doctor/messages", icon: ChatBubbleLeftRightIcon },
  { name: "Settings", href: "/doctor/settings", icon: CogIcon },
];

const pharmacistMenuItems = [
  { name: "Dashboard", href: "/pharmacist", icon: HomeIcon },
  { name: "Prescriptions", href: "/pharmacist/prescriptions", icon: ClipboardDocumentListIcon },
  { name: "Inventory", href: "/pharmacist/inventory", icon: UserGroupIcon },
  { name: "Notifications", href: "/notifications", icon: BellIcon },
  { name: "Messages", href: "/pharmacist/messages", icon: ChatBubbleLeftRightIcon },
  { name: "Settings", href: "/pharmacist/settings", icon: CogIcon },
];

export default function Sidebar() {
  const location = useLocation();
  const { user } = useAuth();
  const [open, setOpen] = React.useState(false);

  const menuItems =
    user?.role === "doctor"
      ? doctorMenuItems
      : user?.role === "pharmacist"
      ? pharmacistMenuItems
      : patientMenuItems;

  React.useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const panelInfo = React.useMemo(() => {
    switch (user?.role) {
      case "patient":
        return { title: "Patient Hub", role: "Patient" };
      case "doctor":
        return { title: "Clinical Portal", role: "Doctor" };
      case "pharmacist":
        return { title: "Pharmacy Desk", role: "Pharmacist" };
      default:
        return { title: "PulseCare AI", role: "User" };
    }
  }, [user]);

  const isActiveLink = (href) => {
    if (href === "/patient" || href === "/doctor" || href === "/pharmacist") {
      return location.pathname === href;
    }
    return location.pathname.startsWith(href);
  };

  return (
    <>
      {/* Mobile Trigger Button */}
      <button
        aria-label="Open Sidebar Menu"
        className="fixed z-40 left-3 top-20 bg-emerald-600 text-white rounded-2xl shadow-xl p-2.5 hover:bg-emerald-700 transition lg:hidden"
        onClick={() => setOpen(true)}
      >
        <ChevronRightIcon className="h-5 w-5" />
      </button>

      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar Panel */}
      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen w-72 bg-white/90 dark:bg-gray-900/90 backdrop-blur-2xl border-r border-gray-200/80 dark:border-gray-800/80 shadow-2xl flex flex-col z-50 transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 h-20 border-b border-gray-200/80 dark:border-gray-800/80">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-500 flex items-center justify-center text-white font-extrabold shadow-md">
              {panelInfo.role.charAt(0)}
            </div>
            <div>
              <h2 className="font-extrabold text-base text-gray-900 dark:text-white font-heading">
                {panelInfo.title}
              </h2>
              <span className="inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                {panelInfo.role} Mode
              </span>
            </div>
          </div>
          <button
            aria-label="Close Sidebar"
            className="lg:hidden p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-lg"
            onClick={() => setOpen(false)}
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 p-4 overflow-y-auto custom-scrollbar">
          <ul className="space-y-1.5">
            {menuItems.map((item) => {
              const active = isActiveLink(item.href);
              return (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className={`flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-semibold transition-all duration-200 group ${
                      active
                        ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-600/20"
                        : "text-gray-600 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-gray-800/60 hover:text-gray-900 dark:hover:text-white"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <item.icon
                        className={`h-5 w-5 transition-transform duration-200 group-hover:scale-110 ${
                          active
                            ? "text-white"
                            : "text-emerald-500 dark:text-emerald-400"
                        }`}
                      />
                      <span>{item.name}</span>
                    </div>
                    {active && (
                      <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Live Vital Status Card Widget */}
        <div className="p-4 m-4 rounded-2xl bg-gradient-to-br from-slate-50 to-emerald-50/60 dark:from-gray-800/80 dark:to-gray-800/40 border border-slate-200/80 dark:border-gray-700/60">
          <div className="flex items-center space-x-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-xs font-bold text-gray-900 dark:text-white font-heading">
              System Telemetry
            </span>
          </div>
          <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-tight">
            PulseCare AI backend connected & encrypted.
          </p>
        </div>

        {/* User Card */}
        <div className="p-4 border-t border-gray-200/80 dark:border-gray-800/80 flex items-center space-x-3">
          <div className="w-9 h-9 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-sm">
            {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
          </div>
          <div className="flex-1 truncate">
            <p className="text-xs font-bold text-gray-900 dark:text-white truncate">
              {user?.name || "User"}
            </p>
            <p className="text-[11px] text-gray-400 dark:text-gray-500 truncate">
              {user?.email || "user@pulsecare.ai"}
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
