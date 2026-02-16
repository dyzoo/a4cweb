"use client";

import { useState } from "react";
import { Search, Bell, User, ChevronDown } from "lucide-react";

export default function Header() {
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <header className="fixed top-0 left-64 right-0 h-16 bg-white border-b border-gray-200 z-40">
      <div className="flex items-center justify-between h-full px-6">
        <div className="flex-1 max-w-2xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search in admin..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="relative p-2 hover:bg-gray-100 rounded-full">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg"
            >
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white">
                <User size={20} />
              </div>
              <div className="text-left">
                <p className="text-sm font-medium">Admin User</p>
                <p className="text-xs text-gray-500">admin@example.com</p>
              </div>
              <ChevronDown size={16} />
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
                <div className="py-1">
                  <a href="/admin/profile" className="block px-4 py-2 text-sm hover:bg-gray-100">Profile</a>
                  <a href="/admin/settings" className="block px-4 py-2 text-sm hover:bg-gray-100">Settings</a>
                  <hr className="my-1" />
                  <a href="/" className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100">Exit Admin</a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}