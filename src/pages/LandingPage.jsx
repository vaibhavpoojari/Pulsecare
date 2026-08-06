import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Navbar from "../components/common/Navbar";
import Footer from "./Footer";
import FAQSection from "./FAQSection";
import Testimonials from "./Testimonials";
import Pricing from "./PriceSection";
import StatsSection from "./StatsSection";
import Feature from "./Feature";
import CalendarModal from "../components/common/CalendarModal";
import {
  SparklesIcon,
  ShieldCheckIcon,
  HeartIcon,
  ArrowRightIcon,
  PlayIcon,
  CalendarDaysIcon,
  ChatBubbleLeftRightIcon,
  BeakerIcon,
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  CheckCircleIcon
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

const LandingPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [aiPromptInput, setAiPromptInput] = useState("");
  const [aiResponse, setAiResponse] = useState(null);

  const handleAiQuickAsk = (e) => {
    e.preventDefault();
    if (!aiPromptInput.trim()) return;
    setAiResponse({
      query: aiPromptInput,
      answer: `Based on initial symptom screening for "${aiPromptInput}", non-urgent monitoring is recommended. Stay hydrated and consult a doctor if fever exceeds 101°F. PulseCare AI has flagged this in your clinical log.`,
      urgency: "Moderate",
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors">
      <Navbar />

      {/* Hero Section */}
      <section id="home" className="relative pt-32 pb-24 overflow-hidden bg-gradient-to-b from-emerald-500/10 via-teal-500/5 to-transparent">
        {/* Decorative Glowing Orbs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-emerald-500/20 via-cyan-500/10 to-teal-400/20 rounded-full blur-3xl -z-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          
          {/* Top Badge */}
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs font-bold shadow-lg mb-8">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>PulseCare AI v2.0 • Developed by Vaibhava G</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight mb-8 font-heading leading-tight max-w-5xl mx-auto">
            Next-Gen AI Clinical & <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-500">
              Patient Care Intelligence
            </span>
          </h1>

          {/* Subtitle */}
          <p className="max-w-3xl mx-auto text-base sm:text-xl text-gray-600 dark:text-gray-300 leading-relaxed font-medium mb-10">
            Connecting patients, physicians, and pharmacists in one high-performance ecosystem. Powered by AI symptom triage, vitals tracking, and teleconsultation management.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <button
              onClick={() => navigate(user ? `/${user.role}` : "/register")}
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:from-emerald-700 hover:to-cyan-700 text-white font-extrabold rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all flex items-center justify-center space-x-2 text-sm"
            >
              <span>{user ? "Enter Your Portal" : "Get Started Free"}</span>
              <ArrowRightIcon className="w-4 h-4" />
            </button>

            <button
              onClick={() => setIsCalendarOpen(true)}
              className="w-full sm:w-auto px-8 py-4 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200 font-extrabold rounded-2xl shadow-md hover:bg-gray-100 dark:hover:bg-gray-800 transition flex items-center justify-center space-x-2 text-sm"
            >
              <CalendarDaysIcon className="w-5 h-5 text-emerald-500" />
              <span>Schedule Live Demo</span>
            </button>
          </div>

          {/* Interactive AI Preview Box */}
          <div className="max-w-3xl mx-auto glass-card p-6 sm:p-8 bg-white/90 dark:bg-gray-900/90 border border-emerald-500/30 rounded-3xl shadow-2xl text-left">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                <SparklesIcon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-900 dark:text-white font-heading">
                  Try Instant AI Triage Assistant
                </h3>
                <p className="text-[11px] text-gray-500 dark:text-gray-400">
                  Type any health question or symptom below for instant analysis.
                </p>
              </div>
            </div>

            <form onSubmit={handleAiQuickAsk} className="flex gap-2 mb-4">
              <input
                type="text"
                value={aiPromptInput}
                onChange={(e) => setAiPromptInput(e.target.value)}
                placeholder="e.g. Mild headache, slight fever, fatigue for 2 days..."
                className="flex-1 input-base text-xs sm:text-sm"
              />
              <button
                type="submit"
                className="px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs shadow-md transition"
              >
                Analyze
              </button>
            </form>

            {aiResponse && (
              <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 space-y-2 animate-fade-in">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-emerald-800 dark:text-emerald-300">
                    AI Clinical Screening Result
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-200 dark:bg-emerald-800 text-[10px] font-bold text-emerald-900 dark:text-emerald-100">
                    Urgency: {aiResponse.urgency}
                  </span>
                </div>
                <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed font-medium">
                  {aiResponse.answer}
                </p>
              </div>
            )}
          </div>

        </div>
      </section>

      {/* Hospital Partner Feature Spotlight Section */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-card p-8 sm:p-12 bg-gradient-to-r from-emerald-900/90 via-teal-900/90 to-gray-900/90 text-white rounded-3xl border border-emerald-500/30 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider border border-emerald-400/30">
              <MapPinIcon className="w-4 h-4" />
              <span>Partner Facility Spotlight</span>
            </div>
            <h2 className="text-3xl font-extrabold font-heading">
              Dr TMA Pai Hospital (Udupi)
            </h2>
            <p className="text-sm text-gray-300 leading-relaxed">
              PulseCare AI is deployed in collaboration with partner healthcare facilities such as Dr TMA Pai Hospital, Udupi, Karnataka, India. Offering direct teleconsultation scheduling and pharmacy fulfillment.
            </p>
            <div className="flex flex-wrap gap-4 text-xs font-semibold pt-2 text-emerald-200">
              <span>📍 N.H. 66, Near Arch, Kinnimulki, Udupi</span>
              <span>📞 +91 9731971568</span>
            </div>
          </div>
          <div className="shrink-0">
            <Link
              to="/contact"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-gray-950 font-extrabold rounded-2xl shadow-xl transition"
            >
              <span>Get Directions & Details</span>
              <ArrowRightIcon className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Core Features Grid */}
      <section id="features" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white font-heading">
            Engineered for Modern Healthcare
          </h2>
          <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mt-2 max-w-xl mx-auto">
            Comprehensive tooling designed specifically for patients, doctors, and pharmacists.
          </p>
        </div>

        <Feature />
      </section>

      {/* Stats Counter Section */}
      <StatsSection />

      {/* Pricing / Tiers Section */}
      <Pricing />

      {/* Testimonials */}
      <Testimonials />

      {/* FAQ Section */}
      <FAQSection />

      {/* Demo Booking Calendar Modal */}
      {isCalendarOpen && (
        <CalendarModal
          isOpen={isCalendarOpen}
          onClose={() => setIsCalendarOpen(false)}
          onSelectDate={(date) => {
            setIsCalendarOpen(false);
          }}
        />
      )}

      <Footer />
    </div>
  );
};

export default LandingPage;
