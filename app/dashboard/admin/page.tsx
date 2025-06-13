"use client"
import { useState } from "react"
import {
  Users,
  Shield,
  Bell,
  FileText,
  Activity,
  Database,
  Key,
  UserCheck,
  Settings,
  BarChart3,
  TrendingUp,
  AlertTriangle,
  Server,
  Plus,
  Search,
  Filter,
  Download,
  MoreHorizontal,
  ArrowLeft,
  HelpCircle,
  Moon,
} from "lucide-react"

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState("Dashboard")
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false)
  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    userType: "Basic",
    status: "Active",
    sendWelcomeEmail: true,
  })

  const sidebarItems = [
    { name: "Dashboard", icon: BarChart3, active: true },
    { name: "User Management", icon: Users },
    { name: "Security", icon: Shield },
    { name: "Notifications", icon: Bell, badge: "3" },
    { name: "Reports", icon: FileText },
    { name: "Activity Logs", icon: Activity },
    { name: "Database", icon: Database },
    { name: "API Access", icon: Key },
    { name: "Roles & Permissions", icon: UserCheck },
    { name: "Settings", icon: Settings },
  ]

  const statsCards = [
    {
      title: "Total Users",
      value: "0",
      subtitle: "No data available",
      icon: Users,
      color: "text-blue-500",
      bgColor: "bg-blue-50",
    },
    {
      title: "Active Sessions",
      value: "0",
      subtitle: "No data available",
      icon: TrendingUp,
      color: "text-green-500",
      bgColor: "bg-green-50",
    },
    {
      title: "Security Alerts",
      value: "0",
      subtitle: "No data available",
      icon: AlertTriangle,
      color: "text-orange-500",
      bgColor: "bg-orange-50",
    },
    {
      title: "API Requests",
      value: "0",
      subtitle: "No data available",
      icon: Server,
      color: "text-purple-500",
      bgColor: "bg-purple-50",
    },
  ]

  const systemHealth = [
    { name: "CPU Usage", value: "0%", color: "bg-blue-500" },
    { name: "Memory Usage", value: "0%", color: "bg-green-500" },
    { name: "Disk Space", value: "0%", color: "bg-yellow-500" },
    { name: "Network Load", value: "0%", color: "bg-purple-500" },
  ]

  const users = [
    {
      id: 1,
      name: "Mehmet Kacmaz",
      email: "mehmet@domain.com",
      type: "Admin",
      status: "Active",
      lastLogin: "2025-06-05 11:31",
      created: "2025-03-17 05:22",
    },
    {
      id: 2,
      name: "Talha Shah",
      email: "talha@domain.com",
      type: "Basic",
      status: "Active",
      lastLogin: "2025-05-26 10:32",
      created: "2025-05-07 19:42",
    },
    {
      id: 3,
      name: "Username User Surname",
      email: "user@domain.com",
      type: "Basic",
      status: "Active",
      lastLogin: "2025-06-01 03:29",
      created: "2025-04-28 09:03",
    },
    {
      id: 4,
      name: "John Doe",
      email: "john@domain.com",
      type: "Basic",
      status: "Inactive",
      lastLogin: "2025-05-26 22:41",
      created: "2025-02-16 08:54",
    },
    {
      id: 5,
      name: "Jane Smith",
      email: "jane@domain.com",
      type: "Basic",
      status: "Active",
      lastLogin: "2025-05-30 06:28",
      created: "2025-05-11 22:57",
    },
  ]

  const handleAddUser = () => {
    // Add user logic here
    console.log("Adding user:", newUser)
    setIsAddUserModalOpen(false)
    setNewUser({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      userType: "Basic",
      status: "Active",
      sendWelcomeEmail: true,
    })
  }

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back, Admin. Here's what's happening with your system.</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>Last 7 days</span>
          </div>
          <button className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors duration-200">
            Export
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {["Overview", "Analytics", "Reports"].map((tab) => (
            <button
              key={tab}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                tab === "Overview"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                <p className="text-xs text-gray-500 mt-1">{stat.subtitle}</p>
              </div>
              <div className={`${stat.bgColor} p-3 rounded-lg`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* System Activity */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">System Activity</h3>
          <p className="text-sm text-gray-600 mb-6">System performance and user activity over time</p>
          <div className="flex items-center justify-center h-48 text-gray-500">
            <div className="text-center">
              <Activity className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p>No activity data available</p>
            </div>
          </div>
        </div>

        {/* System Health */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">System Health</h3>
          <p className="text-sm text-gray-600 mb-6">Current system status and health metrics</p>
          <div className="space-y-4">
            {systemHealth.map((metric, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">{metric.name}</span>
                <div className="flex items-center space-x-3">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div className={`${metric.color} h-2 rounded-full`} style={{ width: metric.value }}></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900 w-8">{metric.value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Users */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Recent Users</h3>
          <p className="text-sm text-gray-600 mb-6">Latest user registrations</p>
          <div className="flex items-center justify-center h-32 text-gray-500">
            <div className="text-center">
              <Users className="w-8 h-8 mx-auto mb-2 text-gray-300" />
              <p className="text-sm">No recent users</p>
            </div>
          </div>
        </div>

        {/* Security Alerts */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Security Alerts</h3>
          <p className="text-sm text-gray-600 mb-6">Recent security notifications</p>
          <div className="flex items-center justify-center h-32 text-gray-500">
            <div className="text-center">
              <Shield className="w-8 h-8 mx-auto mb-2 text-gray-300" />
              <p className="text-sm">No security alerts</p>
            </div>
          </div>
        </div>

        {/* System Notifications */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">System Notifications</h3>
          <p className="text-sm text-gray-600 mb-6">Important system messages</p>
          <div className="flex items-center justify-center h-32 text-gray-500">
            <div className="text-center">
              <Bell className="w-8 h-8 mx-auto mb-2 text-gray-300" />
              <p className="text-sm">No system notifications</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderUserManagement = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
          <p className="text-gray-600 mt-1">Manage and monitor user accounts in your system.</p>
        </div>
        <button
          onClick={() => setIsAddUserModalOpen(true)}
          className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors duration-200 flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add User</span>
        </button>
      </div>

      {/* Filters */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {["All Users", "Admins", "Basic Users", "Active", "Inactive"].map((filter) => (
            <button
              key={filter}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors duration-200 ${
                filter === "All Users"
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search users..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
            <Filter className="w-4 h-4 text-gray-600" />
          </button>
          <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
            <Download className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left">
                <input type="checkbox" className="rounded border-gray-300" />
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Login
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Created
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50 transition-colors duration-150">
                <td className="px-6 py-4">
                  <input type="checkbox" className="rounded border-gray-300" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{user.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{user.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      user.type === "Admin" ? "bg-purple-100 text-purple-800" : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {user.type === "Admin" ? <Shield className="w-3 h-3 mr-1" /> : <Users className="w-3 h-3 mr-1" />}
                    {user.type}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      user.status === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.lastLogin}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.created}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button className="text-gray-400 hover:text-gray-600 transition-colors duration-200">
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="bg-white px-6 py-3 border-t border-gray-200 flex items-center justify-between">
          <div className="text-sm text-gray-700">Showing 1 to 5 of 5 users</div>
          <div className="flex items-center space-x-2">
            <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50 disabled:opacity-50">
              Previous
            </button>
            <button className="px-3 py-1 bg-blue-500 text-white border border-blue-500 rounded text-sm">1</button>
            <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50 disabled:opacity-50">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  const renderEmptyPage = (title: string, description: string, icon: any) => (
    <div className="flex items-center justify-center h-96">
      <div className="text-center">
        {icon && <icon className="w-16 h-16 mx-auto mb-4 text-gray-300" />}
        <h2 className="text-xl font-semibold text-gray-900 mb-2">{title}</h2>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-sm border-r border-gray-200">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">Admin</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {sidebarItems.map((item) => (
            <button
              key={item.name}
              onClick={() => setActiveTab(item.name)}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors duration-200 ${
                activeTab === item.name
                  ? "bg-blue-50 text-blue-700 border-r-2 border-blue-600"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.name}</span>
              {item.badge && (
                <span className="ml-auto bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full">{item.badge}</span>
              )}
            </button>
          ))}
        </nav>

        {/* Admin User Info */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-white">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">A</span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Admin User</p>
              <p className="text-xs text-gray-500">Super Admin</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200">
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div className="flex items-center space-x-4">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                <HelpCircle className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                <Moon className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-auto">
          {activeTab === "Dashboard" && renderDashboard()}
          {activeTab === "User Management" && renderUserManagement()}
          {activeTab === "Security" &&
            renderEmptyPage("Security", "Security settings and configurations will be available here.", Shield)}
          {activeTab === "Notifications" &&
            renderEmptyPage("Notifications", "System notifications and alerts will be displayed here.", Bell)}
          {activeTab === "Reports" && renderEmptyPage("Reports", "Generate and view system reports here.", FileText)}
          {activeTab === "Activity Logs" &&
            renderEmptyPage("Activity Logs", "View system and user activity logs here.", Activity)}
          {activeTab === "Database" &&
            renderEmptyPage("Database", "Database management and monitoring tools.", Database)}
          {activeTab === "API Access" && renderEmptyPage("API Access", "Manage API keys and access controls.", Key)}
          {activeTab === "Roles & Permissions" &&
            renderEmptyPage("Roles & Permissions", "Configure user roles and permissions.", UserCheck)}
          {activeTab === "Settings" &&
            renderEmptyPage("Settings", "System settings and configuration options.", Settings)}
        </main>
      </div>

      {/* Add User Modal */}
      {isAddUserModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 max-w-md mx-4">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Add New User</h3>
                <p className="text-sm text-gray-600 mt-1">Create a new user account in the system.</p>
              </div>
              <button
                onClick={() => setIsAddUserModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              {/* First Name & Last Name */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                  <input
                    type="text"
                    value={newUser.firstName}
                    onChange={(e) => setNewUser({ ...newUser, firstName: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                  <input
                    type="text"
                    value={newUser.lastName}
                    onChange={(e) => setNewUser({ ...newUser, lastName: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <input
                  type="password"
                  value={newUser.password}
                  onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* User Type & Status */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">User Type</label>
                  <select
                    value={newUser.userType}
                    onChange={(e) => setNewUser({ ...newUser, userType: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Basic">Basic</option>
                    <option value="Admin">Admin</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <select
                    value={newUser.status}
                    onChange={(e) => setNewUser({ ...newUser, status: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>

              {/* Send Welcome Email */}
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="sendWelcomeEmail"
                  checked={newUser.sendWelcomeEmail}
                  onChange={(e) => setNewUser({ ...newUser, sendWelcomeEmail: e.target.checked })}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="sendWelcomeEmail" className="text-sm font-medium text-gray-700">
                  Send welcome email
                </label>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3 mt-8">
              <button
                onClick={() => setIsAddUserModalOpen(false)}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleAddUser}
                className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors duration-200"
              >
                Add User
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
