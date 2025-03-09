import React from 'react'

export default function MapView() {
  return (
    <div className="relative flex h-full w-full flex-col">
      {/* Map placeholder */}
      <div className="absolute inset-0 bg-gray-100">
        {/* Grid pattern for map background */}
        <div className="h-full w-full" 
             style={{
               backgroundImage: 'linear-gradient(#e5e5e5 1px, transparent 1px), linear-gradient(90deg, #e5e5e5 1px, transparent 1px)',
               backgroundSize: '20px 20px'
             }}>
          {/* Map center marker */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="h-4 w-4 rounded-full bg-black"></div>
            <div className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-black opacity-50"></div>
          </div>
          
          {/* Sample map elements */}
          <div className="absolute left-[40%] top-[30%] h-16 w-24 rounded bg-gray-300 opacity-70"></div>
          <div className="absolute left-[60%] top-[40%] h-12 w-32 rounded bg-gray-300 opacity-70"></div>
          <div className="absolute left-[30%] top-[60%] h-20 w-20 rounded-full bg-gray-300 opacity-70"></div>
        </div>
      </div>
      
      {/* Map controls - positioned in the bottom left */}
      <div className="absolute bottom-4 left-4 z-10 flex flex-col gap-2">
        <button className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-md hover:bg-gray-100">
          <span className="text-xl font-bold">+</span>
        </button>
        <button className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-md hover:bg-gray-100">
          <span className="text-xl font-bold">-</span>
        </button>
      </div>
    </div>
  )
}

