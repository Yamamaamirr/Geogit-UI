import { Link } from "react-router-dom"; // ✅ Correct for React Router
import { ArrowRight, CheckCircle } from "lucide-react"
import { Button } from "./ui/button"

export default function AboutSection() {
  const benefits = [
    "Intuitive interface for geospatial data management",
    "Powerful version control for collaborative projects",
    "AI-powered analysis to extract insights from your data",
    "Seamless integration with existing GIS workflows",
    "Secure cloud storage with robust backup options",
  ]

  return (
    <section id="about" className="w-full py-12 md:py-24 lg:py-32 relative">
      {/* Background decorative elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 right-1/3 w-96 h-96 bg-primary/5 rounded-full blur-3xl dark:bg-primary/10"></div>
        <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-primary-foreground/5 rounded-full blur-3xl dark:bg-primary-foreground/10"></div>
      </div>

      <div className="container px-4 md:px-6">
        <div className="grid gap-10 sm:px-10 md:gap-16 md:grid-cols-2">
          <div className="space-y-6">
            <div className="inline-flex items-center rounded-full border border-border/40 bg-background/80 backdrop-blur-sm px-3 py-1 text-sm font-medium text-muted-foreground">
              <span className="flex h-2 w-2 rounded-full bg-primary mr-2"></span>
              Our Mission
            </div>

            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">About Geogit Intelli</h2>

            <p className="text-muted-foreground dark:text-foreground/80 md:text-xl">
              Geogit Intelli was born from the need to make geospatial data more accessible, manageable, and insightful.
              Our platform combines powerful visualization tools with version control and AI-powered analysis.
            </p>

            <p className="text-muted-foreground dark:text-foreground/80 md:text-xl">
              Whether you're a researcher, urban planner, environmental scientist, or business analyst, Geogit Intelli
              provides the tools you need to unlock the full potential of your geospatial data.
            </p>

            <ul className="space-y-3 pt-4">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">{benefit}</span>
                </li>
              ))}
            </ul>

            <Button
              size="lg"
              className="bg-gradient-to-r from-primary to-primary-foreground hover:opacity-90 transition-opacity group mt-4 dark:text-background font-medium"
              asChild
            >
              <Link href="#features">
                Learn More
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>

          <div className="flex flex-col items-start space-y-6">
            <div className="relative w-full">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary to-primary-foreground opacity-30 blur-sm"></div>
              <img
                alt="Geogit Intelli Map Interface"
                className="relative rounded-xl w-full aspect-video object-cover object-center"
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-BTu5s87Qq0w3PKgdWh6rdWTJaQhnoU.png"
              />
            </div>

            <div className="space-y-4 bg-muted/50 dark:bg-muted/20 backdrop-blur-sm rounded-xl p-6 border border-border/40 w-full">
              <h3 className="text-xl font-bold">Our Vision</h3>
              <p className="text-muted-foreground dark:text-foreground/80">
                To democratize geospatial data analysis by providing powerful tools that are accessible to everyone,
                from GIS professionals to those new to spatial analysis.
              </p>

              <div className="pt-4 grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">500+</div>
                  <div className="text-sm text-muted-foreground dark:text-foreground/80">Active Users</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">50+</div>
                  <div className="text-sm text-muted-foreground dark:text-foreground/80">Countries</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">10TB+</div>
                  <div className="text-sm text-muted-foreground dark:text-foreground/80">Data Analyzed</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">24/7</div>
                  <div className="text-sm text-muted-foreground dark:text-foreground/80">Support</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

