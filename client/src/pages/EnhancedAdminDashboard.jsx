import React, { useEffect, useMemo, useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { getStalls, getUsers } from "../api/userApi";
import {
  getBrandHonorings,
  getBusinessPresentations,
  getPanelDiscussions,
  getProductLaunches,
} from "../api/registrationApi";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "sonner";
import AdminUserCreation from "../components/AdminUserCreation";

function EnhancedAdminDashboard() {
  // New registration system states
  const [registrationData, setRegistrationData] = useState([]);
  const registrationCategories = [
    { id: "visitor", label: "Visitor Pass" },
    { id: "business_stall", label: "Business Stall" },
    { id: "brand_honoring", label: "Brand Honoring" },
    { id: "business_presentation", label: "Business Presentation" },
    { id: "panel_discussion", label: "Panel Discussion" },
    { id: "product_launch", label: "Product Launch" },
  ];
  const [registrationCategoryTab, setRegistrationCategoryTab] = useState("visitor");
  
  // UI states
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortFilter, setSortFilter] = useState("newest");
  const [isExporting, setIsExporting] = useState(false);
  const [showManualCreate, setShowManualCreate] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [visitorPaymentStatuses, setVisitorPaymentStatuses] = useState({
    paid: true,
    unpaid: true,
    admin_created: true,
  });
  const [visitorPlans, setVisitorPlans] = useState({
    full_day: true,
    evening_pass: true,
  });
  const [draftVisitorPaymentStatuses, setDraftVisitorPaymentStatuses] = useState({
    paid: true,
    unpaid: true,
    admin_created: true,
  });
  const [draftVisitorPlans, setDraftVisitorPlans] = useState({
    full_day: true,
    evening_pass: true,
  });
  
  const itemsPerPage = 15;
  const navigate = useNavigate();

  // Authentication check
  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    if (!loggedIn) navigate("/login");
  }, [navigate]);

  // Load new registration data
  useEffect(() => {
    loadRegistrationData();
  }, [registrationCategoryTab]);

  const loadRegistrationData = async () => {
    try {
      if (registrationCategoryTab === "visitor") {
        const res = await getUsers();
        const users = (res.data || []).filter(
          (u) => u.registrationType === "visitor" || !u.registrationType
        );
        setRegistrationData(users);
        return;
      }

      if (registrationCategoryTab === "business_stall") {
        const res = await getStalls();
        setRegistrationData(res.data || []);
        return;
      }

      if (registrationCategoryTab === "brand_honoring") {
        const res = await getBrandHonorings();
        setRegistrationData(res.data || []);
        return;
      }

      if (registrationCategoryTab === "business_presentation") {
        const res = await getBusinessPresentations();
        setRegistrationData(res.data || []);
        return;
      }

      if (registrationCategoryTab === "panel_discussion") {
        const res = await getPanelDiscussions();
        setRegistrationData(res.data || []);
        return;
      }

      if (registrationCategoryTab === "product_launch") {
        const res = await getProductLaunches();
        setRegistrationData(res.data || []);
        return;
      }

      setRegistrationData([]);
    } catch (error) {
      console.error("Error loading registration data:", error);
      setRegistrationData([]);
    }
  };

  const handleViewVisitorCard = (user) => {
    const url = `${window.location.origin}/card/${user._id}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    toast.success("Logged out successfully!");
    setTimeout(() => navigate("/login"), 800);
  };

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  
  // Filter data based on search term
  const filteredData = useMemo(() => {
    const filtered = (registrationData || [])
      .filter((item) => {
        if (!searchTerm) return true;
        const searchLower = searchTerm.toLowerCase();
        return (
          item.name?.toLowerCase().includes(searchLower) ||
          item.phone?.toLowerCase().includes(searchLower) ||
          item.email?.toLowerCase().includes(searchLower) ||
          item.company?.toLowerCase().includes(searchLower) ||
          item.companyName?.toLowerCase().includes(searchLower) ||
          item.place?.toLowerCase().includes(searchLower)
        );
      })
      .filter((item) => {
        if (registrationCategoryTab !== "visitor") return true;

        const status = (item.paymentStatus || "admin_created").toString();
        const statusAllowed =
          (status === "paid" && visitorPaymentStatuses.paid) ||
          (status === "unpaid" && visitorPaymentStatuses.unpaid) ||
          (status === "admin_created" && visitorPaymentStatuses.admin_created);
        if (!statusAllowed) return false;

        const amt = Number(item.paymentAmount);
        const planId = amt === 2000 ? "full_day" : amt === 999 ? "evening_pass" : "";
        if (!planId) return false;
        return (
          (planId === "full_day" && visitorPlans.full_day) ||
          (planId === "evening_pass" && visitorPlans.evening_pass)
        );
      });

    return [...filtered].sort((a, b) => {
      const aDate = new Date(a.createdAt || 0).getTime();
      const bDate = new Date(b.createdAt || 0).getTime();
      return sortFilter === "newest" ? bDate - aDate : aDate - bDate;
    });
  }, [
    registrationData,
    searchTerm,
    registrationCategoryTab,
    visitorPaymentStatuses,
    visitorPlans,
    sortFilter,
  ]);

  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.max(1, Math.ceil(filteredData.length / itemsPerPage));
  const currentCategoryLabel =
    registrationCategories.find((c) => c.id === registrationCategoryTab)?.label || "";

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((p) => p + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((p) => p - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleRefresh = async () => {
    try {
      await loadRegistrationData();
      toast.success("Data refreshed");
    } catch (e) {
      toast.error("Failed to refresh");
    }
  };

  const handleGoToPage = (page) => {
    const next = Math.min(totalPages, Math.max(1, page));
    setCurrentPage(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getPageNumbers = () => {
    const maxButtons = 5;
    const half = Math.floor(maxButtons / 2);
    let start = Math.max(1, currentPage - half);
    let end = Math.min(totalPages, start + maxButtons - 1);
    start = Math.max(1, end - maxButtons + 1);
    const pages = [];
    for (let p = start; p <= end; p += 1) pages.push(p);
    return pages;
  };

  const handleExport = async () => {
    setIsExporting(true);
    try {
      const dataToExport = filteredData;

      if (!dataToExport.length) {
        toast.error("No data to export!");
        return;
      }

      const workbook = XLSX.utils.book_new();

      const rows =
        registrationCategoryTab === "visitor"
          ? dataToExport.map((u) => ({
              ID: u._id,
              Name: u.name,
              Phone: u.phone,
              Place: u.place || "",
              Payment_Status: u.paymentStatus || "",
              Payment_Amount: u.paymentAmount || 0,
              Payment_Id: u.paymentId || "",
              Order_Id: u.orderId || "",
              Registered_At: u.createdAt ? new Date(u.createdAt).toLocaleString() : "",
            }))
          : registrationCategoryTab === "business_stall"
            ? dataToExport.map((s) => ({
                ID: s._id,
                Full_Name: s.name,
                Company_Name: s.companyName || "",
                Position: s.position || "",
                WhatsApp_Number: s.phone,
                Place: s.place || "",
                Registered_At: s.createdAt ? new Date(s.createdAt).toLocaleString() : "",
              }))
            : dataToExport.map((r) => ({
                ID: r._id,
                Name: r.name,
                Phone: r.phone,
                Email: r.email || "",
                Company: r.company || "",
                Remarks: r.remarks || "",
                Registered_At: r.createdAt ? new Date(r.createdAt).toLocaleString() : "",
              }));

      XLSX.utils.book_append_sheet(
        workbook,
        XLSX.utils.json_to_sheet(rows),
        currentCategoryLabel || "Export"
      );

      const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
      const blob = new Blob([excelBuffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      saveAs(blob, `${registrationCategoryTab}_${Date.now()}.xlsx`);
      toast.success("Data exported successfully!");
    } catch (error) {
      console.error("Export error:", error);
      toast.error("Failed to export data");
    } finally {
      setIsExporting(false);
    }
  };

  const renderTableHeaders = () => {
    if (registrationCategoryTab === "visitor") {
      return (
        <>
          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Name
          </th>
          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Phone
          </th>
          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Place
          </th>
          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Payment
          </th>
          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Amount
          </th>
          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Date
          </th>
          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Actions
          </th>
        </>
      );
    }

    if (registrationCategoryTab === "business_stall") {
      return (
        <>
          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Name
          </th>
          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Place
          </th>
          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Company Name
          </th>
          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Position
          </th>
          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            WhatsApp
          </th>
          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Date
          </th>
        </>
      );
    }

    return (
      <>
        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Name
        </th>
        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Phone
        </th>
        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Email
        </th>
        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Company
        </th>
        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Remarks
        </th>
        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Date
        </th>
      </>
    );
  };

  const renderTableRow = (item) => {
    if (registrationCategoryTab === "visitor") {
      return (
        <tr key={item._id} className="hover:bg-gray-50">
          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{item.name}</td>
          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{item.phone}</td>
          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{item.place || "-"}</td>
          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
            {item.paymentStatus || "-"}
          </td>
          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
            {typeof item.paymentAmount === "number" ? `₹${item.paymentAmount}` : "-"}
          </td>
          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
            {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : "-"}
          </td>
          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
            <button
              type="button"
              onClick={() => handleViewVisitorCard(item)}
              className="px-3 py-1.5 rounded-md bg-slate-900 text-white text-xs font-medium hover:bg-slate-800"
            >
              View Card
            </button>
          </td>
        </tr>
      );
    }

    if (registrationCategoryTab === "business_stall") {
      return (
        <tr key={item._id} className="hover:bg-gray-50">
          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{item.name}</td>
          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{item.place || "-"}</td>
          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{item.companyName || "-"}</td>
          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{item.position || "-"}</td>
          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{item.phone}</td>
          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
            {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : "-"}
          </td>
        </tr>
      );
    }

    return (
      <tr key={item._id} className="hover:bg-gray-50">
        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
          {item.name}
        </td>
        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
          {item.phone}
        </td>
        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
          {item.email || "-"}
        </td>
        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
          {item.company || "-"}
        </td>
        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
          {item.remarks || "-"}
        </td>
        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
          {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : "-"}
        </td>
      </tr>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster richColors position="top-right" />

      {showManualCreate && (
        <AdminUserCreation
          onClose={() => setShowManualCreate(false)}
          onSuccess={() => loadRegistrationData()}
          activeTab={
            registrationCategoryTab === "business_stall"
              ? "stall"
              : registrationCategoryTab
          }
        />
      )}
      
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600">Manage event registrations and data</p>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {showFilters && (
          <div className="fixed inset-0 z-50 flex items-start justify-center p-4 bg-black/40">
            <div className="w-full max-w-md bg-white rounded-xl shadow-xl border border-slate-200 mt-20">
              <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between">
                <div className="text-sm font-semibold text-slate-900">Filters</div>
                <button
                  type="button"
                  onClick={() => setShowFilters(false)}
                  className="text-slate-500 hover:text-slate-700"
                >
                  ✕
                </button>
              </div>

              <div className="px-5 py-4 space-y-5">
                <div>
                  <div className="text-xs font-semibold text-slate-700 uppercase tracking-wide mb-2">
                    Payment Status
                  </div>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm text-slate-700">
                      <input
                        type="checkbox"
                        checked={draftVisitorPaymentStatuses.paid}
                        onChange={(e) =>
                          setDraftVisitorPaymentStatuses((s) => ({ ...s, paid: e.target.checked }))
                        }
                      />
                      Paid
                    </label>
                    <label className="flex items-center gap-2 text-sm text-slate-700">
                      <input
                        type="checkbox"
                        checked={draftVisitorPaymentStatuses.unpaid}
                        onChange={(e) =>
                          setDraftVisitorPaymentStatuses((s) => ({ ...s, unpaid: e.target.checked }))
                        }
                      />
                      Unpaid
                    </label>
                    <label className="flex items-center gap-2 text-sm text-slate-700">
                      <input
                        type="checkbox"
                        checked={draftVisitorPaymentStatuses.admin_created}
                        onChange={(e) =>
                          setDraftVisitorPaymentStatuses((s) => ({
                            ...s,
                            admin_created: e.target.checked,
                          }))
                        }
                      />
                      Admin Created
                    </label>
                  </div>
                </div>

                <div>
                  <div className="text-xs font-semibold text-slate-700 uppercase tracking-wide mb-2">
                    Plan
                  </div>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm text-slate-700">
                      <input
                        type="checkbox"
                        checked={draftVisitorPlans.full_day}
                        onChange={(e) =>
                          setDraftVisitorPlans((s) => ({ ...s, full_day: e.target.checked }))
                        }
                      />
                      Full Day (₹2000)
                    </label>
                    <label className="flex items-center gap-2 text-sm text-slate-700">
                      <input
                        type="checkbox"
                        checked={draftVisitorPlans.evening_pass}
                        onChange={(e) =>
                          setDraftVisitorPlans((s) => ({ ...s, evening_pass: e.target.checked }))
                        }
                      />
                      Evening Pass (₹999)
                    </label>
                  </div>
                </div>
              </div>

              <div className="px-5 py-4 border-t border-slate-200 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => {
                    setDraftVisitorPaymentStatuses({ paid: true, unpaid: true, admin_created: true });
                    setDraftVisitorPlans({ full_day: true, evening_pass: true });
                  }}
                  className="px-4 py-2 text-sm rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                >
                  Clear
                </button>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setShowFilters(false)}
                    className="px-4 py-2 text-sm rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setVisitorPaymentStatuses(draftVisitorPaymentStatuses);
                      setVisitorPlans(draftVisitorPlans);
                      setCurrentPage(1);
                      setShowFilters(false);
                    }}
                    className="px-4 py-2 text-sm rounded-lg bg-emerald-600 text-white hover:bg-emerald-700"
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* Category Tabs (6 categories) */}
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <div className="flex flex-wrap gap-2">
            {registrationCategories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  setRegistrationCategoryTab(cat.id);
                  setCurrentPage(1);
                }}
                className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
                  registrationCategoryTab === cat.id
                    ? "bg-emerald-600 text-white border-emerald-600"
                    : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Search and Controls */}
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search by name, phone, email, or company..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setShowManualCreate(true)}
                className="px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800"
              >
                Create Manually
              </button>
              <button
                type="button"
                onClick={handleRefresh}
                className="px-4 py-2 bg-white text-slate-700 border border-slate-200 rounded-lg hover:bg-slate-50"
              >
                Refresh
              </button>
              {registrationCategoryTab === "visitor" && (
                <button
                  type="button"
                  onClick={() => {
                    setDraftVisitorPaymentStatuses(visitorPaymentStatuses);
                    setDraftVisitorPlans(visitorPlans);
                    setShowFilters(true);
                  }}
                  className="px-4 py-2 bg-white text-slate-700 border border-slate-200 rounded-lg hover:bg-slate-50"
                >
                  Filter
                </button>
              )}
              <select
                value={sortFilter}
                onChange={(e) => setSortFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
              </select>
              <button
                onClick={handleExport}
                disabled={isExporting}
                className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50"
              >
                {isExporting ? "Exporting..." : "Export Excel"}
              </button>
            </div>
          </div>

          <div className="mt-3 text-sm text-slate-600">
            <span className="font-medium text-slate-800">{currentCategoryLabel}</span>
            <span className="mx-2">|</span>
            <span>
              Total registrations: <span className="font-semibold text-slate-800">{registrationData.length}</span>
            </span>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {renderTableHeaders()}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentItems.length > 0 ? (
                  currentItems.map(renderTableRow)
                ) : (
                  <tr>
                    <td
                      colSpan={registrationCategoryTab === "visitor" ? 7 : 6}
                      className="px-4 py-8 text-center text-gray-500"
                    >
                      No data found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
              <div className="flex-1 flex justify-between sm:hidden">
                <button
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                >
                  Previous
                </button>
                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                >
                  Next
                </button>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to{" "}
                    <span className="font-medium">
                      {Math.min(indexOfLastItem, filteredData.length)}
                    </span>{" "}
                    of <span className="font-medium">{filteredData.length}</span> results
                  </p>
                </div>
                <div className="flex-1 flex justify-center">
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    <button
                      type="button"
                      onClick={handlePrevPage}
                      disabled={currentPage === 1}
                      className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                    >
                      Prev
                    </button>

                    {getPageNumbers().map((p) => (
                      <button
                        key={p}
                        type="button"
                        onClick={() => handleGoToPage(p)}
                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                          p === currentPage
                            ? "z-10 bg-emerald-50 border-emerald-500 text-emerald-600"
                            : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                        }`}
                      >
                        {p}
                      </button>
                    ))}

                    <button
                      type="button"
                      onClick={handleNextPage}
                      disabled={currentPage === totalPages}
                      className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                    >
                      Next
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default EnhancedAdminDashboard;
