import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useAppointments } from "../../contexts/AppointmentContext";
import { Outlet, useLocation } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DoctorDashboard = () => {
  const { user } = useAuth();
  const { appointments } = useAppointments();
  const location = useLocation();

  const doctorAppointments = appointments.filter(
    (apt) => apt.doctorId === user.id
  );

  const pendingAppointments = doctorAppointments.filter(
    (apt) => apt.status === "Pending"
  );
  const confirmedAppointments = doctorAppointments.filter(
    (apt) => apt.status === "Confirmed"
  );
  const rejectedAppointments = doctorAppointments.filter(
    (apt) => apt.status === "Rejected"
  );

  // Show dashboard only on /doctor route
  const isDashboard =
    location.pathname === "/doctor" || location.pathname === "/doctor/";

  return (
    <div className="p-6 md:p-8 bg-slate-50/80 dark:bg-slate-950 min-h-full">
      {isDashboard ? (
        <DashboardOverview
          user={user}
          appointments={doctorAppointments}
          pendingAppointments={pendingAppointments}
          confirmedAppointments={confirmedAppointments}
          rejectedAppointments={rejectedAppointments}
        />
      ) : (
        <Outlet />
      )}
    </div>
  );
};

const DashboardOverview = ({
  user,
  appointments,
  pendingAppointments,
  confirmedAppointments,
  rejectedAppointments,
}) => {
  // Chart Data
  const chartData = {
    labels: ["Accepted", "Rejected", "Pending"],
    datasets: [
      {
        label: "Appointments",
        data: [
          confirmedAppointments.length,
          rejectedAppointments.length,
          pendingAppointments.length,
        ],
        backgroundColor: [
          "rgba(16, 185, 129, 0.85)", // Emerald
          "rgba(244, 63, 94, 0.85)",  // Rose
          "rgba(245, 158, 11, 0.85)", // Amber
        ],
        borderRadius: 12,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: "Appointment Status Distribution",
        color: "#0d9488",
        font: { size: 18, weight: "bold", family: "Outfit" },
      },
    },
    animation: {
      duration: 1000,
      easing: "easeOutQuart",
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: "#64748b", font: { size: 13, weight: "600", family: "Plus Jakarta Sans" } },
      },
      y: {
        beginAtZero: true,
        grid: { color: "rgba(226, 232, 240, 0.6)" },
        ticks: { color: "#64748b", font: { size: 13, weight: "600", family: "Plus Jakarta Sans" } },
      },
    },
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 p-8 rounded-3xl text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10">
          <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-semibold uppercase tracking-wider text-white mb-3 inline-block">
            Doctor Practice Portal
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold font-heading tracking-tight">
            Welcome, Dr. {user.name}! 👨‍⚕️
          </h2>
          <p className="text-emerald-50 text-base md:text-lg mt-1 font-medium max-w-xl">
            Manage your patient schedules, reviews, and clinical cases efficiently.
          </p>
        </div>
        <div className="relative z-10 flex items-center gap-3">
          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 text-center">
            <span className="block text-2xl font-bold font-heading">{pendingAppointments.length}</span>
            <span className="text-xs font-medium text-emerald-100 uppercase tracking-wider">Pending</span>
          </div>
          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 text-center">
            <span className="block text-2xl font-bold font-heading">{confirmedAppointments.length}</span>
            <span className="text-xs font-medium text-emerald-100 uppercase tracking-wider">Confirmed</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Total Appointments"
          value={appointments.length}
          color="from-teal-500 to-teal-700"
          icon="📅"
        />
        <StatCard
          title="Accepted"
          value={confirmedAppointments.length}
          color="from-emerald-500 to-emerald-700"
          icon="✅"
        />
        <StatCard
          title="Rejected"
          value={rejectedAppointments.length}
          color="from-rose-500 to-rose-700"
          icon="❌"
        />
      </div>

      <div className="glass-card p-6 rounded-2xl shadow-sm border border-slate-200/80 dark:border-slate-800/80">
        <Bar data={chartData} options={chartOptions} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <QuickCard
          title="Pending Requests"
          value={pendingAppointments.length}
          description="New appointment requests awaiting your confirmation."
          badgeColor="bg-amber-100 text-amber-800 dark:bg-amber-950/50 dark:text-amber-300"
          icon="⏳"
        />
        <QuickCard
          title="Open Patient Cases"
          value={appointments.length}
          description="Total active clinical cases under management."
          badgeColor="bg-teal-100 text-teal-800 dark:bg-teal-950/50 dark:text-teal-300"
          icon="🩺"
        />
        <QuickCard
          title="Acceptance Rate"
          value={
            appointments.length > 0
              ? `${Math.round(
                  (confirmedAppointments.length / appointments.length) * 100
                )}%`
              : "0%"
          }
          description="Percentage of confirmed patient bookings."
          badgeColor="bg-emerald-100 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300"
          icon="📈"
        />
      </div>
    </div>
  );
};

const StatCard = ({ title, value, color, icon }) => (
  <div
    className={`bg-gradient-to-br ${color} rounded-2xl shadow-lg p-6 flex items-center justify-between text-white transition-all duration-300 hover:scale-[1.02]`}
  >
    <div>
      <h3 className="text-sm font-semibold uppercase tracking-wider text-white/80">{title}</h3>
      <p className="text-3xl font-extrabold font-heading mt-1">{value}</p>
    </div>
    <span className="text-4xl bg-white/20 backdrop-blur-md p-3 rounded-2xl">{icon}</span>
  </div>
);

const QuickCard = ({ title, value, description, badgeColor, icon }) => (
  <div
    className="glass-card p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 flex flex-col justify-between"
  >
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center gap-2">
        <span className="text-2xl">{icon}</span>
        <h4 className="font-bold text-lg font-heading text-slate-900 dark:text-white">{title}</h4>
      </div>
      <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${badgeColor}`}>
        Overview
      </span>
    </div>
    <p className="text-4xl font-extrabold text-slate-900 dark:text-white font-heading my-2">{value}</p>
    <p className="text-sm text-slate-500 dark:text-slate-400">{description}</p>
  </div>
);

// Simple fade-in animation (add to your CSS or tailwind.config.js if using Tailwind)
const style = document.createElement("style");
style.innerHTML = `
@keyframes fade-in { from { opacity: 0; transform: translateY(20px);} to { opacity: 1; transform: none;} }
.animate-fade-in { animation: fade-in 0.8s ease; }
.animate-fade-in-slow { animation: fade-in 1.5s ease; }
`;
document.head.appendChild(style);

export default DoctorDashboard;