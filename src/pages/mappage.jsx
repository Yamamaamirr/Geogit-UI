"use client"

import React from "react"
import Navbar from '../components/navbar'
import Sidebar from "../components/sidebar"
import Map from "../components/map"
import ChatBot from '../components/chatbot'
import * as turf from "@turf/turf"
import * as shapefile from "shapefile" // Import shapefile library
import JSZip from "jszip" // Import JSZip for handling ZIP files

export default function MapPage() {
  const [isChatOpen, setIsChatOpen] = React.useState(false)
  const [files, setFiles] = React.useState([]) // Initialize as empty array
  const [activeFile, setActiveFile] = React.useState(null)
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true)
  const [uploadedGeoJSON, setUploadedGeoJSON] = React.useState(null)
  const [uploadedZipFile, setUploadedZipFile] = React.useState(null); // Add this state

  const toggleChat = () => setIsChatOpen(!isChatOpen)
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)

  const handleFileSelect = (file) => {
    setActiveFile(file)
  }

  const handleFileUpload = async (file) => {
    if (!(file instanceof File)) {
      console.error("Invalid file object:", file)
      alert("Please upload a valid file.")
      return
    }

    if(!uploadedZipFile){
    setUploadedZipFile(file);}

    // Check if the file is a ZIP file
    if (file.name.endsWith(".zip")) {
      try {
        // Extract the ZIP file
        const zip = new JSZip()
        const zipData = await file.arrayBuffer()
        const zipContents = await zip.loadAsync(zipData)

        // Find the .shp file in the ZIP
        let shpFile
        for (const [filename, fileData] of Object.entries(zipContents.files)) {
          if (filename.endsWith(".shp")) {
            shpFile = await fileData.async("arraybuffer")
            break
          }
        }

        if (!shpFile) {
          throw new Error("No .shp file found in the ZIP.")
        }

        // Parse the .shp file into GeoJSON
        const geoJSON = await shapefile.read(shpFile)

        // Validate GeoJSON
        if (!geoJSON.type || (geoJSON.type === "FeatureCollection" && !Array.isArray(geoJSON.features))) {
          throw new Error("Invalid GeoJSON format.")
        }

        // Calculate the center using Turf.js
        let centerCoordinates = [0, 0] // Default
        if (geoJSON.features && geoJSON.features.length > 0) {
          const center = turf.center(geoJSON) // Get center
          centerCoordinates = center.geometry.coordinates // Extract coordinates
        }

        // Create a new file object to store in state
        const newFile = {
          id: files.length + 1,
          name: file.name.replace(/\.[^/.]+$/, ""), // Remove file extension
          type: "location",
          coordinates: centerCoordinates, // Set calculated center coordinates
          lastModified: "Just now",
        }

        setFiles((prevFiles) => [...prevFiles, newFile]) // Add file to the list
        setUploadedGeoJSON(geoJSON) // Store GeoJSON to pass into the Map

        // Send the ZIP file to the backend (no response handling needed)
        const formData = new FormData()
        formData.append("shapefileZip", file)
        formData.append("commitMessage", "Uploaded via frontend")

        fetch("http://10.7.237.61:3002/upload", {
          method: "POST",
          body: formData,
        })
          .then(() => {
            console.log("ZIP file sent to backend successfully.")
          })
          .catch((error) => {
            console.error("Error sending ZIP file to backend:", error)
          })
      } catch (error) {
        console.error("Error processing ZIP file:", error)
        alert("Error processing ZIP file. Please ensure it contains a valid .shp file.")
      }
    } else if (file.name.endsWith(".geojson")) {
      // Handle GeoJSON files as before
      const reader = new FileReader()

      reader.onload = async (event) => {
        try {
          const geoJSON = JSON.parse(event.target.result) // Parse as text

          // Validate GeoJSON
          if (!geoJSON.type || (geoJSON.type === "FeatureCollection" && !Array.isArray(geoJSON.features))) {
            throw new Error("Invalid GeoJSON format.")
          }

          // Calculate the center using Turf.js
          let centerCoordinates = [0, 0] // Default
          if (geoJSON.features && geoJSON.features.length > 0) {
            const center = turf.center(geoJSON) // Get center
            centerCoordinates = center.geometry.coordinates // Extract coordinates
          }

          // Create a new file object to store in state
          const newFile = {
            id: files.length + 1,
            name: file.name.replace(/\.[^/.]+$/, ""), // Remove file extension
            type: "location",
            coordinates: centerCoordinates, // Set calculated center coordinates
            lastModified: "Just now",
          }

          setFiles((prevFiles) => [...prevFiles, newFile]) // Add file to the list
          setUploadedGeoJSON(geoJSON) // Store GeoJSON to pass into the Map
        } catch (error) {
          console.error("Error parsing GeoJSON file:", error)
          alert("Invalid GeoJSON file.")
        }
      }

      reader.onerror = () => {
        console.error("Error reading file.")
        alert("Error reading file.")
      }

      reader.readAsText(file) // For GeoJSON
    } else {
      alert("Unsupported file format. Please upload a .zip or .geojson file.")
    }
  }

  // Handle updates to GeoJSON from the Map component
  const handleUpdateGeoJSON = (updatedGeoJSON) => {
    setUploadedGeoJSON(updatedGeoJSON)
  }

  return (
    <div className="flex flex-col h-screen bg-white text-black">
      <Navbar toggleSidebar={toggleSidebar} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          files={files}
          onFileSelect={handleFileSelect}
          isOpen={isSidebarOpen}
          activeFile={activeFile}
          onFileUpload={handleFileUpload}
        />
        <Map
          activeFile={activeFile}
          isSidebarOpen={isSidebarOpen}
          uploadedGeoJSON={uploadedGeoJSON}
          onUpdateGeoJSON={handleUpdateGeoJSON}
        />
      </div>
      <ChatBot isOpen={isChatOpen} toggleChat={toggleChat} uploadedZipFile={uploadedZipFile}  handleFileUpload={handleFileUpload}/>
    </div>
  )
}