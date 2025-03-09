"use client"

import { FileText, Folder, ChevronRight, Plus, Search, User } from "lucide-react"
import { useState } from "react"

const Sidebar = ({ files, onFileSelect, isOpen, activeFile, onFileUpload }) => {
  const [uploading, setUploading] = useState(false)

  return (
    <aside
      className={`bg-white border-r border-gray-200 transition-all duration-300 ease-in-out ${
        isOpen ? "w-72" : "w-0"
      } overflow-hidden flex flex-col`}
    >
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium">Files</h2>
          <label className="p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer">
          <Plus size={16} />
          <input
  type="file"
  accept=".geojson,application/geo+json,.zip" // Allow GeoJSON and ZIP files
  className="hidden"
  onChange={(event) => {
    const file = event.target.files[0]; // Get the first uploaded file
    if (file) onFileUpload(file); // Pass the file to onFileUpload
  }}
  disabled={uploading}
/>
          </label>
        </div>

        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={14} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search files..."
            className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2 pl-9 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-2">
        <div className="mb-4">
          <div className="flex items-center px-2 py-1.5 text-sm font-medium text-gray-500">
            <span>MY FILES</span>
          </div>
          <ul className="mt-1 space-y-1">
            {files.map((file) => (
              <li key={file.id}>
                <button
                  onClick={() => onFileSelect(file)}
                  className={`w-full flex items-center justify-between p-2.5 rounded-lg text-left transition-all duration-200 ${
                    activeFile && activeFile.id === file.id
                      ? "bg-gray-100 text-black"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center">
                    {file.type === "folder" ? (
                      <Folder size={16} className="mr-3 text-gray-400" />
                    ) : (
                      <FileText size={16} className="mr-3 text-gray-400" />
                    )}
                    <div>
                      <div className="font-medium">{file.name}</div>
                      <div className="text-xs text-gray-500 mt-0.5">
                        {file.type === "folder" ? `${file.items} items` : `${file.coordinates.join(", ")}`}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="text-xs text-gray-400 mr-2">{file.lastModified}</span>
                    {file.type === "folder" && <ChevronRight size={14} className="text-gray-400" />}
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="p-4 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center mr-2">
              <User size={14} />
            </div>
            <div>
              <div className="text-sm font-medium">Talha Waqqas</div>
              <div className="text-xs text-gray-500">Free Plan</div>
            </div>
          </div>
          <button className="text-xs font-medium text-black hover:underline">Upgrade</button>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar