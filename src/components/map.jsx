import React, { useRef, useEffect, useState } from "react"
import mapboxgl from "mapbox-gl" // Import Mapbox GL JS
import { MapPin, Plus, Minus, Layers, Compass, Move } from "lucide-react"

// Set your Mapbox access token
mapboxgl.accessToken = "pk.eyJ1IjoidGFsaGF3YXFxYXMxNCIsImEiOiJjbHBreHhscWEwMWU4MnFyenU3ODdmeTdsIn0.8IlEgMNGcbx806t363hDJg"

const Map = ({ activeFile, isSidebarOpen, uploadedGeoJSON }) => {
  const mapContainer = useRef(null) // Ref for the map container
  const [map, setMap] = useState(null) // State to hold the map instance

  // Initialize the map when the component mounts
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current, // Container ID
      style: "mapbox://styles/mapbox/streets-v11", // Map style
      center: activeFile?.coordinates || [0, 0], // Initial center
      zoom: 10, // Initial zoom level
    })

    // Disable default zoom and rotation controls
    map.dragRotate.disable()
    map.touchZoomRotate.disableRotation()

    // Set the map instance in state
    setMap(map)

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

      // Generate unique IDs for the layer and source
      const sourceId = `geojson-source-${uploadedGeoJSON.id || Date.now()}`
      const layerId = `geojson-layer-${uploadedGeoJSON.id || Date.now()}`

      // ✅ Check if the layer/source already exists before removing
      if (map.getLayer(layerId)) {
        map.removeLayer(layerId)
      }
      if (map.getSource(sourceId)) {
        map.removeSource(sourceId)
      }

      // Add the new source
      map.addSource(sourceId, {
        type: "geojson",
        data: uploadedGeoJSON,
      })

      // ✅ Safely get the first feature type
      const firstFeatureType = uploadedGeoJSON?.features?.[0]?.geometry?.type || null

      if (firstFeatureType === "Polygon") {
        map.addLayer({
          id: layerId,
          type: "fill",
          source: sourceId,
          paint: {
            "fill-color": "#3F51B5",
            "fill-opacity": 0.5,
          },
        })
      } else if (firstFeatureType === "LineString") {
        map.addLayer({
          id: layerId,
          type: "line",
          source: sourceId,
          paint: {
            "line-color": "#3F51B5",
            "line-width": 2,
          },
        })
      } else if (firstFeatureType === "Point") {
        map.addLayer({
          id: layerId,
          type: "circle",
          source: sourceId,
          paint: {
            "circle-radius": 6,
            "circle-color": "#3F51B5",
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

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <button className="p-2 hover:bg-gray-100 transition-colors border-b border-gray-100 w-10 h-10 flex items-center justify-center">
            <Layers size={18} />
          </button>
          <button className="p-2 hover:bg-gray-100 transition-colors border-b border-gray-100 w-10 h-10 flex items-center justify-center">
            <Compass size={18} />
          </button>
          <button className="p-2 hover:bg-gray-100 transition-colors w-10 h-10 flex items-center justify-center">
            <Move size={18} />
          </button>
        </div>
      </div>
    </main>
  )
}

export default Map