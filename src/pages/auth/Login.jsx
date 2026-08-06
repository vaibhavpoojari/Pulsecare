import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import {
  Mail,
  Lock,
  Loader2,
  Eye,
  EyeOff,
  UserCheck,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../../components/common/Navbar";
import Footer from "../Footer";
import { useTranslation } from "react-i18next";
import { toast } from "react-hot-toast";

const Login = () => {
  const { t } = useTranslation();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "patient",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const pulseVariants = {
    animate: {
      scale: [1, 1.1, 1],
      opacity: [0.3, 0.6, 0.3],
      transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
    },
  };

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      x: [-5, 5, -5],
      transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
    },
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      const result = await login(formData.email, formData.password, formData.role);
      if (result.success && result.user) {
        navigate(`/${result.user.role}`);
      } else {
        navigate("/");
      }
    } catch (err) {
      setError(t("login.error") + ": " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setError("");
      setLoading(true);
      const user = await loginWithGoogle();
      if (user) {
        toast.success("Google login successful! Redirecting...", {
          duration: 3000,
          icon: "🎉",
        });

        // Navigate after a short delay so toast can appear

        navigate(`/${user.role || "home"}`);

      }
    } catch (err) {
      setError(t("login.errorGoogle") + ": " + err.message);
    } finally {
      setLoading(false)
    };
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-24 pb-12 flex items-center justify-center bg-gradient-to-br from-emerald-50/60 via-white to-teal-50/50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 px-4 sm:px-6">
        <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 rounded-3xl overflow-hidden shadow-2xl border border-white/60 dark:border-gray-800 bg-white/80 dark:bg-gray-900/90 backdrop-blur-2xl">
          {/* Left Clinical Visual Panel */}
          <div className="p-8 md:p-10 bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700 text-white flex flex-col justify-between hidden md:flex relative overflow-hidden">
            <div className="relative z-10 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30">
                <UserCheck className="w-6 h-6" />
              </div>
              <h2 className="text-3xl font-extrabold font-heading leading-tight">
                Welcome to PulseCare AI
              </h2>
              <p className="text-emerald-100 text-sm leading-relaxed">
                Access your secure portal for real-time symptom triage, biometric tracking, prescription refills, and clinical scheduling.
              </p>
            </div>

            <div className="relative z-10 pt-8 border-t border-white/20">
              <p className="text-xs text-emerald-100 font-semibold uppercase tracking-wider">
                Architected & Developed by
              </p>
              <p className="text-base font-extrabold text-white font-heading mt-0.5">
                Vaibhava G
              </p>
            </div>
          </div>

          {/* Right Login Form */}
          <div className="p-8 md:p-10 space-y-6">
            <div>
              <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white font-heading">
                Sign In to Your Account
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Select your role to access specialized healthcare tools.
              </p>
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-900/30 border border-rose-200 dark:border-rose-800 text-rose-600 dark:text-rose-400 text-xs font-semibold">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Role Selection Cards */}
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-2">
                  Select Role
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: "patient", label: "Patient" },
                    { id: "doctor", label: "Doctor" },
                    { id: "pharmacist", label: "Pharmacist" },
                  ].map((r) => (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => setFormData((prev) => ({ ...prev, role: r.id }))}
                      className={`py-2 px-1 text-center rounded-xl text-xs font-bold transition border ${formData.role === r.id
                        ? "bg-emerald-600 text-white border-emerald-600 shadow-md"
                        : "bg-slate-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-slate-200 dark:border-gray-700 hover:border-emerald-400"
                        }`}
                    >
                      {r.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="label-base">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="input-base pl-10"
                    placeholder="name@example.com"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="label-base">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-3.5 h-4 w-4 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="input-base pl-10 pr-10"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-3.5 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary py-3.5 flex items-center justify-center gap-2"
              >
                {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Sign In to PulseCare AI"}
              </button>

              {/*
              <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={loading}
                className="w-full btn-secondary py-3 flex items-center justify-center gap-2"
              >
                <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  alt="Google"
                  className="w-4 h-4"
                />
                <span>Sign in with Google</span>
              </button>
              */}

            </form>

            <p className="text-center text-xs text-gray-500 dark:text-gray-400">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
              >
                Create Account
              </Link>
            </p>

          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
