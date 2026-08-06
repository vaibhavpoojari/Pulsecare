import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import LoadingSpinner from "../components/common/LoadingSpinner";
import {
  UserIcon,
  PhoneIcon,
  EnvelopeIcon,
  ShieldCheckIcon,
  HeartIcon,
  ExclamationTriangleIcon,
  PencilSquareIcon,
  CheckIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { toast } from "react-hot-toast";

const ProfilePage = () => {
  const { user, loading } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    bloodGroup: "O+",
    allergies: "Penicillin, Peanuts",
    emergencyContactName: "Jane Doe",
    emergencyContactPhone: "+1 (555) 019-2834",
    emergencyRelation: "Spouse",
    chronicConditions: "Mild Asthma",
    specialization: "General Practice",
    licenseNumber: "MD-984210",
    experience: "8",
    pharmacyName: "HealthFirst Pharmacy",
    pharmacyAddress: "123 Medical Plaza, Suite 400",
  });

  useEffect(() => {
    if (user) {
      const savedProfile = localStorage.getItem(`profile_${user.id || user.email}`);
      const initial = savedProfile ? JSON.parse(savedProfile) : {};
      setFormData((prev) => ({
        ...prev,
        name: user.name || prev.name,
        email: user.email || prev.email,
        contact: user.contact || prev.contact,
        ...initial,
      }));
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user) {
      localStorage.setItem(`profile_${user.id || user.email}`, JSON.stringify(formData));
    }
    toast.success("Profile details updated successfully!");
    setIsEditing(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center py-16 text-gray-600 dark:text-gray-400">
        Please log in to view your profile.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Top Banner Card */}
      <div className="glass-card p-6 md:p-8 mb-8 rounded-3xl bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center space-x-5">
          <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-3xl font-extrabold border-2 border-white/40 shadow-inner">
            {formData.name ? formData.name.charAt(0).toUpperCase() : "U"}
          </div>
          <div>
            <h1 className="text-2xl lg:text-3xl font-extrabold font-heading">
              {formData.name}
            </h1>
            <p className="text-emerald-100 text-sm font-medium mt-0.5">
              {formData.email}
            </p>
            <div className="flex items-center space-x-2 mt-2">
              <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-semibold uppercase tracking-wider">
                Role: {user.role}
              </span>
              <span className="px-3 py-1 bg-emerald-400/30 backdrop-blur-md rounded-full text-xs font-semibold flex items-center gap-1">
                <ShieldCheckIcon className="w-3.5 h-3.5 text-white" />
                Verified
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={() => setIsEditing(!isEditing)}
          className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition flex items-center space-x-2 shadow-lg ${
            isEditing
              ? "bg-rose-500 hover:bg-rose-600 text-white"
              : "bg-white text-emerald-700 hover:bg-emerald-50"
          }`}
        >
          {isEditing ? (
            <>
              <XMarkIcon className="w-4 h-4" />
              <span>Cancel Edit</span>
            </>
          ) : (
            <>
              <PencilSquareIcon className="w-4 h-4" />
              <span>Edit Profile</span>
            </>
          )}
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Details */}
        <div className="glass-card p-6 rounded-3xl">
          <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2 font-heading">
            <UserIcon className="w-5 h-5 text-emerald-500" />
            Personal Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label-base">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="input-base"
              />
            </div>
            <div>
              <label className="label-base">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="input-base"
              />
            </div>
            <div>
              <label className="label-base">Contact Phone</label>
              <input
                type="tel"
                name="contact"
                value={formData.contact}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="input-base"
              />
            </div>
            <div>
              <label className="label-base">Blood Group</label>
              <select
                name="bloodGroup"
                value={formData.bloodGroup}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="input-base"
              >
                {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bg) => (
                  <option key={bg} value={bg}>
                    {bg}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Emergency Contacts & Health Info */}
        <div className="glass-card p-6 rounded-3xl">
          <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2 font-heading">
            <HeartIcon className="w-5 h-5 text-rose-500" />
            Emergency Contacts & Health Profile
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label-base">Emergency Contact Name</label>
              <input
                type="text"
                name="emergencyContactName"
                value={formData.emergencyContactName}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="input-base"
              />
            </div>
            <div>
              <label className="label-base">Emergency Phone</label>
              <input
                type="tel"
                name="emergencyContactPhone"
                value={formData.emergencyContactPhone}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="input-base"
              />
            </div>
            <div>
              <label className="label-base">Known Allergies</label>
              <input
                type="text"
                name="allergies"
                value={formData.allergies}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="input-base"
              />
            </div>
            <div>
              <label className="label-base">Chronic Conditions</label>
              <input
                type="text"
                name="chronicConditions"
                value={formData.chronicConditions}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="input-base"
              />
            </div>
          </div>
        </div>

        {/* Role Specific Section */}
        {user.role === "doctor" && (
          <div className="glass-card p-6 rounded-3xl">
            <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4 font-heading">
              Clinical & Practice Credentials
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="label-base">Specialization</label>
                <input
                  type="text"
                  name="specialization"
                  value={formData.specialization}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="input-base"
                />
              </div>
              <div>
                <label className="label-base">License Number</label>
                <input
                  type="text"
                  name="licenseNumber"
                  value={formData.licenseNumber}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="input-base"
                />
              </div>
              <div>
                <label className="label-base">Years of Experience</label>
                <input
                  type="number"
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="input-base"
                />
              </div>
            </div>
          </div>
        )}

        {user.role === "pharmacist" && (
          <div className="glass-card p-6 rounded-3xl">
            <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4 font-heading">
              Pharmacy Store Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="label-base">Pharmacy Name</label>
                <input
                  type="text"
                  name="pharmacyName"
                  value={formData.pharmacyName}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="input-base"
                />
              </div>
              <div>
                <label className="label-base">License Number</label>
                <input
                  type="text"
                  name="licenseNumber"
                  value={formData.licenseNumber}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="input-base"
                />
              </div>
              <div className="md:col-span-2">
                <label className="label-base">Pharmacy Address</label>
                <textarea
                  name="pharmacyAddress"
                  value={formData.pharmacyAddress}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  rows="3"
                  className="input-base"
                />
              </div>
            </div>
          </div>
        )}

        {isEditing && (
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="btn-secondary"
            >
              Cancel
            </button>
            <button type="submit" className="btn-primary flex items-center gap-2">
              <CheckIcon className="w-4 h-4" />
              Save Profile Changes
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default ProfilePage;
