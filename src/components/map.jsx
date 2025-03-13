"use client"

import React, { useRef, useEffect, useState } from "react"
import mapboxgl from "mapbox-gl" // Import Mapbox GL JS
import MapboxDraw from "@mapbox/mapbox-gl-draw" // Import Mapbox Draw
import { MapPin, Plus, Minus, Layers, Compass, Move, Circle, Square, Trash2, PenLine } from "lucide-react"

// Set your Mapbox access token
mapboxgl.accessToken = "pk.eyJ1IjoidGFsaGF3YXFxYXMxNCIsImEiOiJjbHBreHhscWEwMWU4MnFyenU3ODdmeTdsIn0.8IlEgMNGcbx806t363hDJg"

const Map = ({ activeFile, isSidebarOpen, uploadedGeoJSON }) => {
  const mapContainer = useRef(null) // Ref for the map container
  const [map, setMap] = useState(null) // State to hold the map instance
  const [draw, setDraw] = useState(null) // State to hold the Draw instance

  // Initialize the map when the component mounts
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current, // Container ID
      style: "mapbox://styles/mapbox/streets-v11", // Map style
      center: activeFile?.coordinates || [0, 0], // Initial center
      zoom: 2, // Initial zoom level
    })

    // Disable default zoom and rotation controls
    map.dragRotate.disable()
    map.touchZoomRotate.disableRotation()

    // Initialize Mapbox Draw
    const draw = new MapboxDraw({
      displayControlsDefault: false, // Hide default controls
      controls: {
        point: false, // Disable default point control
        line_string: false, // Disable default line control
        polygon: false, // Disable default polygon control
        trash: false, // Disable default delete control
      },
    })

    // Add Draw control to the map
    map.addControl(draw)

    // Set the map and Draw instances in state
    setMap(map)
    setDraw(draw)

    // Clean up on unmount
    return () => map.remove()
  }, [])

  // Update the map center when activeFile changes
  useEffect(() => {
    if (map && activeFile?.coordinates) {
      map.flyTo({
        center: activeFile.coordinates,
        zoom: 12,
      })

  
    }
  }, [activeFile, map])

  // Handle zoom in/out
  const handleZoomIn = () => {
    if (map) {
      map.zoomIn()
    }
  }

  const handleZoomOut = () => {
    if (map) {
      map.zoomOut()
    }
  }

  // Resize the map when the sidebar is toggled
  useEffect(() => {
    if (map) {
      setTimeout(() => {
        map.resize() // Resize the map to fit the container
      }, 300) // Add a slight delay to allow the sidebar animation to complete
    }
  }, [isSidebarOpen, map])

  // Add GeoJSON data to the map and fit bounds
  useEffect(() => {
    if (map && uploadedGeoJSON) {
      if (!map.isStyleLoaded()) {
        return // 🚀 Wait until map is ready
      }

      // ✅ Check if the layer/source already exists before removing
      if (map.getLayer("geojson-layer")) {
        map.removeLayer("geojson-layer")
      }
      if (map.getSource("geojson-source")) {
        map.removeSource("geojson-source")
      }

      map.addSource("geojson-source", {
        type: "geojson",
        data: uploadedGeoJSON,
      })

      // ✅ Safely get the first feature type
      const firstFeatureType = uploadedGeoJSON?.features?.[0]?.geometry?.type || null

      if (firstFeatureType === "Polygon") {
        map.addLayer({
          id: "geojson-layer",
          type: "fill",
          source: "geojson-source",
          paint: {
            "fill-color": "#1d0563",
            "fill-opacity": 0.5,
          },
        })
      } else if (firstFeatureType === "LineString") {
        map.addLayer({
          id: "geojson-layer",
          type: "line",
          source: "geojson-source",
          paint: {
            "line-color": "#6d6b08",
            "line-width": 4,
          },
        })
      } else if (firstFeatureType === "Point") {
        map.addLayer({
          id: "geojson-layer",
          type: "circle",
          source: "geojson-source",
          paint: {
            "circle-radius": 6,
            "circle-color": "#f7bd00",
          },
        })
      }

      // Fit the map to the bounds of the GeoJSON data
      const bounds = new mapboxgl.LngLatBounds()
      uploadedGeoJSON.features.forEach((feature) => {
        if (feature.geometry.type === "Point") {
          bounds.extend(feature.geometry.coordinates)
        } else if (feature.geometry.type === "LineString" || feature.geometry.type === "Polygon") {
          feature.geometry.coordinates.forEach((coord) => {
            if (feature.geometry.type === "Polygon") {
              coord.forEach((point) => bounds.extend(point))
            } else {
              bounds.extend(coord)
            }
          })
        }
      })

      if (!bounds.isEmpty()) {
        map.fitBounds(bounds, {
          padding: 50, // Optional padding around the bounds
          maxZoom: 15, // Optional max zoom level
        })
      }
    }
  }, [uploadedGeoJSON, map])

  // Handle draw events
  useEffect(() => {
    if (map && draw) {
      // Listen for draw creation events
      map.on("draw.create", (e) => {
        const features = draw.getAll() // Get all drawn features
        console.log("Drawn features:", features)
        // You can store these features in state or send them to a backend
      })

      // Listen for draw update events
      map.on("draw.update", (e) => {
        const features = draw.getAll() // Get all drawn features
        console.log("Updated features:", features)
      })

      // Listen for draw delete events
      map.on("draw.delete", (e) => {
        const features = draw.getAll() // Get all drawn features
        console.log("Deleted features:", features)
      })
    }
  }, [map, draw])

  // Custom drawing controls
  const handleDrawPoint = () => {
    if (draw) {
      draw.changeMode("draw_point")
    }
  }

  const handleDrawLine = () => {
    if (draw) {
      draw.changeMode("draw_line_string")
    }
  }

  const handleDrawPolygon = () => {
    if (draw) {
      draw.changeMode("draw_polygon")
    }
  }

  const handleDelete = () => {
    if (draw) {
      draw.changeMode("simple_select") // Switch to select mode
      draw.deleteAll() // Delete all drawn features
    }
  }

  return (
    <main
      className={`flex-1 bg-gray-50 relative overflow-hidden transition-all duration-300 "ml-64"
      }`}
    >
      {/* Map container */}
      <div ref={mapContainer} className="h-full w-full">
        {/* Map content */}
        {!activeFile && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-lg max-w-md text-center">
              <div className="h-12 w-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin size={20} className="text-gray-500" />
              </div>
              <h3 className="text-lg font-medium mb-2">No location selected</h3>
              <p className="text-gray-600 text-sm">
                Select a location from the sidebar to view details on the map, or create a new location marker.
              </p>
              <button className="mt-4 bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
                Create new location
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Map controls - Moved to top-right */}
      <div className="absolute top-6 right-6 flex flex-col gap-2">
        {/* Zoom controls */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <button
            onClick={handleZoomIn}
            className="p-2 hover:bg-gray-100 transition-colors border-b border-gray-100 w-10 h-10 flex items-center justify-center"
          >
            <Plus size={18} />
          </button>
          <button
            onClick={handleZoomOut}
            className="p-2 hover:bg-gray-100 transition-colors w-10 h-10 flex items-center justify-center"
          >
            <Minus size={18} />
          </button>
        </div>

        {/* Drawing controls */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <button
            onClick={handleDrawPoint}
            className="p-2 hover:bg-gray-100 transition-colors border-b border-gray-100 w-10 h-10 flex items-center justify-center"
          >
            <Circle size={18} />
          </button>
          <button
            onClick={handleDrawLine}
            className="p-2 hover:bg-gray-100 transition-colors border-b border-gray-100 w-10 h-10 flex items-center justify-center"
          >
            <PenLine size={18} />
          </button>
          <button
            onClick={handleDrawPolygon}
            className="p-2 hover:bg-gray-100 transition-colors border-b border-gray-100 w-10 h-10 flex items-center justify-center"
          >
            <Square size={18} />
          </button>
          <button
            onClick={handleDelete}
            className="p-2 hover:bg-gray-100 transition-colors w-10 h-10 flex items-center justify-center"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </main>
  )
}

export default Map