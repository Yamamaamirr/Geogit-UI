import { Link } from "react-router-dom"; // ✅ Correct for React Router
import { ArrowRight, GitBranch, Map, Database,Loader } from "lucide-react"
import { Button } from "./ui/button"
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // React Router navigation

export default function HeroSection() {

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    setLoading(true);
    setTimeout(() => {
      navigate("/repos"); // Navigate after 1.5s
    }, 1500);
  };


  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 overflow-hidden relative">
      {/* Background decorative elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary-foreground/10 rounded-full blur-3xl"></div>

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(120,120,120,0.05)_1px,transparent_1px),linear-gradient(to_right,rgba(120,120,120,0.05)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
      </div>

      <div className="container px-4 md:px-6 relative">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-8">
           

            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-7xl/none">
                <span className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-foreground dark:from-primary dark:to-foreground dark:text-foreground">
                  Geogit Intelli
                </span>
              </h1>
              <p className="text-xl font-medium text-foreground">
                Visualize, Analyze, and Version Control Geospatial Data with Ease
              </p>
              <p className="max-w-[600px] text-muted-foreground dark:text-foreground/80 md:text-lg">
  A powerful platform for uploading, visualizing, and analyzing geospatial data with a Git-like version
  control system.
</p>

            </div>

            <div className="flex flex-col gap-3 min-[400px]:flex-row">
            <div className="relative">
  {/* Fullscreen Loader */}
  {loading && (
    <div className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-md z-50">
      <Loader className="h-8 w-8 text-[#0c94d4] animate-spin" /> {/* ✅ Same size as other spinner */}
    </div>
  )}

  {/* Main Content */}
  <Button
    size="lg"
    className="bg-gradient-to-r from-primary to-primary-foreground hover:opacity-90 transition-opacity group dark:text-background font-medium"
    onClick={handleClick}
    disabled={loading} // Disable button while loading
  >
    Get Started
    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
  </Button>
</div>
              <Button
                variant="outline"
                size="lg"
                className="border-primary/20 hover:border-primary transition-colors dark:border-primary/40 dark:text-foreground"
                asChild
              >
                <Link href="#about">Learn More</Link>
              </Button>
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                  <Map className="h-4 w-4 text-primary" />
                </div>
                <span className="text-sm text-foreground">Interactive Maps</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                  <GitBranch className="h-4 w-4 text-primary" />
                </div>
                <span className="text-sm text-foreground">Version Control</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                  <Database className="h-4 w-4 text-primary" />
                </div>
                <span className="text-sm text-foreground">Data Analysis</span>
              </div>
            </div>
          </div>

          <div className="relative lg:mt-0 mt-8">
            <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-primary to-primary-foreground opacity-30 blur-sm"></div>
            <div className="relative rounded-2xl overflow-hidden border border-border/40 bg-background/50 backdrop-blur-sm shadow-xl">
              <div className="absolute top-0 w-full h-10 bg-muted/50 flex items-center px-4 gap-2">
                <div className="h-3 w-3 rounded-full bg-red-500"></div>
                <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                <div className="h-3 w-3 rounded-full bg-green-500"></div>
              </div>
              <div className="pt-10">
                <img
                  alt="Geogit Intelli Platform Interface"
                  className="relative rounded-xl w-full aspect-[4/3] object-cover object-center"
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-BTu5s87Qq0w3PKgdWh6rdWTJaQhnoU.png"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

