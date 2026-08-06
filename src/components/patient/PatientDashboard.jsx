import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useAppointments } from "../../contexts/AppointmentContext";
import Prescriptions from "./Prescriptions";
import Appointments from "./Appointments";
import HealthLogs from "./HealthLogs";
import MedicineReminders from "./MedicineReminders";
import { motion } from "framer-motion";
import { SkeletonStats, SkeletonCard } from "../common/SkeletonLoader";
import {
  HeartIcon,
  ClockIcon,
  DocumentTextIcon,
  ArrowDownTrayIcon,
  SparklesIcon,
  CheckCircleIcon
} from "@heroicons/react/24/outline";
import { jsPDF } from "jspdf";
import toast from "react-hot-toast";

const PatientDashboard = ({ activeTab }) => {
  const { user } = useAuth();
  const { appointments } = useAppointments();

  const patientAppointments = appointments.filter(
    (apt) => apt.patientId === user?.id
  );
  const apptCount = patientAppointments.length;

  const renderContent = () => {
    switch (activeTab) {
      case "prescriptions":
        return <Prescriptions />;
      case "appointments":
        return <Appointments />;
      case "health-logs":
        return <HealthLogs />;
      case "medicine-reminders":
        return <MedicineReminders />;
      default:
        return <DashboardOverview user={user} apptCount={apptCount} />;
    }
  };

  return (
    <div className="p-6 bg-subtle min-h-full space-y-6">
      {renderContent()}
    </div>
  );
};

const DashboardOverview = ({ user, apptCount }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const exportPdfReport = () => {
    try {
      const doc = new jsPDF();
      doc.setFont("helvetica", "bold");
      doc.setFontSize(18);
      doc.setTextColor(14, 165, 233);
      doc.text("PulseCare AI - Patient Health Summary", 14, 20);

      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(100, 100, 100);
      doc.text(`Developed by Vaibhava G | Partner: Dr TMA Pai Hospital`, 14, 28);
      doc.text(`Generated Date: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`, 14, 34);

      doc.setLineWidth(0.5);
      doc.setDrawColor(220, 220, 220);
      doc.line(14, 38, 196, 38);

      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(30, 30, 30);
      doc.text("Patient Profile Information", 14, 48);

      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.text(`Name: ${user?.name || "Patient User"}`, 14, 56);
      doc.text(`Email: ${user?.email || "patient@pulsecare.ai"}`, 14, 62);
      doc.text(`Role: Patient (Active Ecosystem Account)`, 14, 68);

      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.text("Latest Vital Metrics Summary", 14, 80);

      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.text("• Heart Rate: 72 BPM (Optimal Normal)", 14, 88);
      doc.text("• Blood Pressure: 120/80 mmHg (Normal)", 14, 94);
      doc.text("• Fasting Glucose: 95 mg/dL (Normal Range)", 14, 100);
      doc.text(`• Scheduled Appointments: ${apptCount}`, 14, 106);

      doc.setFontSize(10);
      doc.setTextColor(14, 165, 233);
      doc.text("Official PulseCare AI Document • Dr TMA Pai Hospital Partner Portal", 14, 125);

      doc.save(`PulseCare_Health_Report_${user?.name?.replace(/\s+/g, '_') || 'User'}.pdf`);
      toast.success("Health Summary PDF generated successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to generate PDF report.");
    }
  };

  const stats = [
    {
      name: "Active Prescriptions",
      value: "3",
      icon: DocumentTextIcon,
      bgColor: "bg-teal-50 dark:bg-teal-950/40 border-teal-200 dark:border-teal-800/50",
      color: "text-teal-600 dark:text-teal-400",
    },
    {
      name: "Medicine Reminders",
      value: "5",
      icon: ClockIcon,
      bgColor: "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800/50",
      color: "text-emerald-600 dark:text-emerald-400",
    },
    {
      name: "Health Logs",
      value: "12",
      icon: HeartIcon,
      bgColor: "bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800/50",
      color: "text-rose-600 dark:text-rose-400",
    },
    {
      name: "Appointments",
      value: String(apptCount),
      icon: ClockIcon,
      bgColor: "bg-indigo-50 dark:bg-indigo-950/40 border-indigo-200 dark:border-indigo-800/50",
      color: "text-indigo-600 dark:text-indigo-400",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Banner */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 p-8 rounded-3xl text-white shadow-xl relative overflow-hidden"
      >
        <div className="relative z-10">
          <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-semibold uppercase tracking-wider text-white mb-3 inline-block">
            PulseCare AI • Patient Hub
          </span>
          <h1 className="text-2xl md:text-4xl font-extrabold font-heading">
            Welcome back, {user?.name || "Patient"}! 👋
          </h1>
          <p className="mt-2 text-sm text-emerald-100 max-w-xl font-medium">
            Your biometrics are in optimal range today. Dr TMA Pai Hospital portal is active.
          </p>
        </div>

        <div className="relative z-10 shrink-0">
          <button
            onClick={exportPdfReport}
            className="flex items-center space-x-2 px-5 py-3 bg-white text-emerald-700 font-extrabold rounded-2xl shadow-lg hover:bg-emerald-50 hover:scale-105 transition-all text-xs"
          >
            <ArrowDownTrayIcon className="w-4 h-4 text-emerald-600" />
            <span>Export Health Report PDF</span>
          </button>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat, i) => (
          <div
            key={i}
            className={`glass-card p-6 rounded-3xl border flex items-center justify-between ${stat.bgColor}`}
          >
            <div>
              <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                {stat.name}
              </p>
              <h3 className="text-2xl font-black text-gray-900 dark:text-white font-heading mt-1">
                {stat.value}
              </h3>
            </div>
            <div className={`p-3.5 rounded-2xl bg-white/80 dark:bg-gray-800/80 shadow-md ${stat.color}`}>
              <stat.icon className="w-6 h-6" />
            </div>
          </div>
        ))}
      </div>

      {/* Vital Chart & Recent Logs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <VitalTrendChart />
        </div>

        {/* Quick Health Status Card */}
        <div className="glass-card p-6 bg-white/90 dark:bg-gray-900/90 rounded-3xl border border-gray-200/80 dark:border-gray-800/80 space-y-4">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <CheckCircleIcon className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-900 dark:text-white font-heading">
                Ecosystem Status
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">PulseCare AI Encryption</p>
            </div>
          </div>

          <div className="space-y-3 pt-2 text-xs text-gray-600 dark:text-gray-300 font-medium">
            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-gray-800/50 border border-slate-200 dark:border-gray-700 flex justify-between items-center">
              <span>Next Dosage Alarm</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400">8:00 PM (Amoxicillin)</span>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-gray-800/50 border border-slate-200 dark:border-gray-700 flex justify-between items-center">
              <span>Partner Facility</span>
              <span className="font-bold text-cyan-600 dark:text-cyan-400">Dr TMA Pai Hospital</span>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-gray-800/50 border border-slate-200 dark:border-gray-700 flex justify-between items-center">
              <span>System Lead</span>
              <span className="font-bold text-gray-900 dark:text-white">Vaibhava G</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const VitalTrendChart = () => {
  const [metric, setMetric] = useState("heartRate");

  const dataMap = {
    heartRate: [
      { day: "Mon", val: 68 },
      { day: "Tue", val: 72 },
      { day: "Wed", val: 70 },
      { day: "Thu", val: 75 },
      { day: "Fri", val: 71 },
      { day: "Sat", val: 69 },
      { day: "Sun", val: 73 },
    ],
    bloodGlucose: [
      { day: "Mon", val: 92 },
      { day: "Tue", val: 95 },
      { day: "Wed", val: 98 },
      { day: "Thu", val: 91 },
      { day: "Fri", val: 94 },
      { day: "Sat", val: 96 },
      { day: "Sun", val: 93 },
    ],
  };

  const currentData = dataMap[metric] || dataMap.heartRate;

  return (
    <div className="glass-card p-6 bg-white/90 dark:bg-gray-900/90 border border-gray-200/80 dark:border-gray-800/80 rounded-3xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h3 className="text-lg font-extrabold text-gray-900 dark:text-gray-100 font-heading">
            Weekly Vital Trends
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Real-time biometric log telemetry
          </p>
        </div>

        <div className="flex items-center space-x-2 bg-slate-100 dark:bg-gray-800 p-1 rounded-xl">
          <button
            onClick={() => setMetric("heartRate")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              metric === "heartRate"
                ? "bg-emerald-600 text-white shadow-sm"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            Heart Rate (BPM)
          </button>
          <button
            onClick={() => setMetric("bloodGlucose")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              metric === "bloodGlucose"
                ? "bg-emerald-600 text-white shadow-sm"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            Glucose (mg/dL)
          </button>
        </div>
      </div>

      {/* SVG Interactive Chart */}
      <div className="h-44 flex items-end justify-between gap-2 pt-6 px-2">
        {currentData.map((d, i) => {
          const maxVal = metric === "heartRate" ? 100 : 120;
          const heightPercent = Math.min(100, Math.max(20, (d.val / maxVal) * 100));

          return (
            <div key={i} className="flex-1 flex flex-col items-center group relative">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-8 bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900 text-[10px] font-bold py-1 px-2 rounded shadow-lg pointer-events-none whitespace-nowrap z-20">
                {d.val} {metric === "heartRate" ? "BPM" : "mg/dL"}
              </div>

              <div className="w-full bg-slate-100 dark:bg-gray-800/80 rounded-xl h-32 flex items-end p-1 relative overflow-hidden">
                <div
                  style={{ height: `${heightPercent}%` }}
                  className="w-full bg-gradient-to-t from-emerald-600 to-teal-400 rounded-lg group-hover:from-emerald-500 group-hover:to-cyan-400 transition-all duration-300 shadow-md"
                />
              </div>
              <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 mt-2">
                {d.day}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PatientDashboard;
