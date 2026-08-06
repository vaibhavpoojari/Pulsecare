import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useAuth } from "../../contexts/AuthContext";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  Shield,
  Building,
  MapPin,
  GraduationCap,
  Award,
  AlertCircle,
} from "lucide-react";
import toast from "react-hot-toast";
import Navbar from "../../components/common/Navbar";
import Footer from "../Footer";
import { useTranslation } from "react-i18next";
import { COUNTRY_CODES } from '../../data/dummyData'
import { signInWithGoogle } from "../../firebase";

const Register = () => {
  const { t } = useTranslation();
  const { register, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "patient",
    phone: "",
    specialization: "",
    licenseNumber: "",
    experience: "",
    pharmacyName: "",
    pharmacyAddress: "",
    countryCode: "+91",
    terms: false,
  });

  const [passwordValidity, setPasswordValidity] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false,
  });

  const checkPasswordStrength = (password) => {
    setPasswordValidity({
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[^A-Za-z0-9]/.test(password),
    });
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const newErrors = { ...errors };
    let hasError = false;

    switch (name) {
      case "email":
        if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          newErrors.email = t("register.errors.email");
          hasError = true;
        }
        break;
      case "phone":
        if (value && value.length !== 10) {
          newErrors.phone = t("register.errors.phone");
          hasError = true;
        }
        break;
      case "confirmPassword":
        if (value && value !== formData.password) {
          newErrors.confirmPassword = t("register.errors.confirmPassword");
          hasError = true;
        }
        break;
      case "specialization":
        if (!value) {
          newErrors.specialization = t("register.errors.specialization");
          hasError = true;
        }
        break;
      case "licenseNumber":
        if (!value) {
          newErrors.licenseNumber = t(
            `register.errors.${formData.role === "doctor" ? "medicalLicense" : "pharmacyLicense"}`
          );
          hasError = true;
        }
        break;
      case "pharmacyName":
        if (!value) {
          newErrors.pharmacyName = t("register.errors.pharmacyName");
          hasError = true;
        }
        break;
      case "pharmacyAddress":
        if (!value) {
          newErrors.pharmacyAddress = t("register.errors.pharmacyAddress");
          hasError = true;
        }
        break;
      case "agree-terms":
        if (!checked) {
          newErrors.terms = t("register.errors.terms");
          hasError = true;
        }
        break;
      default:
        break;
    }
    if (!hasError) {
      delete newErrors[name];
    }
    setErrors(newErrors);
  };

  const handleChange = (e) => {
    let { name, value, type, checked } = e.target;
    if (name === "phone") {
      value = value.replace(/\D/g, "").slice(0, 10);
    }
    // handle terms checkbox with the setformdata
    if (type === "checkbox" && name === "agree-terms") {
      setFormData({
        ...formData,
        terms: checked,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
    if (error) setError("");
    if (errors[name]) {
      const newErrors = { ...errors };
      delete newErrors[name];
      setErrors(newErrors);
    }
    if (name === "password") {
      checkPasswordStrength(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t("register.errors.email");
    }
    if (formData.phone.length !== 10) {
      newErrors.phone = t("register.errors.phone");
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = t("register.errors.confirmPasswordMatch");
    }

    // Role-specific
    if (formData.role === "doctor") {
      if (!formData.specialization) {
        newErrors.specialization = t("register.errors.specialization");
      }
      if (!formData.licenseNumber) {
        newErrors.licenseNumber = t("register.errors.medicalLicense");
      }
    } else if (formData.role === "pharmacist") {
      if (!formData.licenseNumber) {
        newErrors.licenseNumber = t("register.errors.pharmacyLicense");
      }
      if (!formData.pharmacyName) {
        newErrors.pharmacyName = t("register.errors.pharmacyName");
      }
      if (!formData.pharmacyAddress) {
        newErrors.pharmacyAddress = t("register.errors.pharmacyAddress");
      }
    }

    // Terms and conditions checkbox compulsion
    if (!formData.terms) {
      newErrors.terms = t("register.errors.terms");
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      const errorMessage = t("register.errors.formFix");
      setError(errorMessage);
      toast.error(errorMessage, { duration: 4000, icon: "❌" });
      return;
    }

    if (!Object.values(passwordValidity).every(Boolean)) {
      const errorMessage = t("register.errors.passwordRequirements");
      setError(errorMessage);
      toast.error(errorMessage, { duration: 4000, icon: "❌" });
      return;
    }
    setLoading(true);
    setError("");
    try {
      const result = await register(formData);
      if (result.success) {
        toast.success(
          t("register.success", { name: formData.firstName }),
          {
            duration: 4000,
            icon: "🎉",
          }
        );
        setTimeout(() => {
          navigate(`/${result.user.role}`);
        }, 2000);
      }
    } catch (err) {
      const errorMessage = err.message || t("register.errors.failed");
      setError(errorMessage);
      toast.error(errorMessage, { duration: 4000, icon: "❌" });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      setLoading(true);

      // Directly sign in/up with Google
      const user = await signInWithGoogle(); // This returns Firebase user

      // Show success toast
      toast.success(t("register.googleSuccess"), {
        duration: 3000,
        icon: "🎉",
      });

      // Navigate to home or dashboard directly

      navigate(`/${user.role}`)



    } catch (error) {
      // Show error toast
      const errorMessage = t("register.errors.googleFailed", { msg: error.message });
      toast.error(errorMessage, { duration: 4000, icon: "❌" });
    } finally {
      setLoading(false);
    }
  };


  const containerVariants = { hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94], staggerChildren: 0.08 } } };
  const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] } } };
  const floatingVariants = { animate: { y: [0, -15, 0], x: [0, 10, 0], transition: { duration: 6, repeat: Infinity, ease: "easeInOut" } } };
  const pulseVariants = { animate: { scale: [1, 1.1, 1], rotate: [0, 180, 360], transition: { duration: 20, repeat: Infinity, ease: "linear" } } };

  const renderRoleSpecificFields = () => {
    switch (formData.role) {
      case "doctor":
        return (
          <motion.div key="doctor-fields" layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35, ease: "easeInOut" }} className="space-y-4">
            <div>
              <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }} className="relative">
                <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5" />
                <input
                  name="specialization"
                  type="text"
                  required
                  value={formData.specialization}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder={t("register.placeholders.specialization")}
                  className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-4 transition-all duration-300 placeholder-gray-400 text-black ${errors.specialization ? "border-red-500 focus:border-red-500 focus:ring-red-200/30" : "border-gray-200 focus:border-emerald-500 focus:ring-emerald-200/30"}`}
                  aria-invalid={!!errors.specialization}
                  aria-describedby="specialization-error"
                />
              </motion.div>
              {errors.specialization && (
                <p id="specialization-error" className="text-red-600 text-sm mt-1 px-1 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.specialization}
                </p>
              )}
            </div>
            <div>
              <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25, delay: 0.03 }} className="relative">
                <Shield className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5" />
                <input
                  name="licenseNumber"
                  type="text"
                  required
                  value={formData.licenseNumber}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder={t("register.placeholders.licenseNumber")}
                  className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-4 transition-all duration-300 placeholder-gray-400 text-black ${errors.licenseNumber ? "border-red-500 focus:border-red-500 focus:ring-red-200/30" : "border-gray-200 focus:border-emerald-500 focus:ring-emerald-200/30"}`}
                  aria-invalid={!!errors.licenseNumber}
                  aria-describedby="licenseNumber-error"
                />
              </motion.div>
              {errors.licenseNumber && (
                <p id="licenseNumber-error" className="text-red-600 text-sm mt-1 px-1 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.licenseNumber}
                </p>
              )}
            </div>
            <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25, delay: 0.06 }} className="relative">
              <Award className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5" />
              <input
                name="experience"
                type="number"
                value={formData.experience}
                onChange={handleChange}
                placeholder={t("register.placeholders.experience")}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:outline-none focus:ring-4 focus:ring-emerald-200/30 transition-all duration-300 placeholder-gray-400 text-black"
              />
            </motion.div>
          </motion.div>
        );
      case "pharmacist":
        return (
          <motion.div key="pharmacist-fields" layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35, ease: "easeInOut" }} className="space-y-4">
            <div>
              <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }} className="relative">
                <Shield className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5" />
                <input
                  name="licenseNumber"
                  type="text"
                  required
                  value={formData.licenseNumber}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder={t("register.placeholders.licenseNumber")}
                  className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-4 transition-all duration-300 placeholder-gray-400 text-black ${errors.licenseNumber ? "border-red-500 focus:border-red-500 focus:ring-red-200/30" : "border-gray-200 focus:border-emerald-500 focus:ring-emerald-200/30"}`}
                  aria-invalid={!!errors.licenseNumber}
                  aria-describedby="licenseNumber-error-pharmacy"
                />
              </motion.div>
              {errors.licenseNumber && (
                <p id="licenseNumber-error-pharmacy" className="text-red-600 text-sm mt-1 px-1 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.licenseNumber}
                </p>
              )}
            </div>
            <div>
              <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25, delay: 0.03 }} className="relative">
                <Building className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5" />
                <input
                  name="pharmacyName"
                  type="text"
                  required
                  value={formData.pharmacyName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder={t("register.placeholders.pharmacyName")}
                  className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-4 transition-all duration-300 placeholder-gray-400 text-black ${errors.pharmacyName ? "border-red-500 focus:border-red-500 focus:ring-red-200/30" : "border-gray-200 focus:border-emerald-500 focus:ring-emerald-200/30"}`}
                  aria-invalid={!!errors.pharmacyName}
                  aria-describedby="pharmacyName-error"
                />
              </motion.div>
              {errors.pharmacyName && (
                <p id="pharmacyName-error" className="text-red-600 text-sm mt-1 px-1 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.pharmacyName}
                </p>
              )}
            </div>
            <div>
              <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25, delay: 0.06 }} className="relative">
                <MapPin className="absolute left-3 top-4 text-gray-400 dark:text-gray-500 w-5 h-5" />
                <textarea
                  name="pharmacyAddress"
                  required
                  value={formData.pharmacyAddress}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  rows={3}
                  placeholder={t("register.placeholders.pharmacyAddress")}
                  className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-4 transition-all duration-300 placeholder-gray-400 resize-none text-black ${errors.pharmacyAddress ? "border-red-500 focus:border-red-500 focus:ring-red-200/30" : "border-gray-200 focus:border-emerald-500 focus:ring-emerald-200/30"}`}
                  aria-invalid={!!errors.pharmacyAddress}
                  aria-describedby="pharmacyAddress-error"
                />
              </motion.div>
              {errors.pharmacyAddress && (
                <p id="pharmacyAddress-error" className="text-red-600 text-sm mt-1 px-1 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.pharmacyAddress}
                </p>
              )}
            </div>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-24 pb-12 flex items-center justify-center bg-gradient-to-br from-emerald-50/60 via-white to-teal-50/50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 px-4 sm:px-6">
        <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 rounded-3xl overflow-hidden shadow-2xl border border-white/60 dark:border-gray-800 bg-white/80 dark:bg-gray-900/90 backdrop-blur-2xl">
          {/* Left Visual Panel */}
          <div className="p-8 md:p-10 bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700 text-white flex flex-col justify-between hidden md:flex relative overflow-hidden">
            <div className="relative z-10 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 font-extrabold text-xl">
                PC
              </div>
              <h2 className="text-3xl font-extrabold font-heading leading-tight">
                Join PulseCare AI Today
              </h2>
              <p className="text-emerald-100 text-sm leading-relaxed">
                Connect to a Next-Gen Healthcare ecosystem with real-time biometric telemetry, instant AI triage, and encrypted patient records.
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

          {/* Right Register Form */}
          <div className="p-8 md:p-10 space-y-6 max-h-[85vh] overflow-y-auto custom-scrollbar">
            <div>
              <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white font-heading">
                Create Your Account
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Select your account role to customize your workspace.
              </p>
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-900/30 border border-rose-200 dark:border-rose-800 text-rose-600 dark:text-rose-400 text-xs font-semibold">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Role Selection */}
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-2">
                  Account Type
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

              {/* First Name & Last Name */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="label-base">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    className="input-base"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label className="label-base">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                    className="input-base"
                    placeholder="Doe"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="label-base">Email Address</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="input-base"
                  placeholder="john.doe@example.com"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="label-base">Contact Phone</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="input-base"
                  placeholder="10-digit phone number"
                />
              </div>

              {/* Role Specific Fields */}
              <AnimatePresence mode="wait">
                {renderRoleSpecificFields()}
              </AnimatePresence>

              {/* Password */}
              <div>
                <label className="label-base">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="input-base pr-10"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-3.5 text-gray-400"
                  >
                    {showPassword ? <EyeSlashIcon className="w-4 h-4" /> : <EyeIcon className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <div className="mt-3 text-sm space-y-1">
                <p className={passwordValidity.length ? "text-green-600" : "text-red-500"}>
                  {passwordValidity.length ? "✅" : "❌"} Minimum 8 characters
                </p>

                <p className={passwordValidity.uppercase ? "text-green-600" : "text-red-500"}>
                  {passwordValidity.uppercase ? "✅" : "❌"} One uppercase letter
                </p>

                <p className={passwordValidity.lowercase ? "text-green-600" : "text-red-500"}>
                  {passwordValidity.lowercase ? "✅" : "❌"} One lowercase letter
                </p>

                <p className={passwordValidity.number ? "text-green-600" : "text-red-500"}>
                  {passwordValidity.number ? "✅" : "❌"} One number
                </p>

                <p className={passwordValidity.special ? "text-green-600" : "text-red-500"}>
                  {passwordValidity.special ? "✅" : "❌"} One special character
                </p>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="label-base">Confirm Password</label>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="input-base"
                  placeholder="••••••••"
                />
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-center space-x-2 pt-1">
                <input
                  type="checkbox"
                  id="agree-terms"
                  name="agree-terms"
                  checked={formData.terms}
                  onChange={handleChange}
                  className="rounded text-emerald-600 focus:ring-emerald-500"
                />
                <label htmlFor="agree-terms" className="text-xs text-gray-600 dark:text-gray-400">
                  I agree to the Terms of Service & Privacy Policy
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary py-3.5 flex items-center justify-center gap-2"
              >
                {loading ? <LoadingSpinner size="sm" /> : "Create PulseCare AI Account"}
              </button>
            </form>

            <p className="text-center text-xs text-gray-500 dark:text-gray-400">
              Already registered?{" "}
              <Link to="/login" className="font-bold text-emerald-600 dark:text-emerald-400 hover:underline">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Register;
