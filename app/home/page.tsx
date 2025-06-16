"use client"

import type React from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState, useEffect, useRef } from "react"
import userActivityData from "../../data/user-activity.json"

// 4. Replace all checkboxes with toggle switches in the Fraud Protection section
// Create a new Toggle component function at the top of the file, after the other state variables:

const Toggle = ({ checked = false, onChange }: { checked?: boolean; onChange?: () => void }) => {
  return (
    <div
      onClick={onChange}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer ${
        checked ? "bg-blue-600" : "bg-gray-200"
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          checked ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </div>
  )
}

export default function HomePage() {
  const router = useRouter()
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [selectedProfile, setSelectedProfile] = useState(0)
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("Dashboard")
  const [hoveredSegment, setHoveredSegment] = useState<number | null>(null)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [startDate, setStartDate] = useState<Date | null>(null)
  const [endDate, setEndDate] = useState<Date | null>(null)
  const [chartRotation, setChartRotation] = useState(0)
  const [chartScale, setChartScale] = useState(1)
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false)
  const [hoveredProfile, setHoveredProfile] = useState<number | null>(null)
  const [activeMode, setActiveMode] = useState("All Users")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [fraudMode, setFraudMode] = useState("Monitor Mode")
  const [clickThresholdRules, setClickThresholdRules] = useState([
    { id: 1, clicks: 4, time: 7, unit: "days" },
    { id: 2, clicks: 6, time: 30, unit: "days" },
    { id: 3, clicks: 3, time: 10, unit: "minutes" },
  ])
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editingProfile, setEditingProfile] = useState<number | null>(null)
  const [editProfileName, setEditProfileName] = useState("")
  const [editProfileColor, setEditProfileColor] = useState("")
  const [isUserSettingsOpen, setIsUserSettingsOpen] = useState(false)
  const [userFirstName, setUserFirstName] = useState("John Tristan")
  const [userLastName, setUserLastName] = useState("Ward")
  const profileDropdownRef = useRef<HTMLDivElement>(null)
  const [showFraudSaveToast, setShowFraudSaveToast] = useState(false);

  // Add these new state variables after the other useState declarations (around line 40)
  const [countries] = useState([
    { code: "US", name: "United States" },
    { code: "CA", name: "Canada" },
    { code: "UK", name: "United Kingdom" },
    { code: "DE", name: "Germany" },
    { code: "FR", name: "France" },
    { code: "AU", name: "Australia" },
    { code: "JP", name: "Japan" },
    { code: "BR", name: "Brazil" },
    { code: "IN", name: "India" },
    { code: "IT", name: "Italy" },
    { code: "ES", name: "Spain" },
    { code: "MX", name: "Mexico" },
    { code: "KR", name: "South Korea" },
    { code: "NL", name: "Netherlands" },
    { code: "SE", name: "Sweden" },
    { code: "CH", name: "Switzerland" },
    { code: "SG", name: "Singapore" },
    { code: "ZA", name: "South Africa" },
    { code: "AE", name: "United Arab Emirates" },
    { code: "AR", name: "Argentina" },
  ])
  const [selectedCountries, setSelectedCountries] = useState<{ code: string; name: string }[]>([
    { code: "US", name: "United States" },
    { code: "CA", name: "Canada" },
    { code: "UK", name: "United Kingdom" },
  ])

  // Fraud Protection toggles state
  const [toggleBounceRate, setToggleBounceRate] = useState(true);
  const [toggleClickFraud, setToggleClickFraud] = useState(true);
  const [toggleNoMouse, setToggleNoMouse] = useState(false);
  const [toggleNoScroll, setToggleNoScroll] = useState(false);
  const [toggleNoClick, setToggleNoClick] = useState(false);
  const [toggleBlockVPN, setToggleBlockVPN] = useState(false);
  const [toggleISP, setToggleISP] = useState(false);
  const [toggleIPGeo, setToggleIPGeo] = useState(true);
  const [toggleTimezone, setToggleTimezone] = useState(true);
  const [toggleCountry, setToggleCountry] = useState(false);
  const [toggleIncognito, setToggleIncognito] = useState(true);
  const [toggleJS, setToggleJS] = useState(true);
  const [toggleLang, setToggleLang] = useState(false);
  const [toggleHeadless, setToggleHeadless] = useState(true);
  const [toggleGeo, setToggleGeo] = useState(false);

  // Add animation effect for the chart
  useEffect(() => {
    const interval = setInterval(() => {
      setChartRotation((prev) => (prev + 1) % 360)
    }, 100)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false)
      }
    }

    if (isProfileOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isProfileOpen])

  const subProfiles = [
    {
      id: 0,
      name: "JT",
      color: "bg-blue-500",
      initials: "JT",
      details: {
        adAccount: "Meta Ads Account #1",
        campaign: "Summer Campaign 2024",
        adset: "Targeting 18-35",
        pixel: "Pixel ID: 123456789",
        activatedTime: "Jan 15, 2024 10:30 AM",
        protectStatus: "Active",
      },
    },
    {
      id: 1,
      name: "MA",
      color: "bg-orange-500",
      initials: "MA",
      details: {
        adAccount: "Meta Ads Account #2",
        campaign: "Winter Campaign 2024",
        adset: "Targeting 25-45",
        pixel: "Pixel ID: 987654321",
        activatedTime: "Dec 20, 2023 2:15 PM",
        protectStatus: "Paused",
      },
    },
  ]

  const colorOptions = [
    { name: "Blue", value: "bg-blue-500", class: "bg-blue-500" },
    { name: "Purple", value: "bg-purple-500", class: "bg-purple-500" },
    { name: "Teal", value: "bg-teal-500", class: "bg-teal-500" },
    { name: "Green", value: "bg-green-500", class: "bg-green-500" },
    { name: "Light Blue", value: "bg-sky-500", class: "bg-sky-500" },
    { name: "Red", value: "bg-red-500", class: "bg-red-500" },
    { name: "Orange", value: "bg-orange-500", class: "bg-orange-500" },
    { name: "Cyan", value: "bg-cyan-500", class: "bg-cyan-500" },
  ]

  const tabs = ["Dashboard", "User Activity", "Fraud Protection", "Integrations", "Refund Report"]
  const modes = ["All Users", "Safe Mode", "Monitor Mode", "Aggressive Mode"]

  const statsCards = [
    {
      title: "Total Clicks",
      value: "105",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
          />
        </svg>
      ),
      color: "text-blue-500",
    },
    {
      title: "Fraud Clicks",
      value: "80",
      icon: (
        <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" strokeWidth="2" className="text-orange-400" stroke="currentColor" fill="#fff3" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01" />
          <circle cx="12" cy="16.5" r="1" fill="currentColor" />
        </svg>
      ),
      color: "text-red-500",
    },
    {
      title: "Total Unique Visitors",
      value: "60",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {/* Profil başı */}
          <circle cx="12" cy="8" r="4" strokeWidth="2" />
          {/* Gövde */}
          <path strokeWidth="2" d="M4 20c0-2.5 3.5-4 8-4s8 1.5 8 4" />
          {/* ID etiketi */}
          <rect x="8" y="16" width="8" height="4" rx="1" strokeWidth="2" />
          <text x="12" y="19" textAnchor="middle" fontSize="2.5" fill="currentColor">ID</text>
        </svg>
      ),
      color: "text-yellow-500",
    },
    {
      title: "Total Block Ip",
      value: "50",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
          />
        </svg>
      ),
      color: "text-red-500",
    },
    {
      title: "VPN & Location Fraud",
      value: "105",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9m0 9c-5 0-9-4-9-9s4-9 9-9"
          />
        </svg>
      ),
      color: "text-purple-500",
    },
  ]

  const bottomStats = [
    {
      title: "Browser Fraud",
      value: "25",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
      color: "text-yellow-500",
    },
    {
      title: "Suspicious Behavior",
      value: "30",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      ),
      color: "text-blue-500",
    },
    {
      title: "Block Devices",
      value: "30",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
          />
        </svg>
      ),
      color: "text-blue-500",
    },
    {
      title: "Fraud by Desktop",
      value: "30%",
      progress: 30,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
      color: "text-orange-500",
    },
    {
      title: "Fraud by Mobile",
      value: "5%",
      progress: 5,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
          />
        </svg>
      ),
      color: "text-blue-500",
    },
  ]

  // Chart data from Estimated Savings Report
  const chartData = [
    { name: "Vpn", value: 30, color: "#3b82f6", percentage: 37.5 },
    { name: "Suspicious Behavior", value: 15, color: "#10b981", percentage: 18.75 },
    { name: "Browser Fraud", value: 35, color: "#f97316", percentage: 43.75 },
  ]

  const totalSavings = chartData.reduce((sum, item) => sum + item.value, 0)

  // Calculate stroke-dasharray for each segment
  const circumference = 2 * Math.PI * 40
  let cumulativePercentage = 0

  // Calendar helper functions
  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const handleDateClick = (day: number) => {
    const clickedDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day)

    if (!startDate || (startDate && endDate)) {
      setStartDate(clickedDate)
      setEndDate(null)
    } else if (startDate && !endDate) {
      if (clickedDate >= startDate) {
        setEndDate(clickedDate)
      } else {
        setStartDate(clickedDate)
        setEndDate(null)
      }
    }
  }

  const isDateInRange = (day: number) => {
    if (!startDate) return false
    const date = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day)
    if (!endDate) return date.getTime() === startDate.getTime()
    return date >= startDate && date <= endDate
  }

  const isDateStart = (day: number) => {
    if (!startDate) return false
    const date = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day)
    return date.getTime() === startDate.getTime()
  }

  const isDateEnd = (day: number) => {
    if (!endDate) return false
    const date = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day)
    return date.getTime() === endDate.getTime()
  }

  const userData = userActivityData.users
  const totalEntries = userActivityData.totalEntries
  const startEntry = (currentPage - 1) * itemsPerPage + 1
  const endEntry = Math.min(currentPage * itemsPerPage, totalEntries)
  const totalPages = Math.ceil(totalEntries / itemsPerPage)

  const addClickThresholdRule = () => {
    const newRule = {
      id: Date.now(),
      clicks: 1,
      time: 1,
      unit: "days",
    }
    setClickThresholdRules([...clickThresholdRules, newRule])
  }

  const removeClickThresholdRule = (id: number) => {
    setClickThresholdRules(clickThresholdRules.filter((rule) => rule.id !== id))
  }

  const updateClickThresholdRule = (id: number, field: string, value: any) => {
    setClickThresholdRules(clickThresholdRules.map((rule) => (rule.id === id ? { ...rule, [field]: value } : rule)))
  }

  const refundData = {
    weeks: [
      {
        id: 1,
        week: "Week 10",
        startDate: "14 Jan 2024",
        startTime: "10:00 Eastern",
        endDate: "14 Jan 2024",
        endTime: "10:00 Eastern",
        refundAmount: "$150",
        link: "https://example.com/refund/week10",
      },
      {
        id: 2,
        week: "Week 9",
        startDate: "14 Jan 2024",
        startTime: "10:00 Eastern",
        endDate: "14 Jan 2024",
        endTime: "10:00 Eastern",
        refundAmount: "$150",
        link: "https://example.com/refund/week9",
      },
      {
        id: 3,
        week: "Week 8",
        startDate: "14 Jan 2024",
        startTime: "10:00 Eastern",
        endDate: "14 Jan 2024",
        endTime: "10:00 Eastern",
        refundAmount: "$150",
        link: "https://example.com/refund/week8",
      },
      {
        id: 4,
        week: "Week 7",
        startDate: "14 Jan 2024",
        startTime: "10:00 Eastern",
        endDate: "14 Jan 2024",
        endTime: "10:00 Eastern",
        refundAmount: "$150",
        link: "https://example.com/refund/week7",
      },
      {
        id: 5,
        week: "Week 6",
        startDate: "14 Jan 2024",
        startTime: "10:00 Eastern",
        endDate: "14 Jan 2024",
        endTime: "10:00 Eastern",
        refundAmount: "$150",
        link: "https://example.com/refund/week6",
      },
      {
        id: 6,
        week: "Week 5",
        startDate: "14 Jan 2024",
        startTime: "10:00 Eastern",
        endDate: "14 Jan 2024",
        endTime: "10:00 Eastern",
        refundAmount: "$150",
        link: "https://example.com/refund/week5",
      },
      {
        id: 7,
        week: "Week 4",
        startDate: "14 Jan 2024",
        startTime: "10:00 Eastern",
        endDate: "14 Jan 2024",
        endTime: "10:00 Eastern",
        refundAmount: "$150",
        link: "https://example.com/refund/week4",
      },
      {
        id: 8,
        week: "Week 3",
        startDate: "14 Jan 2024",
        startTime: "10:00 Eastern",
        endDate: "14 Jan 2024",
        endTime: "10:00 Eastern",
        refundAmount: "$150",
        link: "https://example.com/refund/week3",
      },
      {
        id: 9,
        week: "Week 2",
        startDate: "14 Jan 2024",
        startTime: "10:00 Eastern",
        endDate: "14 Jan 2024",
        endTime: "10:00 Eastern",
        refundAmount: "$150",
        link: "https://example.com/refund/week2",
      },
      {
        id: 10,
        week: "Week 1",
        startDate: "14 Jan 2024",
        startTime: "10:00 Eastern",
        endDate: "14 Jan 2024",
        endTime: "10:00 Eastern",
        refundAmount: "$150",
        link: "https://example.com/refund/week1",
      },
    ],
  }

  const openEditModal = (profileIndex: number) => {
    setEditingProfile(profileIndex)
    setEditProfileName(subProfiles[profileIndex].name)
    setEditProfileColor(subProfiles[profileIndex].color)
    setIsEditModalOpen(true)
  }

  const closeEditModal = () => {
    setIsEditModalOpen(false)
    setEditingProfile(null)
    setEditProfileName("")
    setEditProfileColor("")
  }

  const saveProfileChanges = () => {
    if (editingProfile !== null) {
      // Update the profile (in a real app, this would update the backend)
      const updatedProfiles = [...subProfiles]
      updatedProfiles[editingProfile] = {
        ...updatedProfiles[editingProfile],
        name: editProfileName,
        color: editProfileColor,
        initials: editProfileName
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase()
          .slice(0, 2),
      }
      // In a real app, you would update the state here
      console.log("Profile updated:", updatedProfiles[editingProfile])
    }
    closeEditModal()
  }

  const deleteProfile = (profileIndex: number) => {
    if (confirm("Are you sure you want to delete this profile?")) {
      // In a real app, this would delete from backend
      console.log("Profile deleted:", subProfiles[profileIndex])
      if (selectedProfile === profileIndex) {
        setSelectedProfile(0)
      }
    }
  }

  // Add these handler functions before the renderFraudProtection function
  // 2. Update the handleCountrySelect function to handle toggling selection
  const handleCountrySelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCode = e.target.value
    if (!selectedCode) return

    const countryToAdd = countries.find((country) => country.code === selectedCode)
    if (countryToAdd && !selectedCountries.some((country) => country.code === selectedCode)) {
      setSelectedCountries([...selectedCountries, countryToAdd])
    }

    // Reset the select element
    e.target.value = ""
  }

  const handleRemoveCountry = (codeToRemove: string) => {
    setSelectedCountries(selectedCountries.filter((country) => country.code !== codeToRemove))
  }

  const handleSelectAllCountries = () => {
    setSelectedCountries([...countries])
  }

  const handleDeselectAllCountries = () => {
    setSelectedCountries([])
  }

  const handleSignOut = () => {
    // Here you would typically handle sign out logic
    // For now, we'll just navigate to the login page
    router.push('/login')
  }

  const renderDashboard = () => (
    <div className="p-6 space-y-6">
      {/* Filters */}
      <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-lg hover:scale-[1.02] transition-all duration-300">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-end">
          <div className="md:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">Ad Account</label>
            <div className="relative">
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white">
                <option>Select</option>
                <option>Account 1</option>
                <option>Account 2</option>
              </select>
              <svg
                className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          <div className="md:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">Campaign</label>
            <div className="relative">
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white">
                <option>Select</option>
                <option>Campaign 1</option>
                <option>Campaign 2</option>
              </select>
              <svg
                className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          <div className="md:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">Adset</label>
            <div className="relative">
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white">
                <option>Select</option>
                <option>Adset 1</option>
                <option>Adset 2</option>
              </select>
              <svg
                className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          <div className="md:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">Pixel</label>
            <div className="relative">
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white">
                <option>Select</option>
                <option>Pixel 1</option>
                <option>Pixel 2</option>
              </select>
              <svg
                className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          <div className="md:col-span-1">
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200">
              Protect
            </button>
          </div>

          <div className="md:col-span-1">
            <button
              onClick={() => setIsCalendarOpen(true)}
              className="w-full flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span className="truncate">
                {startDate && endDate
                  ? `${startDate.toLocaleDateString()} — ${endDate.toLocaleDateString()}`
                  : "Feb 10, 2023 — Feb 12, 2023"}
              </span>
              <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {statsCards.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-sm p-6 h-36 flex flex-col justify-between hover:scale-105 transition-transform duration-200 group"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600 mb-2">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`${stat.color} ml-4 transition-transform duration-300 group-hover:scale-110`}>
                {stat.title === "Total Clicks" && (
                  <svg
                    className="w-6 h-6 group-hover:animate-pulse"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
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
                )}
                {stat.title === "Fraud Clicks" && (
                  <svg
                    className="w-6 h-6 group-hover:animate-pulse"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.29 3.86l-7.09 12.26A2 2 0 005.18 19h13.64a2 2 0 001.98-2.88l-7.09-12.26a2 2 0 00-3.42 0z" />
                    <line x1="12" y1="9" x2="12" y2="13" stroke="currentColor" strokeWidth={2} />
                    <circle cx="12" cy="17" r="1" stroke="currentColor" strokeWidth={2} />
                  </svg>
                )}
                {stat.title === "Total Unique Visitors" && (
                  <svg
                    className="w-6 h-6 group-hover:animate-pulse"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    {/* Profil başı */}
                    <circle cx="12" cy="8" r="4" strokeWidth="2" />
                    {/* Gövde */}
                    <path strokeWidth="2" d="M4 20c0-2.5 3.5-4 8-4s8 1.5 8 4" />
                    {/* ID etiketi */}
                    <rect x="8" y="16" width="8" height="4" rx="1" strokeWidth="2" />
                    <text x="12" y="19" textAnchor="middle" fontSize="2.5" fill="currentColor">ID</text>
                  </svg>
                )}
                {stat.title === "Total Block Ip" && (
                  <svg
                    className="w-6 h-6 group-hover:animate-spin"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L5.636 5.636"
                    />
                  </svg>
                )}
                {stat.title === "VPN & Location Fraud" && (
                  <svg
                    className="w-6 h-6 group-hover:animate-pulse"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9m0 9c-5 0-9-4-9-9s4-9 9-9"
                    />
                  </svg>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Middle Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
        {bottomStats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-sm p-6 h-36 flex flex-col justify-between hover:scale-105 transition-transform duration-200"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600 mb-2">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`${stat.color} ml-4`}>{stat.icon}</div>
            </div>
            {stat.progress && (
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${stat.progress}%` }}
                ></div>
              </div>
            )}
          </div>
        ))}

        {/* Threat Level */}
        <div className="bg-white rounded-lg shadow-sm p-6 h-36 hover:scale-105 transition-transform duration-200">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-medium text-gray-600">Threat Level</p>
            <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
          </div>
          <div className="flex flex-col justify-between h-16">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Low</span>
              <div className="w-20 bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full w-3/4"></div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Mid</span>
              <div className="w-20 bg-gray-200 rounded-full h-2">
                <div className="bg-orange-500 h-2 rounded-full w-1/2"></div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">High</span>
              <div className="w-20 bg-gray-200 rounded-full h-2">
                <div className="bg-red-500 h-2 rounded-full w-1/4"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row - Chart and Savings Report */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Interactive Donut Chart */}
        <div className="bg-white rounded-lg shadow-sm p-6 overflow-hidden hover:scale-105 transition-transform duration-200">
          <div className="relative w-64 h-64 mx-auto">
            {/* Background glow effects */}
            <div
              className="absolute inset-0 bg-blue-500/10 rounded-full blur-xl"
              style={{
                transform: `scale(${1 + Math.sin(chartRotation * 0.05) * 0.05})`,
                transition: "transform 0.5s ease-in-out",
              }}
            ></div>
            <div
              className="absolute inset-0 bg-green-500/10 rounded-full blur-xl"
              style={{
                transform: `scale(${1 + Math.sin(chartRotation * 0.03 + 2) * 0.05})`,
                transition: "transform 0.5s ease-in-out",
              }}
            ></div>
            <div
              className="absolute inset-0 bg-orange-500/10 rounded-full blur-xl"
              style={{
                transform: `scale(${1 + Math.sin(chartRotation * 0.04 + 4) * 0.05})`,
                transition: "transform 0.5s ease-in-out",
              }}
            ></div>

            {/* Main chart */}
            <svg
              className="w-full h-full transform"
              style={{
                transform: `rotate(${-90 + (hoveredSegment !== null ? chartRotation * 0.1 : 0)}deg) scale(${
                  hoveredSegment !== null ? 1.05 : 1
                })`,
                transition: "transform 0.3s ease-in-out",
              }}
              viewBox="0 0 100 100"
              onMouseEnter={() => setChartScale(1.05)}
              onMouseLeave={() => setChartScale(1)}
            >
              <defs>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="2" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              <circle cx="50" cy="50" r="40" stroke="#f3f4f6" strokeWidth="8" fill="none" />
              {chartData.map((segment, index) => {
                const strokeDasharray = `${(segment.value / totalSavings) * circumference} ${circumference}`
                const strokeDashoffset = (-cumulativePercentage * circumference) / 100
                cumulativePercentage += (segment.value / totalSavings) * 100

                return (
                  <circle
                    key={index}
                    cx="50"
                    cy="50"
                    r="40"
                    stroke={segment.color}
                    strokeWidth={hoveredSegment === index ? "12" : "8"}
                    fill="none"
                    strokeDasharray={strokeDasharray}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    filter={hoveredSegment === index ? "url(#glow)" : ""}
                    className="transition-all duration-300 cursor-pointer"
                    onMouseEnter={() => setHoveredSegment(index)}
                    onMouseLeave={() => setHoveredSegment(null)}
                    style={{
                      transition: "all 0.3s ease-in-out",
                      transform: hoveredSegment === index ? "scale(1.02)" : "scale(1)",
                      transformOrigin: "center",
                    }}
                  />
                )
              })}

              {/* Animated particles */}
              {chartData.map((segment, index) => {
                const angle = (cumulativePercentage - segment.percentage / 2) * 3.6 * (Math.PI / 180)
                const x = 50 + 40 * Math.cos(angle)
                const y = 50 + 40 * Math.sin(angle)

                return (
                  <circle
                    key={`particle-${index}`}
                    cx={x}
                    cy={y}
                    r={hoveredSegment === index ? 2 : 1}
                    fill={segment.color}
                    className="transition-all duration-300"
                    style={{
                      opacity: hoveredSegment === index ? 1 : 0.7,
                      filter: hoveredSegment === index ? "url(#glow)" : "",
                      animation: "pulse 2s infinite",
                    }}
                  />
                )
              })}
            </svg>

            {/* Center content */}
            <div
              className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 rounded-full"
              style={{
                width: "65%",
                height: "65%",
                left: "17.5%",
                top: "17.5%",
                backdropFilter: "blur(5px)",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.1)",
                transform: `scale(${hoveredSegment !== null ? 1.1 : 1})`,
                transition: "transform 0.3s ease-in-out",
              }}
            >
              <p className="text-lg font-semibold text-gray-900">Ad Spend Saved</p>
              <p
                className="text-3xl font-bold text-blue-600"
                style={{
                  textShadow: hoveredSegment !== null ? "0 0 10px rgba(59, 130, 246, 0.3)" : "none",
                }}
              >
                ${totalSavings}
              </p>
              {hoveredSegment !== null && (
                <p
                  className="text-sm text-gray-600 mt-1 animate-fadeIn px-2 text-center max-w-full overflow-hidden"
                  style={{
                    color: chartData[hoveredSegment].color,
                    fontWeight: "500",
                  }}
                >
                  {chartData[hoveredSegment].name}: ${chartData[hoveredSegment].value}
                </p>
              )}
            </div>
          </div>

          {/* Legend */}
          <div className="flex justify-center mt-4 space-x-6">
            {chartData.map((item, index) => (
              <div
                key={index}
                className="flex items-center space-x-2 cursor-pointer transition-all duration-200"
                onMouseEnter={() => setHoveredSegment(index)}
                onMouseLeave={() => setHoveredSegment(null)}
                style={{
                  transform: hoveredSegment === index ? "scale(1.1)" : "scale(1)",
                }}
              >
                <div
                  className="w-3 h-3 rounded-full"
                  style={{
                    backgroundColor: item.color,
                    boxShadow: hoveredSegment === index ? `0 0 8px ${item.color}` : "none",
                  }}
                ></div>
                <span
                  className="text-xs font-medium"
                  style={{
                    color: hoveredSegment === index ? item.color : "#6B7280",
                  }}
                >
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Estimated Savings Report */}
        <div className="bg-white rounded-lg shadow-sm hover:scale-105 transition-transform duration-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Estimated Savings Report</h3>
          </div>
          <div className="p-6 space-y-6">
            {chartData.map((item, index) => (
              <div
                key={index}
                className={`flex items-center justify-between p-3 rounded-lg transition-all duration-300 cursor-pointer ${
                  hoveredSegment === index ? "bg-gray-50 scale-105 shadow-md" : "hover:bg-gray-50 hover:shadow-sm"
                }`}
                onMouseEnter={() => setHoveredSegment(index)}
                onMouseLeave={() => setHoveredSegment(null)}
              >
                <div className="flex items-center space-x-3">
                  <div
                    className="w-4 h-4 rounded-full transition-all duration-300"
                    style={{
                      backgroundColor: item.color,
                      transform: hoveredSegment === index ? "scale(1.3)" : "scale(1)",
                      boxShadow: hoveredSegment === index ? `0 0 10px ${item.color}` : "none",
                    }}
                  ></div>
                  <span
                    className={`text-sm font-medium transition-all duration-300 ${
                      hoveredSegment === index ? "text-gray-900" : "text-gray-600"
                    }`}
                  >
                    {item.name}
                  </span>
                </div>
                <div className="flex items-center">
                  <span
                    className={`font-bold text-lg transition-all duration-300 ${
                      hoveredSegment === index ? "text-blue-600 scale-110" : "text-gray-900"
                    }`}
                  >
                    ${item.value}
                  </span>
                  <div
                    className={`ml-2 w-16 bg-gray-200 rounded-full h-1 transition-all duration-300 ${
                      hoveredSegment === index ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <div
                      className="h-1 rounded-full"
                      style={{
                        width: `${item.percentage}%`,
                        backgroundColor: item.color,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}

            <div className="mt-8 pt-4 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">Total Savings</span>
                <span className="font-bold text-xl text-blue-600">${totalSavings}</span>
              </div>
              <div className="mt-2 w-full bg-gray-200 rounded-full h-1.5">
                <div className="bg-blue-600 h-1.5 rounded-full w-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderUserActivity = () => (
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
            <button
              onClick={() => setIsCalendarOpen(true)}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span className="text-sm text-gray-600">
                {startDate && endDate
                  ? `${startDate.toLocaleDateString()} — ${endDate.toLocaleDateString()}`
                  : "Feb 10, 2023 — Feb 12, 2023"}
              </span>
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mode</th>
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
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${user.modeColor}`}>
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
  )

  const renderFraudProtection = () => (
    <div className="p-6 space-y-6 relative">
      {/* Header */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="flex items-center space-x-3 mb-4">
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            />
          </svg>
          <h2 className="text-xl font-semibold text-gray-900">Fraud Control Settings</h2>
        </div>
        <p className="text-gray-600">
          These rules run continuously and apply to all sessions. You can enable or customize them to automatically
          detect and block fraudulent behavior.
        </p>

        {/* Mode Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <button
            onClick={() => setFraudMode("Monitor Mode")}
            className={`p-4 rounded-lg border-2 transition-all duration-200 ${
              fraudMode === "Monitor Mode"
                ? "border-orange-300 bg-orange-50"
                : "border-gray-200 bg-white hover:border-orange-200"
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-gray-900">Monitor Mode</h3>
                <p className="text-sm text-gray-600">
                  Detects fraud without auto-blocking; requires manual review to block.
                </p>
              </div>
            </div>
          </button>

          <button
            onClick={() => setFraudMode("Aggressive Mode")}
            className={`p-4 rounded-lg border-2 transition-all duration-200 ${
              fraudMode === "Aggressive Mode"
                ? "border-red-300 bg-red-50"
                : "border-gray-200 bg-white hover:border-red-200"
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-gray-900">Aggressive Mode</h3>
                <p className="text-sm text-gray-600">Instantly detects and automatically blocks fraudulent traffic.</p>
              </div>
            </div>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Suspicious Behavior */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center space-x-3 mb-6">
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <h3 className="text-lg font-semibold text-gray-900">Suspicious Behavior</h3>
          </div>

          <div className="space-y-6">
            {/* Bounce Rate */}
            <div className="flex items-start space-x-4">
              <div className="flex items-center mt-1">
                <Toggle checked={toggleBounceRate} onChange={() => setToggleBounceRate(v => !v)} />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-900 mb-2">Bounce Rate</h4>
                <div className="flex items-center space-x-4 mb-2">
                  <input
                    type="number"
                    defaultValue={2}
                    className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-gray-600">Minimum session duration (seconds)</span>
                </div>
                <p className="text-sm text-gray-500">
                  Flags users who leave the site within a short time (below minimum session duration).
                </p>
              </div>
            </div>

            {/* Click Fraud Threshold */}
            <div className="flex items-start space-x-4">
              <div className="flex items-center mt-1">
                <Toggle checked={toggleClickFraud} onChange={() => setToggleClickFraud(v => !v)} />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-900 mb-2">Click Fraud Threshold</h4>
                <p className="text-sm text-gray-500 mb-4">
                  Limits high-frequency visits from the same user to prevent repeated click abuse.
                </p>

                <div className="space-y-3 border border-gray-200 rounded-lg p-4">
                  {clickThresholdRules.map((rule) => (
                    <div key={rule.id} className="flex items-center space-x-3">
                      <span className="text-sm text-gray-600">Allow up to</span>
                      <input
                        type="number"
                        value={rule.clicks}
                        onChange={(e) => updateClickThresholdRule(rule.id, "clicks", Number.parseInt(e.target.value))}
                        className="w-16 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-600">ad clicks within</span>
                      <input
                        type="number"
                        value={rule.time}
                        onChange={(e) => updateClickThresholdRule(rule.id, "time", Number.parseInt(e.target.value))}
                        className="w-16 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <select
                        value={rule.unit}
                        onChange={(e) => updateClickThresholdRule(rule.id, "unit", e.target.value)}
                        className="px-3 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="minutes">minutes</option>
                        <option value="hours">hours</option>
                        <option value="days">days</option>
                        <option value="months">months</option>
                      </select>
                      <button
                        onClick={() => removeClickThresholdRule(rule.id)}
                        className="p-1 text-red-500 hover:text-red-700 transition-colors duration-200"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  ))}

                  <div className="flex justify-between items-center mt-4">
                    <button
                      onClick={addClickThresholdRule}
                      className="px-4 py-2 border border-orange-300 text-orange-600 rounded-lg hover:bg-orange-50 transition-colors duration-200"
                    >
                      New Rule
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* No Mouse Movement */}
            <div className="flex items-start space-x-4">
              <div className="flex items-center mt-1">
                <Toggle checked={toggleNoMouse} onChange={() => setToggleNoMouse(v => !v)} />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-900 mb-2">No Mouse Movement (Desktop)</h4>
                <p className="text-sm text-gray-500">
                  Flags desktop users who show no mouse movement, indicating low interaction or automation.
                </p>
              </div>
            </div>

            {/* No Scroll Activity */}
            <div className="flex items-start space-x-4">
              <div className="flex items-center mt-1">
                <Toggle checked={toggleNoScroll} onChange={() => setToggleNoScroll(v => !v)} />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-900 mb-2">No Scroll Activity</h4>
                <p className="text-sm text-gray-500">
                  Flags users who do not scroll the page, suggesting minimal engagement.
                </p>
              </div>
            </div>

            {/* No Click Interaction */}
            <div className="flex items-start space-x-4">
              <div className="flex items-center mt-1">
                <Toggle checked={toggleNoClick} onChange={() => setToggleNoClick(v => !v)} />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-900 mb-2">No Click Interaction</h4>
                <p className="text-sm text-gray-500">
                  Flags users who never click on any element during their session.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* VPN & Location Fraud */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center space-x-3 mb-6">
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9m0 9c-5 0-9-4-9-9s4-9 9-9"
              />
            </svg>
            <h3 className="text-lg font-semibold text-gray-900">Vpn & Location Fraud</h3>
          </div>

          <div className="space-y-6">
            {/* Block VPN/Proxy */}
            <div className="flex items-start space-x-4">
              <div className="flex items-center mt-1">
                <Toggle checked={toggleBlockVPN} onChange={() => setToggleBlockVPN(v => !v)} />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-900 mb-2">Block VPN/Proxy</h4>
                <p className="text-sm text-gray-500">
                  Blocks users identified as using VPNs or proxy services to mask their IP.
                </p>
              </div>
            </div>

            {/* ISP Fraud Detection */}
            <div className="flex items-start space-x-4">
              <div className="flex items-center mt-1">
                <Toggle checked={toggleISP} onChange={() => setToggleISP(v => !v)} />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-900 mb-2">ISP Fraud Detection</h4>
                <p className="text-sm text-gray-500">
                  Flags users connected through high-risk or suspicious internet providers.
                </p>
              </div>
            </div>

            {/* IP/Geo Location Mismatch */}
            <div className="flex items-start space-x-4">
              <div className="flex items-center mt-1">
                <Toggle checked={toggleIPGeo} onChange={() => setToggleIPGeo(v => !v)} />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-900 mb-2">IP/Geo Location Mismatch</h4>
                <p className="text-sm text-gray-500">
                  Blocks users whose IP address does not align with their reported geolocation.
                </p>
              </div>
            </div>

            {/* Timezone/IP Mismatch */}
            <div className="flex items-start space-x-4">
              <div className="flex items-center mt-1">
                <Toggle checked={toggleTimezone} onChange={() => setToggleTimezone(v => !v)} />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-900 mb-2">Timezone/IP Mismatch</h4>
                <p className="text-sm text-gray-500">
                  Blocks users whose browser timezone doesn't match their IP-based location.
                </p>
              </div>
            </div>

            {/* Country-Based Blocking */}
            <div className="flex items-start space-x-4">
              <div className="flex items-center mt-1">
                <Toggle checked={toggleCountry} onChange={() => setToggleCountry(v => !v)} />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-900 mb-2">Country-Based Blocking</h4>
                <p className="text-sm text-gray-500 mb-3">Only allow traffic from selected countries (whitelist).</p>

                <div className="space-y-3">
                  // 1. Update the country selection dropdown to show selected countries as dimmed and allow deselection
                  <div className="relative">
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                      onChange={handleCountrySelect}
                      value=""
                    >
                      <option value="" disabled>
                        Select countries to allow
                      </option>
                      {countries.map((country) => {
                        const isSelected = selectedCountries.some((c) => c.code === country.code)
                        return (
                          <option
                            key={country.code}
                            value={country.code}
                            className={isSelected ? "text-gray-400" : ""}
                            disabled={isSelected}
                          >
                            {country.name} {isSelected ? "(Selected)" : ""}
                          </option>
                        )
                      })}
                    </select>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={handleSelectAllCountries}
                      className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md transition-colors"
                    >
                      Select All Countries
                    </button>
                    <button
                      onClick={handleDeselectAllCountries}
                      className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md transition-colors"
                    >
                      Deselect All
                    </button>
                  </div>
                  {selectedCountries.length > 0 ? (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {selectedCountries.map((country) => (
                        <div
                          key={country.code}
                          className="bg-blue-50 text-blue-700 px-2 py-1 rounded-md text-sm flex items-center"
                        >
                          {country.name}
                          <button
                            className="ml-1 text-blue-500 hover:text-blue-700"
                            onClick={() => handleRemoveCountry(country.code)}
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="mt-3 text-sm text-gray-500 italic">
                      No countries selected. All traffic will be blocked.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Browser Fraud */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center space-x-3 mb-6">
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <h3 className="text-lg font-semibold text-gray-900">Browser Fraud</h3>
          </div>

          <div className="space-y-6">
            {/* Incognito/Ad Blocker Detected */}
            <div className="flex items-start space-x-4">
              <div className="flex items-center mt-1">
                <Toggle checked={toggleIncognito} onChange={() => setToggleIncognito(v => !v)} />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-900 mb-2">Incognito/Ad Blocker Detected</h4>
                <p className="text-sm text-gray-500">
                  Flags users browsing in private/incognito mode or using ad-blocking extensions.
                </p>
              </div>
            </div>

            {/* JavaScript Disabled */}
            <div className="flex items-start space-x-4">
              <div className="flex items-center mt-1">
                <Toggle checked={toggleJS} onChange={() => setToggleJS(v => !v)} />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-900 mb-2">JavaScript Disabled</h4>
                <p className="text-sm text-gray-500">
                  Blocks users with JavaScript disabled, a common trait of bots or anti-tracking setups.
                </p>
              </div>
            </div>

            {/* Browser Language Fraud Detection */}
            <div className="flex items-start space-x-4">
              <div className="flex items-center mt-1">
                <Toggle checked={toggleLang} onChange={() => setToggleLang(v => !v)} />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-900 mb-2">Browser Language Fraud Detection</h4>
                <p className="text-sm text-gray-500">
                  Flags users with non-English browser languages (Only EN-US, EN-GB etc. are allowed)
                </p>
              </div>
            </div>

            {/* Headless Browser Detected */}
            <div className="flex items-start space-x-4">
              <div className="flex items-center mt-1">
                <Toggle checked={toggleHeadless} onChange={() => setToggleHeadless(v => !v)} />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-900 mb-2">Headless Browser Detected</h4>
                <p className="text-sm text-gray-500">
                  Blocks sessions running in headless or automation-mode browsers, common in bots.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Geo Access Control */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center space-x-3 mb-6">
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <h3 className="text-lg font-semibold text-gray-900">Geo Access Control</h3>
          </div>

          <div className="space-y-6">
            {/* One-Time Geolocation */}
            <div className="flex items-start space-x-4">
              <div className="flex items-center mt-1">
                <Toggle checked={toggleGeo} onChange={() => setToggleGeo(v => !v)} />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-900 mb-2">One-Time Geolocation</h4>
                <p className="text-sm text-gray-500">
                  Prompts users to share their location once for additional verification.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Save Settings Button */}
      <div className="flex justify-end mt-8">
        <button
          onClick={() => {
            setShowFraudSaveToast(true);
            setTimeout(() => setShowFraudSaveToast(false), 2000);
          }}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-colors duration-200 font-semibold text-lg"
        >
          Save Settings
        </button>
      </div>
      {/* Toast Notification */}
      {showFraudSaveToast && (
        <div className="fixed right-8 bottom-8 z-50 bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg flex items-center space-x-2 animate-fadeIn">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span className="font-medium">Settings saved</span>
        </div>
      )}
    </div>
  )

  const renderIntegrations = () => (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Website Domain Section */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Please Enter Your Website Domain</h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
              <div className="flex space-x-3">
                <input
                  type="text"
                  defaultValue="www.yourdomain.com"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
                  Test Connection
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <span className="inline-flex px-3 py-1 text-sm font-medium bg-green-100 text-green-800 rounded-full">
                Connected
              </span>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">HTML Code</label>
              <div className="relative">
                <textarea
                  readOnly
                  value={`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Fraud Detection Settings</title>
</head>
<body>

  <h1>Detection Mode</h1>
  
  <h2>Safe Mode</h2>
  <p>Flags medium-risk behavior for review.</p>
  
  <h2>Aggressive Mode</h2>
  <p>Blocks high-risk users immediately.</p>
  
  <h1>Custom Rules</h1>
  <p>Extra checks like VPN, incognito, and user interaction.</p>
  
  <h2>Visitor Threshold</h2>
  <p>Limits visits over short and long periods.</p>
  
  <h2>Session Control</h2>
  <p>Blocks long or suspicious sessions.</p>

</body>
</html>`}
                  className="w-full h-64 px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm font-mono resize-none"
                />
                <button
                  onClick={() => {
                    const textarea = document.querySelector("textarea");
                    if (textarea) {
                      navigator.clipboard.writeText(textarea.value);
                    }
                    // You could add a toast notification here
                  }}
                  className="absolute top-3 right-3 px-3 py-1 bg-gray-200 text-gray-700 rounded text-sm hover:bg-gray-300 transition-colors duration-200 flex items-center space-x-1"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                  <span>Copy</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Facebook Event Test Section */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Facebook Event Test</h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Event Name</label>
              <div className="flex space-x-3">
                <input
                  type="text"
                  value="Oliggo3824639423"
                  readOnly
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
                />
                <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
                  Test Connection
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <span className="inline-flex px-3 py-1 text-sm font-medium bg-green-100 text-green-800 rounded-full">
                Connected
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderRefundReport = () => (
    <div className="p-6 space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">All Time Refund</p>
              <p className="text-2xl font-bold text-gray-900">$300</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Next Upcoming Refund Date</p>
              <p className="text-2xl font-bold text-gray-900">05/01/2025</p>
            </div>
          </div>
        </div>
      </div>

      {/* Refund Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Week</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Start Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  End Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Refund Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Link</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {refundData.weeks.map((week) => (
                <tr key={week.id} className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{week.week}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div>
                      <div>{week.startDate}</div>
                      <div className="text-xs text-gray-400">{week.startTime}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div>
                      <div>{week.endDate}</div>
                      <div className="text-xs text-gray-400">{week.endTime}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{week.refundAmount}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => navigator.clipboard.writeText(week.link)}
                      className="inline-flex items-center space-x-1 px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50 transition-colors duration-200"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                        />
                      </svg>
                      <span>Copy Link</span>
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
            <span className="text-sm text-gray-700">Showing 1 to</span>
            <select className="border border-gray-300 rounded px-2 py-1 text-sm">
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
            <span className="text-sm text-gray-700">out of 20 entries</span>
          </div>

          <div className="flex items-center space-x-2">
            <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button className="px-3 py-1 bg-blue-500 text-white border border-blue-500 rounded text-sm">1</button>
            <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">2</button>
            <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm px-6 py-4 flex justify-between items-center z-10">
        <div className="flex items-center">
          <Image src="/images/new-logo.png" alt="Oliggo Logo" width={32} height={32} className="mr-2" />
          <span className="text-blue-600 text-2xl font-medium">Oliggo</span>
        </div>

        <div className="relative" ref={profileDropdownRef}>
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center space-x-2 text-gray-700 hover:text-gray-900"
          >
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
              {userFirstName[0]}
              {userLastName[0]}
            </div>
            <span className="font-medium">{userFirstName}</span>
          </button>

          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
              <button
                onClick={() => {
                  setIsUserSettingsOpen(true);
                  setIsProfileOpen(false);
                }}
                className="w-full flex items-center justify-center space-x-2 text-gray-700 hover:text-blue-600 py-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span>User Settings</span>
              </button>
              <button
                onClick={() => { window.location.href = '/admin'; }}
                className="w-full flex items-center justify-center space-x-2 text-gray-700 hover:text-blue-600 py-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span>Admin Panel</span>
              </button>
              <div className="border-t pt-4">
                <button 
                  onClick={handleSignOut}
                  className="w-full flex items-center justify-center space-x-2 text-red-600 hover:text-red-700"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

      <div className="flex flex-1">
        {/* Left Sidebar */}
        <div
          className={`${isSidebarExpanded ? "w-80" : "w-20"} bg-white shadow-sm flex flex-col py-6 transition-all duration-300 relative`}
        >
          {/* Expand/Collapse Button - Moved above profiles */}
          <div className={`${isSidebarExpanded ? "px-6" : "flex justify-center"} mb-4`}>
            <button
              onClick={() => setIsSidebarExpanded(!isSidebarExpanded)}
              className="w-8 h-8 bg-gray-100 border border-gray-300 rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-all duration-200 hover:bg-gray-200"
            >
              <svg
                className={`w-4 h-4 text-gray-600 transition-transform duration-200 ${isSidebarExpanded ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          <div className={`${isSidebarExpanded ? "px-6" : "items-center"} flex flex-col space-y-4`}>
            {/* Sub-profiles */}
            {subProfiles.map((profile, index) => (
              <div key={profile.id} className="relative">
                <button
                  onClick={() => setSelectedProfile(index)}
                  onMouseEnter={() => !isSidebarExpanded && setHoveredProfile(index)}
                  onMouseLeave={() => !isSidebarExpanded && setHoveredProfile(null)}
                  className={`flex items-center justify-center transition-all duration-300 transform hover:scale-110 ${
                    isSidebarExpanded ? "w-full flex-col" : "w-12 h-12 rounded-full"
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-full ${profile.color} flex items-center justify-center text-white font-medium shadow-md ${
                      selectedProfile === index ? "ring-2 ring-blue-500 ring-offset-2" : ""
                    }`}
                  >
                    {profile.initials}
                  </div>

                  {isSidebarExpanded && (
                    <div className="mt-2 text-center">
                      <p className="text-gray-800 font-medium">{profile.name}</p>
                      <p className="text-gray-500 text-xs">{profile.details.adAccount}</p>
                    </div>
                  )}
                </button>

                {/* Tooltip for collapsed sidebar */}
                {!isSidebarExpanded && hoveredProfile === index && (
                  <div
                    className="absolute left-16 top-0 bg-white border border-gray-200 text-gray-800 p-3 rounded-lg shadow-xl z-50 w-64"
                    onMouseEnter={() => setHoveredProfile(index)}
                    onMouseLeave={() => setHoveredProfile(null)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-medium text-blue-600">{profile.name} Profile</div>
                      <div className="flex space-x-1">
                        <button
                          onClick={() => openEditModal(index)}
                          className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors duration-200"
                          title="Edit Profile"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            />
                          </svg>
                        </button>
                        <button
                          onClick={() => deleteProfile(index)}
                          className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors duration-200"
                          title="Delete Profile"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div className="text-sm space-y-2">
                      <div>
                        <span className="text-gray-500">Ad Account:</span> {profile.details.adAccount}
                      </div>
                      <div>
                        <span className="text-gray-500">Campaign:</span> {profile.details.campaign}
                      </div>
                      <div>
                        <span className="text-gray-500">Adset:</span> {profile.details.adset}
                      </div>
                      <div>
                        <span className="text-gray-500">Pixel:</span> {profile.details.pixel}
                      </div>
                      <div>
                        <span className="text-gray-500">Activated:</span> {profile.details.activatedTime}
                      </div>
                      <div>
                        <span className="text-gray-500">Status:</span>
                        <span
                          className={`ml-1 ${profile.details.protectStatus === "Active" ? "text-green-600" : "text-yellow-600"}`}
                        >
                          {profile.details.protectStatus}
                        </span>
                      </div>
                    </div>
                    <div className="absolute left-0 top-3 w-0 h-0 border-t-4 border-b-4 border-r-4 border-transparent border-r-white -translate-x-1"></div>
                  </div>
                )}
              </div>
            ))}

            {/* Expanded Profile Details */}
            {isSidebarExpanded && (
              <div className="bg-gray-50 rounded-lg p-4 mt-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium text-gray-800">Profile Details</h3>
                  <div className="flex space-x-1">
                    <button
                      onClick={() => openEditModal(selectedProfile)}
                      className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors duration-200"
                      title="Edit Profile"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={() => deleteProfile(selectedProfile)}
                      className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors duration-200"
                      title="Delete Profile"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-gray-500">Campaign:</span>
                    <p className="text-gray-800">{subProfiles[selectedProfile].details.campaign}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Adset:</span>
                    <p className="text-gray-800">{subProfiles[selectedProfile].details.adset}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Pixel:</span>
                    <p className="text-gray-800">{subProfiles[selectedProfile].details.pixel}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Activated Time:</span>
                    <p className="text-gray-800">{subProfiles[selectedProfile].details.activatedTime}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Protect Status:</span>
                    <span
                      className={`ml-1 px-2 py-1 rounded-full text-xs font-medium ${
                        subProfiles[selectedProfile].details.protectStatus === "Active"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {subProfiles[selectedProfile].details.protectStatus}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Add Profile Button */}
            <button
              className={`${isSidebarExpanded ? "w-full p-4 rounded-lg" : "w-12 h-12 rounded-full"} border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:border-gray-400 transition-all duration-300 hover:scale-105`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              {isSidebarExpanded && <span className="ml-2 text-gray-600">Add Profile</span>}
            </button>

            {/* Separator Line */}
            <div className={`${isSidebarExpanded ? "w-full" : "w-8"} h-px bg-gray-300 my-4`}></div>

            {/* Facebook Logo with Animation */}
            <div
              className={`${isSidebarExpanded ? "w-full p-4 rounded-lg" : "w-12 h-12 rounded-lg"} bg-blue-600 flex items-center justify-center transition-all duration-300 hover:bg-blue-700 hover:scale-105 ${isSidebarExpanded ? "justify-start space-x-3" : ""} relative overflow-hidden group`}
            >
              <div className="relative">
                <span className="text-white font-bold text-lg transform transition-all duration-500 group-hover:rotate-12 group-hover:scale-110 inline-block">
                  f
                </span>
                {/* Animated background pulse */}
                <div className="absolute inset-0 bg-blue-400 rounded-full opacity-0 group-hover:opacity-30 group-hover:animate-ping"></div>
                {/* Rotating border */}
                <div className="absolute inset-0 border-2 border-blue-300 rounded-full opacity-0 group-hover:opacity-50 animate-spin"></div>
              </div>
              {isSidebarExpanded && (
                <span className="text-white font-medium transform transition-all duration-300 group-hover:translate-x-1">
                  Facebook Ads
                </span>
              )}
              {/* Floating particles */}
              <div className="absolute top-1 right-1 w-1 h-1 bg-blue-200 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-bounce"></div>
              <div
                className="absolute bottom-1 left-1 w-1 h-1 bg-blue-200 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-bounce"
                style={{ animationDelay: "0.2s" }}
              ></div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Navigation Tabs */}
          <div className="bg-white border-b border-gray-200 px-6">
            <div className="flex justify-center space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors duration-200 ${
                    activeTab === tab
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Content based on active tab */}
          <div className="flex-1">
            {activeTab === "Dashboard" && renderDashboard()}
            {activeTab === "User Activity" && renderUserActivity()}
            {activeTab === "Fraud Protection" && renderFraudProtection()}
            {activeTab === "Integrations" && renderIntegrations()}
            {activeTab === "Refund Report" && renderRefundReport()}
          </div>
        </div>
      </div>

      {/* Calendar Modal */}
      {isCalendarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Select Date Range</h3>
              <button onClick={() => setIsCalendarOpen(false)} className="text-gray-400 hover:text-gray-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Calendar Header */}
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1))}
                className="p-2 hover:bg-gray-100 rounded"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <h4 className="text-lg font-medium">
                {selectedDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
              </h4>
              <button
                onClick={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1))}
                className="p-2 hover:bg-gray-100 rounded"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1 mb-4">
              {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                <div key={day} className="p-2 text-center text-sm font-medium text-gray-500">
                  {day}
                </div>
              ))}

              {/* Empty cells for days before month starts */}
              {Array.from({ length: getFirstDayOfMonth(selectedDate) }).map((_, index) => (
                <div key={index} className="p-2"></div>
              ))}

              {/* Days of the month */}
              {Array.from({ length: getDaysInMonth(selectedDate) }).map((_, index) => {
                const day = index + 1
                return (
                  <button
                    key={day}
                    onClick={() => handleDateClick(day)}
                    className={`p-2 text-sm rounded hover:bg-blue-100 transition-colors ${
                      isDateStart(day) || isDateEnd(day)
                        ? "bg-blue-600 text-white"
                        : isDateInRange(day)
                          ? "bg-blue-100 text-blue-600"
                          : "text-gray-700"
                    }`}
                  >
                    {day}
                  </button>
                )
              })}
            </div>

            {/* Selected Range Display */}
            {startDate && (
              <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">
                  <strong>Start:</strong> {startDate.toLocaleDateString()}
                  {endDate && (
                    <>
                      <br />
                      <strong>End:</strong> {endDate.toLocaleDateString()}
                    </>
                  )}
                </p>
              </div>
            )}

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setStartDate(null)
                  setEndDate(null)
                  setIsCalendarOpen(false)
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={() => setIsCalendarOpen(false)}
                disabled={!startDate || !endDate}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 max-w-md mx-4">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Edit Facebook Account</h3>
              <button
                onClick={closeEditModal}
                className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Profile Avatar */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div
                  className={`w-20 h-20 rounded-full ${editProfileColor} flex items-center justify-center text-xl font-bold shadow-lg`}
                >
                  {editProfileName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()
                    .slice(0, 2) || "MB"}
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Account Name */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Account Name</label>
              <input
                type="text"
                value={editProfileName}
                onChange={(e) => setEditProfileName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter account name"
              />
            </div>

            {/* Account Color */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-3">Account Color</label>
              <div className="flex flex-wrap gap-3 justify-center">
                {colorOptions.map((color) => (
                  <button
                    key={color.value}
                    onClick={() => setEditProfileColor(color.value)}
                    className={`w-10 h-10 rounded-full ${color.class} transition-all duration-200 hover:scale-110 ${
                      editProfileColor === color.value
                        ? "ring-4 ring-blue-300 ring-offset-2"
                        : "hover:ring-2 hover:ring-gray-300 hover:ring-offset-1"
                    }`}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3">
              <button
                onClick={closeEditModal}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={saveProfileChanges}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* User Settings Modal */}
      {isUserSettingsOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 max-w-md mx-4">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                <h3 className="text-lg font-semibold text-gray-900">User Settings</h3>
              </div>
              <button onClick={() => setIsUserSettingsOpen(false)} className="text-gray-400 hover:text-gray-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Photo Section */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">Photo</label>
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-700">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  <span>Upload</span>
                </button>
              </div>
            </div>

            {/* First Name */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
              <input
                type="text"
                value={userFirstName}
                onChange={(e) => setUserFirstName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Last Name */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
              <input
                type="text"
                value={userLastName}
                onChange={(e) => setUserLastName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3 mb-4">
              <button
                onClick={() => setIsUserSettingsOpen(false)}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => setIsUserSettingsOpen(false)}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Save Changes
              </button>
            </div>

            {/* Sign Out */}
            <div className="border-t pt-4">
              <button className="w-full flex items-center justify-center space-x-2 text-red-600 hover:text-red-700">
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
        </div>
      )}

      <style jsx global>{`
        @keyframes pulse {
          0% {
            transform: scale(1);
            opacity: 0.7;
          }
          50% {
            transform: scale(1.5);
            opacity: 1;
          }
          100% {
            transform: scale(1);
            opacity: 0.7;
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-in-out;
        }
      `}</style>
    </div>
  )
}
