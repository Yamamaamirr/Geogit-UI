"use client"

import { Globe } from "lucide-react"
import { useEffect, useState } from "react"

export default function GlobePlaceholder() {
  const [rotation, setRotation] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((prev) => (prev + 0.5) % 360)
    }, 50)

    return () => clearInterval(interval)
  }, [])

  return (
    <section
      id="globe"
      className="w-full py-12 md:py-24 lg:py-32 bg-muted/30 dark:bg-muted/10 relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(120,120,120,0.05)_1px,transparent_1px),linear-gradient(to_right,rgba(120,120,120,0.05)_1px,transparent_1px)] bg-[size:40px_40px] dark:bg-[linear-gradient(rgba(120,120,120,0.1)_1px,transparent_1px),linear-gradient(to_right,rgba(120,120,120,0.1)_1px,transparent_1px)]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl dark:bg-primary/10"></div>
      </div>

      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="inline-flex items-center rounded-full border border-border/40 bg-background/80 backdrop-blur-sm px-3 py-1 text-sm font-medium text-muted-foreground">
            <span className="flex h-2 w-2 rounded-full bg-primary mr-2"></span>
            Coming Soon
          </div>

          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Interactive Globe</h2>
            <p className="max-w-[900px] text-muted-foreground dark:text-foreground/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Explore geospatial data in a whole new dimension with our interactive 3D globe
            </p>
          </div>
        </div>

        <div className="mt-12 flex justify-center">
          <div className="relative w-full max-w-3xl aspect-square">
            {/* Orbit rings */}
            <div className="absolute inset-0 rounded-full border-2 border-dashed border-primary/20 animate-[spin_60s_linear_infinite]"></div>
            <div className="absolute inset-[10%] rounded-full border-2 border-dashed border-primary/30 animate-[spin_40s_linear_infinite_reverse]"></div>
            <div className="absolute inset-[20%] rounded-full border-2 border-dashed border-primary/40 animate-[spin_30s_linear_infinite]"></div>

            {/* Globe */}
            <div className="absolute inset-[30%] rounded-full bg-gradient-to-br from-primary/20 to-primary-foreground/20 backdrop-blur-sm flex items-center justify-center border border-primary/30 overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.2)] dark:shadow-[0_0_100px_rgba(255,255,255,0.1)]">
              {/* Continents (simplified) */}
              <div className="absolute w-full h-full" style={{ transform: `rotateY(${rotation}deg)` }}>
                <div className="absolute top-[20%] left-[30%] w-[15%] h-[10%] bg-primary/40 rounded-full blur-sm"></div>
                <div className="absolute top-[30%] left-[50%] w-[20%] h-[15%] bg-primary/40 rounded-full blur-sm"></div>
                <div className="absolute top-[60%] left-[40%] w-[25%] h-[15%] bg-primary/40 rounded-full blur-sm"></div>
                <div className="absolute top-[40%] left-[20%] w-[10%] h-[20%] bg-primary/40 rounded-full blur-sm"></div>
              </div>

              {/* Glowing core */}
              <div className="absolute inset-[30%] rounded-full bg-primary/30 blur-md animate-pulse"></div>

              {/* Overlay icon */}
              <Globe className="h-16 w-16 text-primary-foreground/90 z-10 animate-pulse" />
            </div>

            {/* Floating data points */}
            <div className="absolute top-[20%] left-[70%] w-3 h-3 rounded-full bg-primary animate-pulse"></div>
            <div className="absolute top-[70%] left-[30%] w-2 h-2 rounded-full bg-primary-foreground animate-pulse"></div>
            <div className="absolute top-[40%] left-[20%] w-4 h-4 rounded-full bg-primary/80 animate-pulse"></div>
            <div className="absolute top-[60%] left-[80%] w-3 h-3 rounded-full bg-primary-foreground/80 animate-pulse"></div>

            {/* Connection lines */}
            <div className="absolute inset-0 opacity-30">
              <svg width="100%" height="100%" viewBox="0 0 100 100" className="text-primary/30">
                <line x1="50" y1="50" x2="70" y2="20" strokeWidth="0.5" stroke="currentColor" strokeDasharray="2 2" />
                <line x1="50" y1="50" x2="30" y2="70" strokeWidth="0.5" stroke="currentColor" strokeDasharray="2 2" />
                <line x1="50" y1="50" x2="20" y2="40" strokeWidth="0.5" stroke="currentColor" strokeDasharray="2 2" />
                <line x1="50" y1="50" x2="80" y2="60" strokeWidth="0.5" stroke="currentColor" strokeDasharray="2 2" />
              </svg>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center max-w-2xl mx-auto">
          <h3 className="text-2xl font-bold mb-4 text-foreground">Interactive Globe Coming Soon</h3>
          <p className="text-muted-foreground dark:text-foreground/80">
            Our team is working on an immersive 3D globe experience powered by D3.js to help you visualize global data
            patterns, track changes over time, and identify spatial relationships in your data.
          </p>
        </div>
      </div>
    </section>
  )
}

