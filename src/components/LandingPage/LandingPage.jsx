import { ThemeProvider } from "./components/theme-provider"
import Footer from "./components/footer"
import AboutSection from "./components/about-section"
import GlobePlaceholder from "./components/globe-placeholder"
import FeaturesSection from "./components/features-section"
import HeroSection from "./components/hero-section"
import Header from "./components/header"
import "./LP.css"; // ✅ Import global styles


export default function LandingPage() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="geogig-intelli-theme">
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-background/80 dark:from-background dark:to-background/95">
        <Header />
        <main className="flex-1">
          <HeroSection />
          <FeaturesSection />
          <GlobePlaceholder />
          <AboutSection />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  )
}

