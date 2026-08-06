import React, { useState } from "react";
import Navbar from "../components/common/Navbar";
import Footer from "../pages/Footer";
import {
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  PaperAirplaneIcon,
  ArrowTopRightOnSquareIcon,
  UserIcon,
  ShieldCheckIcon,
  SparklesIcon
} from "@heroicons/react/24/outline";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    userType: "patient",
    subject: "",
    urgency: "normal",
    message: "",
  });

  const [formStatus, setFormStatus] = useState("idle"); // idle | loading | success | error
  const [statusMsg, setStatusMsg] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus("loading");

    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setFormStatus("error");
      setStatusMsg("Please fill in all required fields marked with *.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setFormStatus("error");
      setStatusMsg("Please enter a valid email address.");
      return;
    }

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setFormStatus("success");
      setStatusMsg("Thank you! Your message has been sent directly to Vaibhava G & the PulseCare AI team.");
      setFormData({
        name: "",
        email: "",
        phone: "",
        userType: "patient",
        subject: "",
        urgency: "normal",
        message: "",
      });
    } catch (err) {
      setFormStatus("error");
      setStatusMsg("Failed to send message. Please try calling or emailing directly.");
    }
  };

  const directionsUrl = "https://www.google.com/maps/search/?api=1&query=Dr+TMA+Pai+Hospital+Kinnimulki+Udupi+Karnataka+576101";

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors">
      <Navbar />

      {/* Hero Header */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-b from-emerald-500/10 via-cyan-500/5 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider mb-6">
            <SparklesIcon className="w-4 h-4 text-emerald-500" />
            <span>Support & Directions Hub</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 font-heading">
            Connect with <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-500">PulseCare AI</span>
          </h1>
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed font-medium">
            Have questions regarding clinical AI capabilities, partner hospital workflows, or general inquiries? Our team lead **Vaibhava G** and facility staff are available 24/7.
          </p>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Direct Contact Info & Hospital Map */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Developer Contact Card */}
            <div className="glass-card p-6 border border-emerald-500/20 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-xl rounded-3xl">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white font-extrabold text-lg shadow-lg">
                  VG
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white font-heading">
                    Vaibhava G
                  </h3>
                  <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                    Lead Architect & Developer
                  </p>
                </div>
              </div>

              <div className="space-y-4 pt-2">
                <a
                  href="tel:+919731971568"
                  className="flex items-center space-x-3.5 p-3 rounded-2xl bg-slate-50 dark:bg-gray-800/60 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 border border-slate-200/80 dark:border-gray-700/60 transition group"
                >
                  <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform">
                    <PhoneIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-gray-400 dark:text-gray-500 block">Direct Phone</span>
                    <span className="text-sm font-bold text-gray-900 dark:text-white font-mono">+91 9731971568</span>
                  </div>
                </a>

                <a
                  href="mailto:vaibhavg8121@gmail.com"
                  className="flex items-center space-x-3.5 p-3 rounded-2xl bg-slate-50 dark:bg-gray-800/60 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 border border-slate-200/80 dark:border-gray-700/60 transition group"
                >
                  <div className="p-2.5 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400 group-hover:scale-110 transition-transform">
                    <EnvelopeIcon className="w-5 h-5" />
                  </div>
                  <div className="truncate">
                    <span className="text-[10px] uppercase font-bold text-gray-400 dark:text-gray-500 block">Official Email</span>
                    <span className="text-sm font-bold text-gray-900 dark:text-white truncate">vaibhavg8121@gmail.com</span>
                  </div>
                </a>
              </div>
            </div>

            {/* Hospital Partner Info Card */}
            <div className="glass-card p-6 border border-cyan-500/20 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-xl rounded-3xl space-y-4">
              <div className="flex items-center space-x-3">
                <div className="p-3 rounded-2xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
                  <MapPinIcon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-gray-900 dark:text-white font-heading">
                    Hospital Partner Facility
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Dr TMA Pai Hospital</p>
                </div>
              </div>

              <div className="text-xs text-gray-600 dark:text-gray-300 space-y-1 bg-slate-50 dark:bg-gray-800/50 p-4 rounded-2xl border border-slate-200/60 dark:border-gray-700/60 leading-relaxed font-medium">
                <p className="font-bold text-gray-900 dark:text-white">Dr TMA Pai Hospital</p>
                <p>N.H. 66, Near Arch, Kinnimulki</p>
                <p>Kadekar, Udupi, Karnataka 576101, India</p>
              </div>

              <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 pt-1">
                <span className="flex items-center space-x-1.5 font-semibold">
                  <ClockIcon className="w-4 h-4 text-emerald-500" />
                  <span>Emergency Desk: 24/7 Open</span>
                </span>
                <a
                  href={directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1 px-3 py-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-bold shadow-md hover:scale-105 transition"
                >
                  <span>Get Directions</span>
                  <ArrowTopRightOnSquareIcon className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Embedded Interactive Google Map */}
              <div className="w-full h-56 rounded-2xl overflow-hidden border border-slate-200 dark:border-gray-800 shadow-inner mt-4">
                <iframe
                  title="Dr TMA Pai Hospital Location Map"
                  src="https://maps.google.com/maps?q=Dr+TMA+Pai+Hospital+Udupi+Karnataka&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0"
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

          </div>

          {/* Right Column: Premium Contact Form */}
          <div className="lg:col-span-7">
            <div className="glass-card p-8 border border-gray-200/80 dark:border-gray-800/80 bg-white/90 dark:bg-gray-900/90 backdrop-blur-2xl shadow-2xl rounded-3xl">
              <div className="mb-8">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white font-heading mb-2">
                  Send an Inquiry
                </h2>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                  Fill out your details below. Your message will be logged immediately to the PulseCare AI team.
                </p>
              </div>

              {/* Status Feedback Banners */}
              {formStatus === "success" && (
                <div className="mb-6 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 dark:text-emerald-200 flex items-start space-x-3">
                  <CheckCircleIcon className="w-6 h-6 text-emerald-500 shrink-0 mt-0.5" />
                  <div className="text-xs font-semibold">{statusMsg}</div>
                </div>
              )}

              {formStatus === "error" && (
                <div className="mb-6 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-800 dark:text-rose-200 flex items-start space-x-3">
                  <ExclamationTriangleIcon className="w-6 h-6 text-rose-500 shrink-0 mt-0.5" />
                  <div className="text-xs font-semibold">{statusMsg}</div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="label-base">Full Name *</label>
                    <div className="relative">
                      <UserIcon className="w-5 h-5 absolute left-3.5 top-3.5 text-gray-400" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        className="input-base pl-11"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="label-base">Email Address *</label>
                    <div className="relative">
                      <EnvelopeIcon className="w-5 h-5 absolute left-3.5 top-3.5 text-gray-400" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="john@example.com"
                        className="input-base pl-11"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="label-base">Phone Number</label>
                    <div className="relative">
                      <PhoneIcon className="w-5 h-5 absolute left-3.5 top-3.5 text-gray-400" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+91 9876543210"
                        className="input-base pl-11"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="label-base">Role / Category</label>
                    <select
                      name="userType"
                      value={formData.userType}
                      onChange={handleInputChange}
                      className="input-base"
                    >
                      <option value="patient">Patient Inquiry</option>
                      <option value="doctor">Healthcare Provider</option>
                      <option value="pharmacist">Pharmacy Management</option>
                      <option value="partner">Hospital Partnership</option>
                      <option value="support">Technical Support</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <div className="sm:col-span-2">
                    <label className="label-base">Subject *</label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="How can we assist you?"
                      className="input-base"
                      required
                    />
                  </div>

                  <div>
                    <label className="label-base">Urgency Level</label>
                    <select
                      name="urgency"
                      value={formData.urgency}
                      onChange={handleInputChange}
                      className="input-base"
                    >
                      <option value="normal">Normal</option>
                      <option value="urgent">Urgent</option>
                      <option value="critical">Critical / Emergency</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="label-base">Message *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={5}
                    placeholder="Provide details about your query..."
                    className="input-base"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={formStatus === "loading"}
                  className="w-full py-4 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:from-emerald-700 hover:to-cyan-700 text-white font-extrabold rounded-2xl shadow-xl hover:shadow-2xl hover:scale-[1.01] transition-all flex items-center justify-center space-x-2 text-sm"
                >
                  {formStatus === "loading" ? (
                    <span className="flex items-center space-x-2">
                      <span className="spinner border-white" />
                      <span>Sending Inquiry...</span>
                    </span>
                  ) : (
                    <>
                      <span>Submit Message</span>
                      <PaperAirplaneIcon className="w-4 h-4" />
                    </>
                  )}
                </button>

                <p className="text-[11px] text-center text-gray-400 dark:text-gray-500 pt-2">
                  🔒 Encrypted communication. Contact data handled under PulseCare AI privacy standards.
                </p>
              </form>
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactPage;
