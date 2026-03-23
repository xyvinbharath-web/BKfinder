import React, { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  createRazorpayOrder,
  getRazorpayKey,
  registerGroupBooking,
  registerStall,
  registerUser,
} from "../api/userApi";
import {
  submitBrandHonoring,
  submitBusinessPresentation,
  submitPanelDiscussion,
  submitProductLaunch,
} from "../api/registrationApi";

function DynamicRegisterPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const detailsSectionRef = useRef(null);
  const hasAppliedPackagePrefillRef = useRef(false);
  const hasAppliedCategoryPrefillRef = useRef(false);
  const [pageEnter, setPageEnter] = useState(false);
  
  // Registration categories
  const categories = useMemo(
    () => [
      {
        id: "visitor",
        name: "Visitor Pass",
        description: "Event registration (Payment required)",
        paymentRequired: true,
      },
      {
        id: "business_stall",
        name: "Business Stall",
        description: "Book your business stall (details only)",
        paymentRequired: false,
      },
      {
        id: "brand_honoring",
        name: "Brand Honoring",
        description: "Submit details for brand honoring",
        paymentRequired: false,
      },
      {
        id: "business_presentation",
        name: "Business Presentation",
        description: "Apply for a business presentation",
        paymentRequired: false,
      },
      {
        id: "panel_discussion",
        name: "Panel Discussion",
        description: "Apply for panel discussion",
        paymentRequired: false,
      },
      {
        id: "product_launch",
        name: "Product Launch",
        description: "Apply for product launch",
        paymentRequired: false,
      },
    ],
    []
  );

  const visitorPlans = useMemo(
    () => [
      {
        id: "full_day",
        title: "Full Day Business Summit",
        time: "9:00 AM – 9:30 PM",
        amount: 2000,
        priceLabel: "₹2000 (Including GST)",
        benefits: [
          "Entry pass for one person",
          "Entry to EPIC Young Exporters Mega Meet",
          "Business Summit",
          "Business Networking Opportunity",
          "Lunch + Tea + Snacks + Dinner",
        ],
      },
      {
        id: "evening_pass",
        title: "Business Summit & Networking Event Night",
        time: "3:00 PM – 9:30 PM",
        amount: 999,
        priceLabel: "₹999 (Including GST)",
        benefits: [
          "Entry pass for one person",
          "Dinner Provided",
          "Business Networking Opportunity",
        ],
      },
    ],
    []
  );

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedVisitorPlan, setSelectedVisitorPlan] = useState(null);

  const [groupMembers, setGroupMembers] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    company: "",
    designation: "",
    city: "",
    remarks: "",
    place: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setPageEnter(true));
  }, []);

  useEffect(() => {
    if (hasAppliedPackagePrefillRef.current) return;

    const rawPackageType = location?.state?.packageType;
    if (!rawPackageType) return;

    // VisitorPackages uses: full_day | half_day
    // DynamicRegisterPage uses: full_day | evening_pass
    const planId = rawPackageType === "half_day" ? "evening_pass" : rawPackageType;
    const targetPlan = visitorPlans.find((p) => p.id === planId);
    if (!targetPlan) return;

    hasAppliedPackagePrefillRef.current = true;
    setSelectedCategory("visitor");
    setSelectedVisitorPlan(targetPlan.id);

    window.setTimeout(() => {
      detailsSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  }, [location?.state?.packageType, visitorPlans]);

  useEffect(() => {
    if (hasAppliedCategoryPrefillRef.current) return;

    const rawCategory = location?.state?.category;
    if (!rawCategory) return;

    const allowed = new Set(categories.map((c) => c.id));
    if (!allowed.has(rawCategory)) return;

    hasAppliedCategoryPrefillRef.current = true;
    setSelectedCategory(rawCategory);

    window.setTimeout(() => {
      detailsSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  }, [location?.state?.category, categories]);

  useEffect(() => {
    if (!selectedCategory) return;

    const isMobileOrTablet = window.matchMedia("(max-width: 1023px)").matches;
    if (!isMobileOrTablet) return;

    const el = detailsSectionRef.current;
    if (!el) return;

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
  }, [selectedCategory, selectedVisitorPlan]);

  const validateForm = () => {
    let newErrors = {};

    // Common validations
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone = "Enter 10 digit number";
    }

    if (selectedCategory === "visitor") {
      if (!selectedVisitorPlan) {
        newErrors.packageType = "Please select a plan";
      }
      if (!formData.place.trim()) newErrors.place = "Place is required";

      if (Array.isArray(groupMembers) && groupMembers.length > 0) {
        groupMembers.forEach((m, idx) => {
          if (!m?.name?.trim()) newErrors[`member_${idx}_name`] = "Name is required";
          if (!m?.phone?.trim()) {
            newErrors[`member_${idx}_phone`] = "Phone number is required";
          } else if (!/^[0-9]{10}$/.test(m.phone)) {
            newErrors[`member_${idx}_phone`] = "Enter 10 digit number";
          }
          if (!m?.place?.trim()) newErrors[`member_${idx}_place`] = "Place is required";
        });
      }
    } else if (selectedCategory === "business_stall") {
      if (!formData.company.trim()) newErrors.company = "Company Name is required";
      if (!formData.designation.trim()) newErrors.designation = "Position is required";
      if (!formData.city.trim()) newErrors.city = "Place is required";
    } else {
      if (!formData.email.trim()) {
        newErrors.email = "Email is required";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = "Enter valid email";
      }
      if (!formData.company.trim()) newErrors.company = "Company is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    setSelectedVisitorPlan(null);
    setGroupMembers([]);
    setFormData({
      name: "",
      phone: "",
      email: "",
      company: "",
      designation: "",
      city: "",
      remarks: "",
      place: "",
    });
    setErrors({});
  };

  const handleGroupMemberChange = (index, field, value) => {
    setGroupMembers((prev) => {
      const next = [...prev];
      const current = next[index] || { name: "", phone: "", place: "" };

      let nextValue = value;
      if (field === "phone") {
        nextValue = value.replace(/\D/g, "").slice(0, 10);
      }

      next[index] = { ...current, [field]: nextValue };
      return next;
    });

    setErrors((prev) => ({ ...prev, [`member_${index}_${field}`]: "" }));
  };

  const addGroupMember = () => {
    setGroupMembers((prev) => [...prev, { name: "", phone: "", place: "" }]);
  };

  const removeGroupMember = (index) => {
    setGroupMembers((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Only allow 10 digits for phone field
    if (name === "phone") {
      const numericValue = value.replace(/\D/g, "").slice(0, 10);
      setFormData((prev) => ({ ...prev, [name]: numericValue }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    // Clear error for that field while typing
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) return resolve(true);

      const existing = document.getElementById("razorpay-checkout-js");
      if (existing) {
        existing.addEventListener("load", () => resolve(true));
        existing.addEventListener("error", () => resolve(false));
        return;
      }

      const script = document.createElement("script");
      script.id = "razorpay-checkout-js";
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedCategory) {
      toast.error("Please select a registration category");
      return;
    }

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      if (selectedCategory === "visitor") {
        const plan = visitorPlans.find((p) => p.id === selectedVisitorPlan);
        if (!plan) {
          toast.error("Please select a plan");
          return;
        }

        const scriptLoaded = await loadRazorpayScript();
        if (!scriptLoaded) {
          toast.error("Payment SDK failed to load. Please try again.");
          return;
        }

        const keyRes = await getRazorpayKey();
        const keyId = keyRes?.data?.keyId;
        if (!keyId) {
          toast.error("Payment is not configured. Please contact support.");
          return;
        }

        const ticketsCount = 1 + (Array.isArray(groupMembers) ? groupMembers.length : 0);
        const totalAmount = plan.amount * ticketsCount;
        const orderRes = await createRazorpayOrder({ amount: totalAmount, currency: "INR" });

        const options = {
          key: keyId,
          amount: orderRes.data.amount,
          currency: orderRes.data.currency,
          name: "1000 Brand Owners Business Summit 2026",
          description: plan.title,
          order_id: orderRes.data.id,
          handler: async (paymentResponse) => {
            try {
              const hasGroupMembers = Array.isArray(groupMembers) && groupMembers.length > 0;
              if (hasGroupMembers) {
                const primaryContact = {
                  name: formData.name,
                  phone: formData.phone,
                };

                const members = [
                  { name: formData.name, phone: formData.phone, place: formData.place },
                  ...groupMembers,
                ];

                const payload = {
                  primaryContact,
                  members,
                  perMemberAmount: plan.amount,
                  payment: {
                    paymentId: paymentResponse.razorpay_payment_id,
                    orderId: paymentResponse.razorpay_order_id,
                    signature: paymentResponse.razorpay_signature,
                  },
                };

                const response = await registerGroupBooking(payload);
                toast.success("Group booking successful!");
                navigate(`/group-tickets/${response.data.groupId}`);
                return;
              }

              const formDataToSend = new FormData();
              formDataToSend.append("name", formData.name);
              formDataToSend.append("phone", formData.phone);
              formDataToSend.append("place", formData.place);
              formDataToSend.append("razorpay_payment_id", paymentResponse.razorpay_payment_id);
              formDataToSend.append("razorpay_order_id", paymentResponse.razorpay_order_id);
              formDataToSend.append("amount", String(plan.amount));

              const response = await registerUser(formDataToSend);
              toast.success(response.data.message);
              navigate(`/register-success/${response.data.userId}`);
            } catch (error) {
              console.error("Registration save error:", error);
              toast.error(
                error.response?.data?.message ||
                  "Payment succeeded but saving registration failed. Please contact support."
              );
            }
          },
          prefill: {
            name: formData.name,
            contact: formData.phone,
          },
          notes: {
            category: "visitor",
            packageType: plan.id,
          },
          theme: {
            color: "#059669",
          },
        };

        const rz = new window.Razorpay(options);
        rz.on("payment.failed", () => {
          toast.error("Payment failed. Please try again.");
        });
        rz.open();
        return;
      }

      const extraFields = {};
      if (selectedCategory === "business_stall") {
        const payload = {
          name: formData.name,
          companyName: formData.company,
          position: formData.designation,
          phone: formData.phone,
          place: formData.city,
        };

        const response = await registerStall(payload);
        toast.success(response.data.message);
        navigate("/registration-success");
        return;
      }

      if (selectedCategory === "brand_honoring") {
        const payload = {
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          company: formData.company,
          remarks: formData.remarks || "",
        };

        const response = await submitBrandHonoring(payload);
        toast.success(response.data.message);
        navigate("/registration-success");
        return;
      }

      if (selectedCategory === "business_presentation") {
        const payload = {
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          company: formData.company,
          remarks: formData.remarks || "",
        };

        const response = await submitBusinessPresentation(payload);
        toast.success(response.data.message);
        navigate("/registration-success");
        return;
      }

      if (selectedCategory === "panel_discussion") {
        const payload = {
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          company: formData.company,
          remarks: formData.remarks || "",
        };

        const response = await submitPanelDiscussion(payload);
        toast.success(response.data.message);
        navigate("/registration-success");
        return;
      }

      if (selectedCategory === "product_launch") {
        const payload = {
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          company: formData.company,
          remarks: formData.remarks || "",
        };

        const response = await submitProductLaunch(payload);
        toast.success(response.data.message);
        navigate("/registration-success");
        return;
      } else if (formData.remarks) {
        extraFields.remarks = formData.remarks;
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast.error(error.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-slate-50 to-white transition-all duration-500 ease-out ${
        pageEnter ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
      }`}
    >
      <div className="w-full bg-gradient-to-r from-slate-900 to-emerald-900">
        <div className="max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-white">Event Registration</h1>
          <p className="mt-2 text-slate-200">1000 Brand Owners Business Summit 2026</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-slate-900 mb-6">Choose a Category</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => handleCategorySelect(category.id)}
                    className={`p-4 rounded-xl border text-left transition-all duration-200 hover:shadow-sm ${
                      selectedCategory === category.id
                        ? "border-emerald-500 bg-emerald-50"
                        : "border-slate-200 bg-white hover:border-slate-300"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="font-semibold text-slate-900">{category.name}</div>
                        <div className="text-sm text-slate-600 mt-1">{category.description}</div>
                      </div>
                      {category.paymentRequired && (
                        <span className="shrink-0 text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-600 text-white">
                          Pay
                        </span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-2" ref={detailsSectionRef}>
            {!selectedCategory && (
              <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Select a Category</h3>
                <p className="text-slate-600">Choose one category to continue.</p>
              </div>
            )}

            {selectedCategory === "visitor" && !selectedVisitorPlan && (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="flex items-start justify-between gap-6 mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">Visitor Pass</h2>
                    <p className="text-slate-600 mt-1">Select a plan to continue.</p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedCategory("")}
                    className="text-sm font-semibold text-slate-600 hover:text-slate-900"
                  >
                    Change category
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {visitorPlans.map((plan) => (
                    <div key={plan.id} className="rounded-2xl border border-slate-200 overflow-hidden">
                      <div className="p-4 sm:p-6">
                        <div className="text-sm font-semibold text-slate-500">PLAN</div>
                        <div className="mt-2 text-base sm:text-lg font-bold text-slate-900">{plan.title}</div>
                        <div className="mt-1 text-xs sm:text-sm text-slate-600">Time: {plan.time}</div>

                        <div className="mt-4 rounded-xl bg-slate-50 p-3 sm:p-4 border border-slate-100">
                          <div className="text-xs sm:text-sm text-slate-600">Price</div>
                          <div className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">
                            {plan.priceLabel}
                          </div>
                        </div>

                        <div className="mt-4">
                          <div className="text-xs sm:text-sm font-semibold text-slate-700 mb-2">Benefits</div>
                          <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-slate-600">
                            {plan.benefits.map((b) => (
                              <li key={b} className="flex gap-2">
                                <span className="mt-0.5 h-2 w-2 rounded-full bg-emerald-500 shrink-0" />
                                <span>{b}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            setSelectedVisitorPlan(plan.id);
                            setErrors((prev) => ({ ...prev, packageType: "" }));
                          }}
                          className="mt-5 sm:mt-6 w-full bg-emerald-600 text-white py-2.5 sm:py-3 px-4 rounded-xl text-sm sm:text-base font-semibold hover:bg-emerald-700 transition-colors"
                        >
                          Select Plan
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedCategory && (selectedCategory !== "visitor" || selectedVisitorPlan) && (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="flex items-start justify-between gap-6 mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">
                      {categories.find((c) => c.id === selectedCategory)?.name}
                    </h2>
                    {selectedCategory === "visitor" && selectedVisitorPlan && (
                      <p className="text-slate-600 mt-1">
                        Selected plan: {visitorPlans.find((p) => p.id === selectedVisitorPlan)?.title}
                      </p>
                    )}
                  </div>

                  {selectedCategory === "visitor" && (
                    <button
                      type="button"
                      onClick={() => setSelectedVisitorPlan(null)}
                      className="text-sm font-semibold text-slate-600 hover:text-slate-900"
                    >
                      Change plan
                    </button>
                  )}
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        {selectedCategory === "business_stall" ? "Full Name *" : "Name *"}
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors ${
                          errors.name ? "border-red-500" : "border-slate-300"
                        }`}
                        placeholder={
                          selectedCategory === "business_stall" ? "Enter full name" : "Enter your name"
                        }
                      />
                      {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        {selectedCategory === "business_stall" ? "WhatsApp Number *" : "Phone *"}
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors ${
                          errors.phone ? "border-red-500" : "border-slate-300"
                        }`}
                        placeholder="10 digit WhatsApp number"
                        maxLength={10}
                      />
                      {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                    </div>
                  </div>

                  {selectedCategory === "visitor" ? (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Place *</label>
                        <input
                          type="text"
                          name="place"
                          value={formData.place}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors ${
                            errors.place ? "border-red-500" : "border-slate-300"
                          }`}
                          placeholder="Enter your place"
                        />
                        {errors.place && <p className="mt-1 text-sm text-red-600">{errors.place}</p>}
                      </div>

                      {Array.isArray(groupMembers) && groupMembers.length > 0 && (
                        <div className="space-y-4">
                          {groupMembers.map((m, idx) => (
                            <div key={idx} className="rounded-2xl border border-slate-200 p-4">
                              <div className="flex items-start justify-between gap-4">
                                <div className="text-sm font-semibold text-slate-900">Member {idx + 2}</div>
                                <button
                                  type="button"
                                  onClick={() => removeGroupMember(idx)}
                                  className="text-sm font-semibold text-red-600 hover:text-red-700"
                                >
                                  Remove
                                </button>
                              </div>

                              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <label className="block text-sm font-medium text-slate-700 mb-2">Name *</label>
                                  <input
                                    type="text"
                                    value={m.name}
                                    onChange={(e) => handleGroupMemberChange(idx, "name", e.target.value)}
                                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors ${
                                      errors[`member_${idx}_name`] ? "border-red-500" : "border-slate-300"
                                    }`}
                                    placeholder="Enter name"
                                  />
                                  {errors[`member_${idx}_name`] && (
                                    <p className="mt-1 text-sm text-red-600">{errors[`member_${idx}_name`]}</p>
                                  )}
                                </div>

                                <div>
                                  <label className="block text-sm font-medium text-slate-700 mb-2">Phone *</label>
                                  <input
                                    type="tel"
                                    value={m.phone}
                                    onChange={(e) => handleGroupMemberChange(idx, "phone", e.target.value)}
                                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors ${
                                      errors[`member_${idx}_phone`] ? "border-red-500" : "border-slate-300"
                                    }`}
                                    placeholder="10 digit phone number"
                                    maxLength={10}
                                  />
                                  {errors[`member_${idx}_phone`] && (
                                    <p className="mt-1 text-sm text-red-600">{errors[`member_${idx}_phone`]}</p>
                                  )}
                                </div>

                                <div className="md:col-span-2">
                                  <label className="block text-sm font-medium text-slate-700 mb-2">Place *</label>
                                  <input
                                    type="text"
                                    value={m.place}
                                    onChange={(e) => handleGroupMemberChange(idx, "place", e.target.value)}
                                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors ${
                                      errors[`member_${idx}_place`] ? "border-red-500" : "border-slate-300"
                                    }`}
                                    placeholder="Enter place"
                                  />
                                  {errors[`member_${idx}_place`] && (
                                    <p className="mt-1 text-sm text-red-600">{errors[`member_${idx}_place`]}</p>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="flex justify-end">
                        <button
                          type="button"
                          onClick={addGroupMember}
                          className="px-3 py-2 rounded-lg text-xs font-semibold bg-emerald-600 text-white hover:bg-emerald-700 transition-colors"
                        >
                          Add Member
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      {selectedCategory === "business_stall" ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
Company Name *</label>
                            <input
                              type="text"
                              name="company"
                              value={formData.company}
                              onChange={handleChange}
                              className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors ${
                                errors.company ? "border-red-500" : "border-slate-300"
                              }`}
                              placeholder="Enter company name"
                            />
                            {errors.company && <p className="mt-1 text-sm text-red-600">{errors.company}</p>}
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Position *</label>
                            <input
                              type="text"
                              name="designation"
                              value={formData.designation}
                              onChange={handleChange}
                              className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors ${
                                errors.designation ? "border-red-500" : "border-slate-300"
                              }`}
                              placeholder="Founder / CEO"
                            />
                            {errors.designation && (
                              <p className="mt-1 text-sm text-red-600">{errors.designation}</p>
                            )}
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Place *</label>
                            <input
                              type="text"
                              name="city"
                              value={formData.city}
                              onChange={handleChange}
                              className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors ${
                                errors.city ? "border-red-500" : "border-slate-300"
                              }`}
                              placeholder="Enter place"
                            />
                            {errors.city && <p className="mt-1 text-sm text-red-600">{errors.city}</p>}
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-slate-700 mb-2">Email *</label>
                              <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors ${
                                  errors.email ? "border-red-500" : "border-slate-300"
                                }`}
                                placeholder="Enter your email"
                              />
                              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-slate-700 mb-2">Company *</label>
                              <input
                                type="text"
                                name="company"
                                value={formData.company}
                                onChange={handleChange}
                                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors ${
                                  errors.company ? "border-red-500" : "border-slate-300"
                                }`}
                                placeholder="Enter your company"
                              />
                              {errors.company && <p className="mt-1 text-sm text-red-600">{errors.company}</p>}
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Remarks</label>
                            <textarea
                              name="remarks"
                              value={formData.remarks}
                              onChange={handleChange}
                              rows={3}
                              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors resize-none"
                              placeholder="Optional"
                            />
                          </div>
                        </>
                      )}
                    </>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-emerald-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-emerald-700 focus:ring-4 focus:ring-emerald-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                  >
                    {isSubmitting
                      ? "Processing..."
                      : selectedCategory === "visitor"
                        ? "Proceed to Pay"
                        : "Submit"}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DynamicRegisterPage;
