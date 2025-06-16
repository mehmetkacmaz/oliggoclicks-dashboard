"use client"

import Image from "next/image"
import { useState } from "react"

export default function UserActivityPage() {
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [selectedProfile, setSelectedProfile] = useState(0)
  const [activeMode, setActiveMode] = useState("All Users")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)

  const subProfiles = [
    { id: 0, name: "JT", color: "bg-blue-500", initials: "JT" },
    { id: 1, name: "MA", color: "bg-orange-500", initials: "MA" },
  ]

  const modes = ["All Users", "Safe Mode", "Monitor Mode", "Aggressive Mode"]

  const userData = [
    {
      id: 1,
      userId: "10324326-234243",
      ipAddress: "123.12.123131.2131",
      clicks: 4,
      timestamp: "14 Jan 2024\n10:00 Eastern",
      fraudReason: "ISP Fraud",
      mode: "Aggressive Mode",
      status: "Blocked",
      modeColor: "bg-red-100 text-red-800",
      statusColor: "text-red-600",
    },
    {
      id: 2,
      userId: "10324326-234243",
      ipAddress: "123.12.123131.2131",
      clicks: 4,
      timestamp: "14 Jan 2024\n10:00 Eastern",
      fraudReason: "VPN Fraud",
      mode: "Monitor Mode",
      status: "Block",
      modeColor: "bg-yellow-100 text-yellow-800",
      statusColor: "text-gray-600",
    },
    {
      id: 3,
      userId: "10324326-234243",
      ipAddress: "123.12.123131.2131",
      clicks: 1,
      timestamp: "14 Jan 2024\n10:00 Eastern",
      fraudReason: "",
      mode: "Safe Mode",
      status: "Block",
      modeColor: "bg-green-100 text-green-800",
      statusColor: "text-gray-600",
    },
    {
      id: 4,
      userId: "10324326-234243",
      ipAddress: "123.12.123131.2131",
      clicks: 3,
      timestamp: "14 Jan 2024\n10:00 Eastern",
      fraudReason: "",
      mode: "Safe Mode",
      status: "Block",
      modeColor: "bg-green-100 text-green-800",
      statusColor: "text-gray-600",
    },
    {
      id: 5,
      userId: "10324326-234243",
      ipAddress: "123.12.123131.2131",
      clicks: 3,
      timestamp: "14 Jan 2024\n10:00 Eastern",
      fraudReason: "VPN Fraud",
      mode: "Monitor Mode",
      status: "Block",
      modeColor: "bg-yellow-100 text-yellow-800",
      statusColor: "text-gray-600",
    },
    {
      id: 6,
      userId: "10324326-234243",
      ipAddress: "123.12.123131.2131",
      clicks: 1,
      timestamp: "14 Jan 2024\n10:00 Eastern",
      fraudReason: "",
      mode: "Safe Mode",
      status: "Block",
      modeColor: "bg-green-100 text-green-800",
      statusColor: "text-gray-600",
    },
    {
      id: 7,
      userId: "10324326-234243",
      ipAddress: "123.12.123131.2131",
      clicks: 4,
      timestamp: "14 Jan 2024\n10:00 Eastern",
      fraudReason: "ISP Fraud",
      mode: "Aggressive Mode",
      status: "Blocked",
      modeColor: "bg-red-100 text-red-800",
      statusColor: "text-red-600",
    },
    {
      id: 8,
      userId: "10324326-234243",
      ipAddress: "123.12.123131.2131",
      clicks: 4,
      timestamp: "14 Jan 2024\n10:00 Eastern",
      fraudReason: "ISP Fraud",
      mode: "Aggressive Mode",
      status: "Blocked",
      modeColor: "bg-red-100 text-red-800",
      statusColor: "text-red-600",
    },
    {
      id: 9,
      userId: "41241|2412-2121",
      ipAddress: "231.3213.12313",
      clicks: 1,
      timestamp: "14 Jan 2024\n10:00 Eastern",
      fraudReason: "IP Blocked",
      mode: "Monitor Mode",
      status: "Block",
      modeColor: "bg-yellow-100 text-yellow-800",
      statusColor: "text-gray-600",
    },
    {
      id: 10,
      userId: "41241|2412-2121",
      ipAddress: "231.3213.12313",
      clicks: 2,
      timestamp: "14 Jan 2024\n10:00 Eastern",
      fraudReason: "",
      mode: "Safe Mode",
      status: "Block",
      modeColor: "bg-green-100 text-green-800",
      statusColor: "text-gray-600",
    },
  ]

  const totalEntries = 30
  const startEntry = (currentPage - 1) * itemsPerPage + 1
  const endEntry = Math.min(currentPage * itemsPerPage, totalEntries)
  const totalPages = Math.ceil(totalEntries / itemsPerPage)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <Image src="/images/new-logo.png" alt="Oliggo Logo" width={32} height={32} className="mr-2" />
          <span className="text-blue-600 text-2xl font-medium">Oliggo</span>
        </div>

        <button className="bg-white border border-gray-200 rounded-full px-6 py-2 text-blue-600 font-medium hover:bg-gray-50 transition-colors duration-200 shadow-sm">
          Meta
        </button>

        <div className="relative">
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center space-x-3 hover:bg-gray-50 rounded-lg px-3 py-2 transition-all duration-200"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-medium">
              JW
            </div>
            <span className="text-gray-800 font-medium hidden sm:block">John Tristan Ward</span>
            <svg
              className={`w-4 h-4 text-gray-600 transition-transform duration-200 ${isProfileOpen ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-100 py-2 z-50">
              <div className="px-4 py-3 border-b border-gray-100">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-medium">
                    JW
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">John Tristan Ward</p>
                    <p className="text-sm text-gray-500">john@example.com</p>
                  </div>
                </div>
              </div>

              <div className="py-2">
                <button className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center space-x-3 text-gray-700">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  <span>Profile</span>
                </button>
                <button className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center space-x-3 text-gray-700">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span>Settings</span>
                </button>
                <hr className="my-2 border-gray-100" />
                <button className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center space-x-3 text-red-600">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      <div className="flex">
        {/* Left Sidebar */}
        <div className="w-20 bg-white shadow-sm flex flex-col items-center py-6 space-y-4">
          {/* Sub-profiles */}
          {subProfiles.map((profile, index) => (
            <button
              key={profile.id}
              onClick={() => setSelectedProfile(index)}
              className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-medium transition-all duration-200 ${
                selectedProfile === index
                  ? `${profile.color} ring-2 ring-blue-500 ring-offset-2`
                  : `${profile.color} opacity-70 hover:opacity-100`
              }`}
            >
              {profile.initials}
            </button>
          ))}

          {/* Add Profile Button */}
          <button className="w-12 h-12 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:border-gray-400 transition-all duration-200">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>

          {/* Separator Line */}
          <div className="w-8 h-px bg-gray-300 my-4"></div>

          {/* Facebook Logo */}
          <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">f</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Navigation Tabs */}
          <div className="bg-white border-b border-gray-200 px-6">
            <div className="flex justify-center space-x-8">
              <button className="py-4 px-2 border-b-2 border-transparent text-gray-500 hover:text-gray-700 font-medium text-sm transition-colors duration-200">
                Dashboard
              </button>
              <button className="py-4 px-2 border-b-2 border-blue-500 text-blue-600 font-medium text-sm transition-colors duration-200">
                User Activity
              </button>
              <button className="py-4 px-2 border-b-2 border-transparent text-gray-500 hover:text-gray-700 font-medium text-sm transition-colors duration-200">
                Fraud Protection
              </button>
              <button className="py-4 px-2 border-b-2 border-transparent text-gray-500 hover:text-gray-700 font-medium text-sm transition-colors duration-200">
                Integrations
              </button>
              <button className="py-4 px-2 border-b-2 border-transparent text-gray-500 hover:text-gray-700 font-medium text-sm transition-colors duration-200">
                Refund Report
              </button>
            </div>
          </div>

          {/* User Activity Content */}
          <div className="p-6">
            {/* Header Controls */}
            <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                {/* Mode Filters */}
                <div className="flex items-center space-x-2">
                  {modes.map((mode) => (
                    <button
                      key={mode}
                      onClick={() => setActiveMode(mode)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                        activeMode === mode
                          ? "bg-blue-100 text-blue-700 border border-blue-200"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>

                {/* Stats and Date Range */}
                <div className="flex items-center space-x-4">
                  <span className="text-sm font-medium text-gray-600">10/10,000 Clicks</span>
                  <div className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <span className="text-sm text-gray-600">Feb 10, 2023 — Feb 12, 2023</span>
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Data Table */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        User
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        User ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        IP Address
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Clicks
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Last Click Timestamp
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Fraud Reason
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Mode
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {userData.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50 transition-colors duration-150">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.userId}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.ipAddress}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.clicks}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="whitespace-pre-line">{user.timestamp}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {user.fraudReason && <span className="text-red-600 font-medium">{user.fraudReason}</span>}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${user.modeColor}`}
                          >
                            {user.mode}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`text-sm font-medium ${user.statusColor}`}>{user.status}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button className="text-gray-400 hover:text-gray-600 transition-colors duration-200">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                              />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="bg-white px-6 py-3 border-t border-gray-200 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-700">Showing</span>
                  <select
                    value={itemsPerPage}
                    onChange={(e) => setItemsPerPage(Number(e.target.value))}
                    className="border border-gray-300 rounded px-2 py-1 text-sm"
                  >
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                  </select>
                  <span className="text-sm text-gray-700">
                    to {endEntry} out of {totalEntries} entries
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>

                  {[...Array(Math.min(5, totalPages))].map((_, index) => {
                    const pageNumber = index + 1
                    return (
                      <button
                        key={pageNumber}
                        onClick={() => setCurrentPage(pageNumber)}
                        className={`px-3 py-1 border rounded text-sm transition-colors duration-200 ${
                          currentPage === pageNumber
                            ? "bg-blue-500 text-white border-blue-500"
                            : "border-gray-300 hover:bg-gray-50"
                        }`}
                      >
                        {pageNumber}
                      </button>
                    )
                  })}

                  <button
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
