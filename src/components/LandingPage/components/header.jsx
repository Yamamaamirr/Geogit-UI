"use client"

import { Link } from "react-router-dom"; // ✅ Correct for React Router
import { Globe, Menu, X } from "lucide-react"
import { useState } from "react"
import { Button } from "./ui/button"
import { ThemeToggle } from "./theme-toggle"

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-lg bg-background/80 border-b border-border/40">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 transition-transform hover:scale-105">
          <div className="relative">
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-primary to-primary-foreground opacity-70 blur-sm"></div>
            <Globe className="h-6 w-6 relative z-10 text-primary-foreground dark:text-background" />
          </div>
          <span className="text-gradient text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-foreground dark:from-primary dark:to-foreground dark:text-foreground">
            Geogit Intelli
          </span>
        </Link>

        <nav className="hidden md:flex gap-6">
          <Link
            href="#features"
            className="text-sm font-medium hover:text-primary transition-colors text-foreground/80 dark:text-foreground/80"
          >
            Features
          </Link>
          <Link
            href="#globe"
            className="text-sm font-medium hover:text-primary transition-colors text-foreground/80 dark:text-foreground/80"
          >
            Globe
          </Link>
          <Link
            href="#about"
            className="text-sm font-medium hover:text-primary transition-colors text-foreground/80 dark:text-foreground/80"
          >
            About
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <div className="hidden md:flex gap-4">
            <Button variant="outline" size="sm" className="hover:border-primary transition-colors dark:text-foreground">
              Log In
            </Button>
            <Button
              size="sm"
              className="bg-gradient-to-r from-primary to-primary-foreground hover:opacity-90 transition-opacity dark:text-background font-medium"
            >
              Get Started
            </Button>
          </div>

          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border/40 bg-background/95 backdrop-blur-lg">
          <div className="container px-4 py-4 flex flex-col gap-4">
            <Link
              href="#features"
              className="text-sm font-medium p-2 hover:bg-muted rounded-md transition-colors text-foreground/80 dark:text-foreground/80"
              onClick={() => setMobileMenuOpen(false)}
            >
              Features
            </Link>
            <Link
              href="#globe"
              className="text-sm font-medium p-2 hover:bg-muted rounded-md transition-colors text-foreground/80 dark:text-foreground/80"
              onClick={() => setMobileMenuOpen(false)}
            >
              Globe
            </Link>
            <Link
              href="#about"
              className="text-sm font-medium p-2 hover:bg-muted rounded-md transition-colors text-foreground/80 dark:text-foreground/80"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <div className="flex gap-2 mt-2">
              <Button variant="outline" size="sm" className="flex-1 dark:text-foreground">
                Log In
              </Button>
              <Button
                size="sm"
                className="flex-1 bg-gradient-to-r from-primary to-primary-foreground dark:text-background font-medium"
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

