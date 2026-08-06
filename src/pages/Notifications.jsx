import React, { useState, useEffect } from "react";
import {
  BellIcon,
  CheckCircleIcon,
  CalendarDaysIcon,
  BeakerIcon,
  SparklesIcon,
  TrashIcon,
  FunnelIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";
import { toast } from "react-hot-toast";

const initialNotifications = [
  {
    id: "1",
    title: "Upcoming Appointment",
    message: "Reminder: You have a scheduled appointment with Dr. Sarah Johnson tomorrow at 10:30 AM.",
    category: "appointments",
    timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
    read: false,
    priority: "high",
  },
  {
    id: "2",
    title: "Medication Alarm",
    message: "Time to take Amoxicillin 500mg (1 Capsule with water).",
    category: "medications",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    read: false,
    priority: "normal",
  },
  {
    id: "3",
    title: "AI Health Recommendation",
    message: "PulseCare AI analyzed your recent vital logs: Blood pressure is stable at 120/80 mmHg. Keep staying hydrated!",
    category: "ai-tips",
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    read: true,
    priority: "low",
  },
  {
    id: "4",
    title: "Prescription Refill Ready",
    message: "Your prescription refill #PX-9042 has been verified by City Pharmacy.",
    category: "medications",
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    read: true,
    priority: "normal",
  },
  {
    id: "5",
    title: "System Update",
    message: "PulseCare AI v1.0 is active. Dark mode and instant PDF report downloads are now available.",
    category: "system",
    timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
    read: true,
    priority: "low",
  },
];

export default function Notifications() {
  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem("pulsecare_notifications");
    return saved ? JSON.parse(saved) : initialNotifications;
  });
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    localStorage.setItem("pulsecare_notifications", JSON.stringify(notifications));
  }, [notifications]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    toast.success("All notifications marked as read");
  };

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const deleteNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    toast.success("Notification removed");
  };

  const clearAll = () => {
    setNotifications([]);
    toast.success("Notification center cleared");
  };

  const filteredNotifications = notifications.filter((n) => {
    if (filter === "all") return true;
    if (filter === "unread") return !n.read;
    return n.category === filter;
  });

  const getCategoryIcon = (category) => {
    switch (category) {
      case "appointments":
        return <CalendarDaysIcon className="w-5 h-5 text-emerald-500" />;
      case "medications":
        return <BeakerIcon className="w-5 h-5 text-teal-500" />;
      case "ai-tips":
        return <SparklesIcon className="w-5 h-5 text-cyan-500" />;
      default:
        return <BellIcon className="w-5 h-5 text-blue-500" />;
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Header Banner */}
      <div className="glass-card p-6 mb-6 rounded-3xl bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white shadow-xl flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-white/20 backdrop-blur-md rounded-2xl">
              <BellIcon className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl lg:text-3xl font-extrabold font-heading">
                Notification Center
              </h1>
              <p className="text-sm text-emerald-100 mt-1">
                Stay updated with real-time health alerts, reminders, and AI tips.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white font-semibold text-xs rounded-xl transition flex items-center space-x-1.5"
            >
              <CheckIcon className="w-4 h-4" />
              <span>Mark all read ({unreadCount})</span>
            </button>
          )}
          {notifications.length > 0 && (
            <button
              onClick={clearAll}
              className="px-4 py-2 bg-rose-500/80 hover:bg-rose-600 text-white font-semibold text-xs rounded-xl transition flex items-center space-x-1.5"
            >
              <TrashIcon className="w-4 h-4" />
              <span>Clear All</span>
            </button>
          )}
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 mb-6 border-b border-gray-200 dark:border-gray-800 pb-3">
        {[
          { id: "all", label: "All Alerts", count: notifications.length },
          { id: "unread", label: "Unread", count: unreadCount },
          { id: "appointments", label: "Appointments" },
          { id: "medications", label: "Medications" },
          { id: "ai-tips", label: "AI Recommendations" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition flex items-center space-x-2 ${
              filter === tab.id
                ? "bg-emerald-600 text-white shadow-md"
                : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            <span>{tab.label}</span>
            {tab.count !== undefined && (
              <span
                className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                  filter === tab.id
                    ? "bg-white/30 text-white"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                }`}
              >
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Notification List */}
      <div className="space-y-3">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((item) => (
            <div
              key={item.id}
              onClick={() => markAsRead(item.id)}
              className={`p-5 rounded-2xl border transition-all duration-300 cursor-pointer flex items-start justify-between gap-4 ${
                !item.read
                  ? "bg-white dark:bg-gray-900 border-emerald-500/40 shadow-md ring-1 ring-emerald-500/20"
                  : "bg-slate-50/70 dark:bg-gray-900/40 border-gray-200/80 dark:border-gray-800/80 opacity-90"
              }`}
            >
              <div className="flex items-start space-x-4">
                <div className="p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                  {getCategoryIcon(item.category)}
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h4 className="font-bold text-base text-gray-900 dark:text-gray-100">
                      {item.title}
                    </h4>
                    {!item.read && (
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                    )}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 leading-relaxed">
                    {item.message}
                  </p>
                  <span className="text-xs text-gray-400 dark:text-gray-500 mt-2 block font-medium">
                    {new Date(item.timestamp).toLocaleString([], {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteNotification(item.id);
                  }}
                  className="p-2 text-gray-400 hover:text-rose-500 transition rounded-lg hover:bg-rose-50 dark:hover:bg-rose-900/20"
                  title="Remove notification"
                >
                  <TrashIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="glass-card p-12 text-center rounded-3xl">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <CheckCircleIcon className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
              All caught up!
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              You have no notifications under this filter.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
