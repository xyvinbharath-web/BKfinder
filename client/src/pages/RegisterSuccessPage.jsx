import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { saveAs } from "file-saver";
import { toast } from "sonner";
import { getUserById } from "../api/userApi";

function RegisterSuccessPage() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getUserById(id);
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user:", error);
        toast.error("Failed to load registration details");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchUser();
    }
  }, [id]);

  const downloadCard = async () => {
    if (!id) return;

    setDownloading(true);
    try {
      const baseUrl = import.meta.env.VITE_BASE_URL || "";
      const imageUrl = `${baseUrl}/api/card/image/${id}`;

      const response = await fetch(imageUrl);
      if (!response.ok) {
        throw new Error(`Download failed with status ${response.status}`);
      }
      const blob = await response.blob();
      saveAs(blob, `summit-card-${user?.name || id}.png`);
      toast.success("Card downloaded successfully!");
    } catch (error) {
      console.error("Error downloading card:", error);
      toast.error("Failed to download card");
    } finally {
      setDownloading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading your registration details...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-white">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">Registration Not Found</h1>
          <Link to="/register" className="text-emerald-600 hover:text-emerald-700 underline">
            Return to Registration
          </Link>
        </div>
      </div>
    );
  }

  const packageLabel = user?.packageType
    ? user.packageType === "full_day"
      ? "Full Day Package"
      : "Half Day Package"
    : "";
  const packagePrice = user?.packageType ? (user.packageType === "full_day" ? "₹2000" : "₹999") : "";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mb-4">
            <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Registration Successful!
          </h1>
          <p className="text-xl text-slate-600">
            You're successfully registered for the 1000 Brand Owners Business Summit 2026
          </p>
        </div>

        {/* Registration Details Card */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 px-8 py-6">
            <h2 className="text-2xl font-bold text-white">Registration Details</h2>
          </div>
          
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-slate-900 border-b pb-2">Personal Information</h3>
                
                <div className="flex justify-between py-2">
                  <span className="text-slate-600">Name:</span>
                  <span className="font-medium text-slate-900">{user.name}</span>
                </div>
                
                <div className="flex justify-between py-2">
                  <span className="text-slate-600">Phone:</span>
                  <span className="font-medium text-slate-900">{user.phone}</span>
                </div>
                
                {user.email && (
                  <div className="flex justify-between py-2">
                    <span className="text-slate-600">Email:</span>
                    <span className="font-medium text-slate-900">{user.email}</span>
                  </div>
                )}

                <div className="flex justify-between py-2">
                  <span className="text-slate-600">Place:</span>
                  <span className="font-medium text-slate-900">{user.place || "-"}</span>
                </div>
              </div>

              {/* Event Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-slate-900 border-b pb-2">Event Information</h3>
                
                <div className="flex justify-between py-2">
                  <span className="text-slate-600">Event:</span>
                  <span className="font-medium text-slate-900">1000 Brand Owners Business Summit</span>
                </div>
                
                <div className="flex justify-between py-2">
                  <span className="text-slate-600">Date:</span>
                  <span className="font-medium text-slate-900">10 May 2026</span>
                </div>
                
                <div className="flex justify-between py-2">
                  <span className="text-slate-600">Venue:</span>
                  <span className="font-medium text-slate-900">Capkon Convention Centre</span>
                </div>
                
                {packageLabel && (
                  <div className="flex justify-between py-2">
                    <span className="text-slate-600">Package:</span>
                    <span className="font-medium text-emerald-600">{packageLabel}</span>
                  </div>
                )}

                {packagePrice && (
                  <div className="flex justify-between py-2">
                    <span className="text-slate-600">Price:</span>
                    <span className="font-bold text-slate-900">{packagePrice}</span>
                  </div>
                )}
              </div>
            </div>

            {user.remarks && (
              <div className="mt-6 pt-6 border-t">
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Remarks</h3>
                <p className="text-slate-600 bg-slate-50 rounded-lg p-4">{user.remarks}</p>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={downloadCard}
            disabled={downloading}
            className="bg-emerald-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-emerald-700 focus:ring-4 focus:ring-emerald-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center"
          >
            {downloading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Downloading...
              </>
            ) : (
              <>
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
                Download Registration Card
              </>
            )}
          </button>

          <Link
            to={`/card/${id}`}
            target="_blank"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 transition-all duration-200 flex items-center justify-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
            </svg>
            View Digital Card
          </Link>

          <Link
            to="/register"
            className="bg-slate-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-slate-700 focus:ring-4 focus:ring-slate-200 transition-all duration-200 flex items-center justify-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
            Register Another Person
          </Link>
        </div>

        {/* Important Information */}
        <div className="mt-12 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">Important Information</h3>
          <ul className="space-y-2 text-blue-800">
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              Please bring a valid ID proof for verification at the venue
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              Please arrive 30 minutes before the event start time
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              For any queries, contact the event support team
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default RegisterSuccessPage;
