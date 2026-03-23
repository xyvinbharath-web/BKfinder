import React, { useState, useRef } from "react";
import {
  adminCreateBrandHonoring,
  adminCreateBusinessPresentation,
  adminCreatePanelDiscussion,
  adminCreateProductLaunch,
  adminRegisterStall,
  adminRegisterUser,
} from "../api/userApi";
import { toast } from "sonner";

function AdminUserCreation({ onClose, onSuccess, activeTab }) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    place: "",
    visitorPlan: "",
    amount: "",
  });

  const [stallData, setStallData] = useState({
    name: "",
    companyName: "",
    position: "",
    phone: "",
    place: "",
  });

  const [errors, setErrors] = useState({});
  const [errorsStall, setErrorsStall] = useState({});
  const [errorsGeneric, setErrorsGeneric] = useState({});
  const [activeForm, setActiveForm] = useState(activeTab || "visitor");

  const [genericData, setGenericData] = useState({
    name: "",
    phone: "",
    email: "",
    company: "",
    remarks: "",
  });

  const formRef = useRef(null);

  // Validation functions
  const validateEventForm = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Full Name is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    else if (!/^[0-9]{10}$/.test(formData.phone)) newErrors.phone = "Enter 10 digit number";
    if (!formData.place.trim()) newErrors.place = "Place is required";
    if (!formData.visitorPlan) newErrors.visitorPlan = "Please select a plan";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStallForm = () => {
    let newErrors = {};
    if (!stallData.name.trim()) newErrors.name = "Full Name is required";
    if (!stallData.companyName.trim()) newErrors.companyName = "Company Name is required";
    if (!stallData.position.trim()) newErrors.position = "Position is required";
    if (!stallData.phone.trim()) newErrors.phone = "Phone number is required";
    else if (!/^[0-9]{10}$/.test(stallData.phone)) newErrors.phone = "Enter 10 digit number";
    if (!stallData.place.trim()) newErrors.place = "Place is required";
    setErrorsStall(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateGenericForm = () => {
    let newErrors = {};
    if (!genericData.name.trim()) newErrors.name = "Full Name is required";
    if (!genericData.phone.trim()) newErrors.phone = "Phone number is required";
    else if (!/^[0-9]{10}$/.test(genericData.phone)) newErrors.phone = "Enter 10 digit number";
    if (!genericData.email.trim()) newErrors.email = "Email is required";
    if (!genericData.company.trim()) newErrors.company = "Company is required";
    setErrorsGeneric(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Form submission handlers
  const handleEventSubmit = async (e) => {
    e.preventDefault();
    if (!validateEventForm()) return;

    try {
      const payload = new FormData();
      payload.append("name", formData.name);
      payload.append("phone", formData.phone);
      payload.append("place", formData.place);
      if (formData.amount) payload.append("amount", String(formData.amount));

      const response = await adminRegisterUser(payload);
      toast.success("Event ticket created successfully!");
      onSuccess();
      onClose();
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to create event ticket");
    }
  };

  const handleStallSubmit = async (e) => {
    e.preventDefault();
    if (!validateStallForm()) return;

    try {
      const response = await adminRegisterStall(stallData);
      toast.success("Stall booking created successfully!");
      onSuccess();
      onClose();
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to create stall booking");
    }
  };

  const handleGenericSubmit = async (e) => {
    e.preventDefault();
    if (!validateGenericForm()) return;

    try {
      if (activeForm === "brand_honoring") {
        await adminCreateBrandHonoring(genericData);
        toast.success("Brand honoring created successfully!");
      } else if (activeForm === "business_presentation") {
        await adminCreateBusinessPresentation(genericData);
        toast.success("Business presentation created successfully!");
      } else if (activeForm === "panel_discussion") {
        await adminCreatePanelDiscussion(genericData);
        toast.success("Panel discussion created successfully!");
      } else if (activeForm === "product_launch") {
        await adminCreateProductLaunch(genericData);
        toast.success("Product launch created successfully!");
      }

      onSuccess();
      onClose();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create entry");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Add User Manually</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
          >
            ×
          </button>
        </div>

        {/* Form Type Selector */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveForm("visitor")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeForm === "visitor"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Visitor Pass
            </button>
            <button
              onClick={() => setActiveForm("stall")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeForm === "stall"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Stall Booking
            </button>
            <button
              onClick={() => setActiveForm("brand_honoring")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeForm === "brand_honoring"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Brand Honoring
            </button>
            <button
              onClick={() => setActiveForm("business_presentation")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeForm === "business_presentation"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Presentation
            </button>
            <button
              onClick={() => setActiveForm("panel_discussion")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeForm === "panel_discussion"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Panel
            </button>
            <button
              onClick={() => setActiveForm("product_launch")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeForm === "product_launch"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Product Launch
            </button>
          </div>
        </div>

        {/* Forms */}
        <div className="px-6 py-6">
          {/* Event Form */}
          {activeForm === "visitor" && (
            <form ref={formRef} onSubmit={handleEventSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter full name"
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter 10 digit phone number"
                />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Place *
                </label>
                <input
                  type="text"
                  value={formData.place}
                  onChange={(e) => setFormData({ ...formData, place: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter place"
                />
                {errors.place && <p className="text-red-500 text-xs mt-1">{errors.place}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Plan *
                </label>
                <select
                  value={formData.visitorPlan}
                  onChange={(e) => {
                    const plan = e.target.value;
                    const amount =
                      plan === "full_day" ? 2000 : plan === "evening_pass" ? 999 : "";
                    setFormData({ ...formData, visitorPlan: plan, amount: amount ? String(amount) : "" });
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select plan</option>
                  <option value="full_day">Full Day Business Summit - ₹2000</option>
                  <option value="evening_pass">Business Summit & Networking Event Night - ₹999</option>
                </select>
                {errors.visitorPlan && (
                  <p className="text-red-500 text-xs mt-1">{errors.visitorPlan}</p>
                )}
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Create Event Ticket
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          {/* Stall Form */}
          {activeForm === "stall" && (
            <form onSubmit={handleStallSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={stallData.name}
                  onChange={(e) => setStallData({ ...stallData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter full name"
                />
                {errorsStall.name && <p className="text-red-500 text-xs mt-1">{errorsStall.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company Name *
                </label>
                <input
                  type="text"
                  value={stallData.companyName}
                  onChange={(e) => setStallData({ ...stallData, companyName: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter company name"
                />
                {errorsStall.companyName && <p className="text-red-500 text-xs mt-1">{errorsStall.companyName}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Position *
                </label>
                <input
                  type="text"
                  value={stallData.position}
                  onChange={(e) => setStallData({ ...stallData, position: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter position"
                />
                {errorsStall.position && <p className="text-red-500 text-xs mt-1">{errorsStall.position}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  value={stallData.phone}
                  onChange={(e) => setStallData({ ...stallData, phone: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter 10 digit phone number"
                />
                {errorsStall.phone && <p className="text-red-500 text-xs mt-1">{errorsStall.phone}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Place *
                </label>
                <input
                  type="text"
                  value={stallData.place}
                  onChange={(e) => setStallData({ ...stallData, place: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter place"
                />
                {errorsStall.place && <p className="text-red-500 text-xs mt-1">{errorsStall.place}</p>}
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Create Stall Booking
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          {/* Generic Forms */}
          {activeForm !== "visitor" && activeForm !== "stall" && (
            <form onSubmit={handleGenericSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={genericData.name}
                  onChange={(e) => setGenericData({ ...genericData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter full name"
                />
                {errorsGeneric.name && <p className="text-red-500 text-xs mt-1">{errorsGeneric.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  value={genericData.phone}
                  onChange={(e) => setGenericData({ ...genericData, phone: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter 10 digit phone number"
                />
                {errorsGeneric.phone && <p className="text-red-500 text-xs mt-1">{errorsGeneric.phone}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  value={genericData.email}
                  onChange={(e) => setGenericData({ ...genericData, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter email"
                />
                {errorsGeneric.email && <p className="text-red-500 text-xs mt-1">{errorsGeneric.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company *
                </label>
                <input
                  type="text"
                  value={genericData.company}
                  onChange={(e) => setGenericData({ ...genericData, company: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter company"
                />
                {errorsGeneric.company && <p className="text-red-500 text-xs mt-1">{errorsGeneric.company}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Remarks
                </label>
                <textarea
                  value={genericData.remarks}
                  onChange={(e) => setGenericData({ ...genericData, remarks: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter remarks"
                  rows={3}
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Create
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminUserCreation;
