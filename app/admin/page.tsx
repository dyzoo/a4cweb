"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Users,
  FileText,
  FolderKanban,
  Clock,
} from "lucide-react";

// Reuse the StatsCard component from your existing components or create a new one
import StatsCard from "@/app/components/admin/StatsCard";

const statsData = [
  {
    title: "Total Projects",
    value: "24",
    change: "+12%",
    icon: FolderKanban,
    color: "blue",
  },
  {
    title: "Active Volunteers",
    value: "156",
    change: "+8%",
    icon: Users,
    color: "green",
  },
  {
    title: "Real Stories",
    value: "18",
    change: "+5%",
    icon: FileText,
    color: "purple",
  },
  {
    title: "Pending Requests",
    value: "7",
    change: "-2",
    icon: Clock,
    color: "yellow",
  },
];

const monthlyData = [
  { name: "Jan", projects: 4, volunteers: 24 },
  { name: "Feb", projects: 6, volunteers: 28 },
  { name: "Mar", projects: 8, volunteers: 32 },
  { name: "Apr", projects: 7, volunteers: 35 },
  { name: "May", projects: 9, volunteers: 40 },
  { name: "Jun", projects: 11, volunteers: 45 },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <select className="border border-gray-200 rounded-lg px-3 py-2 text-sm">
          <option>Last 7 days</option>
          <option>Last 30 days</option>
          <option>Last 3 months</option>
        </select>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold mb-4">Growth Overview</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="projects" stroke="#3B82F6" />
              <Line type="monotone" dataKey="volunteers" stroke="#10B981" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {/* Add your recent activity items here */}
            <p className="text-gray-500">Loading activities...</p>
          </div>
        </div>
      </div>
    </div>
  );
}