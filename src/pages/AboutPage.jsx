import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import {
  HeartIcon,
  UserGroupIcon,
  ShieldCheckIcon,
  LightBulbIcon,
  GlobeAltIcon,
  CheckCircleIcon,
  MapPinIcon,
  EnvelopeIcon,
  PhoneIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import Navbar from '../components/common/Navbar';
import Footer from './Footer';
import { useTheme } from "../contexts/ThemeContext";

const AboutPage = () => {
  const { isDark } = useTheme();

  const values = [
    {
      icon: SparklesIcon,
      title: "AI-Powered Diagnostics",
      description: "Leveraging intelligent algorithms to perform symptom analysis and assist clinical triage.",
      color: "from-emerald-500 to-teal-500"
    },
    {
      icon: ShieldCheckIcon,
      title: "Security & HIPAA Principles",
      description: "Healthcare privacy is paramount. Enterprise-grade encryption and access controls protect data.",
      color: "from-cyan-500 to-blue-500"
    },
    {
      icon: HeartIcon,
      title: "Patient-Centric Care",
      description: "Designed for seamless communication between patients, physicians, and pharmacies.",
      color: "from-rose-500 to-pink-500"
    },
    {
      icon: GlobeAltIcon,
      title: "Universal Accessibility",
      description: "Optimized for all devices with dark mode, PWA offline support, and multi-language features.",
      color: "from-indigo-500 to-purple-500"
    }
  ];

  const milestones = [
    { year: "2025", title: "Architecture & Concept", description: "PulseCare AI initialized by Vaibhava G as a next-gen clinical platform." },
    { year: "2026", title: "AI Integration & Multi-Portal Launch", description: "Rolled out Patient, Doctor, and Pharmacist dashboards with AI symptom triage." },
    { year: "2026+", title: "Hospital Partner Expansion", description: "Integration with partner facilities starting with Dr TMA Pai Hospital, Udupi." },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors">
      <Navbar />

      {/* Hero Header */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-b from-emerald-500/10 via-teal-500/5 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider mb-6">
            <span>About PulseCare AI</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 font-heading">
            Redefining Healthcare Through <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-500">Intelligent Innovation</span>
          </h1>
          <p className="max-w-3xl mx-auto text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed font-medium">
            PulseCare AI is a modern healthcare ecosystem developed by **Vaibhava G**. It connects patients, doctors, and pharmacists into a unified, secure platform with real-time analytics, AI symptom checking, and medication management.
          </p>
        </div>
      </section>

      {/* Developer Spotlight & Hospital Partner Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Developer Info Card */}
          <div className="glass-card p-8 bg-white/90 dark:bg-gray-900/90 border border-emerald-500/20 shadow-2xl rounded-3xl space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-600 via-teal-500 to-cyan-400 text-white font-extrabold text-2xl flex items-center justify-center shadow-lg">
                VG
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-gray-900 dark:text-white font-heading">
                  Vaibhava G
                </h3>
                <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                  Lead Software Architect & Developer
                </p>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              Designed and built PulseCare AI from the ground up, utilizing modern software architecture, glassmorphism design systems, and artificial intelligence to streamline digital health services.
            </p>
            <div className="pt-2 space-y-2 text-xs font-semibold text-gray-700 dark:text-gray-300">
              <div className="flex items-center space-x-2">
                <PhoneIcon className="w-4 h-4 text-emerald-500" />
                <a href="tel:+919731971568" className="hover:text-emerald-600 transition">+91 9731971568</a>
              </div>
              <div className="flex items-center space-x-2">
                <EnvelopeIcon className="w-4 h-4 text-emerald-500" />
                <a href="mailto:vaibhavg8121@gmail.com" className="hover:text-emerald-600 transition">vaibhavg8121@gmail.com</a>
              </div>
            </div>
          </div>

          {/* Hospital Partner Info Card */}
          <div className="glass-card p-8 bg-white/90 dark:bg-gray-900/90 border border-cyan-500/20 shadow-2xl rounded-3xl space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center shadow-inner">
                <MapPinIcon className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-gray-900 dark:text-white font-heading">
                  Dr TMA Pai Hospital
                </h3>
                <p className="text-xs font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider">
                  Hospital Partner & Demo Facility
                </p>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              Serving as our primary partner facility for clinical workflow integration and digital teleconsultation testing in Karnataka, India.
            </p>
            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-gray-800/60 border border-slate-200 dark:border-gray-700 text-xs text-gray-600 dark:text-gray-300 leading-normal">
              <p className="font-bold text-gray-900 dark:text-white">Location Details:</p>
              <p>N.H. 66, Near Arch, Kinnimulki, Kadekar, Udupi, Karnataka 576101, India</p>
            </div>
          </div>

        </div>
      </section>

      {/* Core Mission Values */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white font-heading">
            Our Core Pillars
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-2">
            The values guiding every feature built into PulseCare AI.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((val) => (
            <div key={val.title} className="glass-card p-6 bg-white/80 dark:bg-gray-900/80 border border-gray-200/80 dark:border-gray-800/80 rounded-2xl space-y-3">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${val.color} text-white flex items-center justify-center shadow-md`}>
                <val.icon className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-gray-900 dark:text-white font-heading">
                {val.title}
              </h3>
              <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                {val.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Platform Evolution Milestones */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white font-heading">
            Platform Evolution
          </h2>
        </div>

        <div className="space-y-6">
          {milestones.map((m, i) => (
            <div key={i} className="flex items-start space-x-4 p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm">
              <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-mono text-xs font-bold rounded-full">
                {m.year}
              </span>
              <div>
                <h4 className="text-base font-bold text-gray-900 dark:text-white font-heading">{m.title}</h4>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{m.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;
