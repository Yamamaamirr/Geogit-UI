"use client"
import { Menu, Search, Bell, User } from "lucide-react"

const Navbar = ({ toggleSidebar }) => {
  return (
    <nav className="h-16 bg-black text-white flex items-center justify-between px-6 shadow-md z-10">
      <div className="flex items-center space-x-6">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-full hover:bg-gray-800 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
          aria-label="Toggle sidebar"
        >
          <Menu size={20} />
        </button>
        <h1 className="text-xl font-medium tracking-tight">Atlas</h1>
      </div>

      <div className="hidden md:flex items-center relative max-w-md w-full mx-4">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search size={16} className="text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search locations..."
          className="w-full bg-gray-800 border-0 rounded-full py-2 pl-10 pr-4 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-500"
        />
      </div>

      <div className="flex items-center space-x-4">
        <button className="p-2 rounded-full hover:bg-gray-800 transition-all duration-200">
          <Bell size={18} />
        </button>
        <div className="h-8 w-8 rounded-full bg-gray-700 flex items-center justify-center overflow-hidden">
          <User size={16} />
        </div>
      </div>
    </nav>
  )
}

export default Navbar

