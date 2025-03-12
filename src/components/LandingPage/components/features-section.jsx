"use client"

import { GitBranch, Brain, Upload, Map, GitCommit, MessageSquareText } from "lucide-react"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle  } from "./ui/card"
import { Button } from "./ui/button"

export default function FeaturesSection() {
  const [hoveredCard, setHoveredCard] = useState(null)

  const features = [
    {
      id: 1,
      icon: <Upload className="h-10 w-10" />,
      title: "Data Upload",
      description: "Upload and visualize geospatial data in various formats including Shapefiles and GeoJSON.",
    },
    {
      id: 2,
      icon: <Map className="h-10 w-10" />,
      title: "Interactive Maps",
      description: "Explore your data with interactive maps featuring zoom, pan, and layer controls.",
    },
    {
      id: 3,
      icon: <GitCommit className="h-10 w-10" />,
      title: "Version Control",
      description: "Track changes to geospatial datasets with a Git-like versioning system.",
    },
    {
      id: 4,
      icon: <GitBranch className="h-10 w-10" />,
      title: "Branch & Merge",
      description: "Create branches for experimental analysis and merge successful changes back to main.",
    },
    {
      id: 5,
      icon: <Brain className="h-10 w-10" />,
      title: "LLM Analysis",
      description: "Leverage the power of LLMs to analyze geospatial data and generate insights.",
    },
    {
      id: 6,
      icon: <MessageSquareText className="h-10 w-10" />,
      title: "Natural Language Queries",
      description: "Ask questions about your data and get detailed answers in natural language.",
    },
  ]

  return (
    <section id="features" className="w-full py-12 md:py-24 lg:py-32 relative">
      {/* Background decorative elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl dark:bg-primary/10"></div>
        <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-primary-foreground/5 rounded-full blur-3xl dark:bg-primary-foreground/10"></div>
      </div>

      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="inline-flex items-center rounded-full border border-border/40 bg-background/80 backdrop-blur-sm px-3 py-1 text-sm font-medium text-muted-foreground">
            <span className="flex h-2 w-2 rounded-full bg-primary mr-2"></span>
            Powerful Features
          </div>

          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Key Features</h2>
            <p className="max-w-[900px] text-muted-foreground dark:text-foreground/70 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Discover the powerful tools that make Geogit Intelli the ultimate platform for geospatial data
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
          {features.map((feature) => (
            <Card
              key={feature.id}
              className={`relative overflow-hidden transition-all duration-300 ${
                hoveredCard === feature.id ? "shadow-lg shadow-primary/20 scale-[1.02]" : "shadow-md"
              }`}
              onMouseEnter={() => setHoveredCard(feature.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Gradient border effect on hover */}
              {hoveredCard === feature.id && (
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary to-primary-foreground opacity-20 blur-sm -z-10"></div>
              )}

              <CardHeader>
                <div
                  className={`flex justify-center mb-4 transition-transform duration-300 ${
                    hoveredCard === feature.id ? "scale-110" : ""
                  }`}
                >
                  <div className="relative">
                    <div
                      className={`absolute inset-0 rounded-full bg-primary/20 blur-sm transition-opacity duration-300 ${
                        hoveredCard === feature.id ? "opacity-100" : "opacity-0"
                      }`}
                    ></div>
                    <div className="relative z-10 text-primary">{feature.icon}</div>
                  </div>
                </div>
                <CardTitle className="text-xl text-center">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-muted-foreground dark:text-foreground/80">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex justify-center mt-16">
          <Button
            size="lg"
            className="bg-gradient-to-r from-primary to-primary-foreground hover:opacity-90 transition-opacity dark:text-background font-medium"
          >
            Try It Now
          </Button>
        </div>
      </div>
    </section>
  )
}

