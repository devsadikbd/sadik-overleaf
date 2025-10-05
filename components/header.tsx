"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { useState } from "react"
import { OverleafWordmark } from "@/components/overleaf-logo"
import { ProductsDropdown } from "./products-dropdown"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="w-full bg-[#F7F7FB] sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-6 lg:gap-8">
            <Link href="/" className="flex items-center gap-2 flex-shrink-0">
              <OverleafWordmark />
            </Link>
            
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-6">
              <Link
                href="#"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Home
              </Link>
              <ProductsDropdown />
              <Link
                href="#"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Resources
              </Link>
              <Link
                href="#"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Pricing
              </Link>
            </nav>
          </div>
          
          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost" size="sm" className="px-4">
              Log in
            </Button>
            <Button size="sm" className="bg-purple-600 text-white hover:bg-purple-700 px-4">
              Sign up
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 -mr-2 touch-manipulation"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 bg-white shadow-lg">
            <nav className="py-4 space-y-1">
              <Link
                href="#"
                className="block px-4 py-3 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-gray-50 transition-colors rounded-md mx-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="#"
                className="block px-4 py-3 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-gray-50 transition-colors rounded-md mx-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Products
              </Link>
              <Link
                href="#"
                className="block px-4 py-3 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-gray-50 transition-colors rounded-md mx-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Resources
              </Link>
              <Link
                href="#"
                className="block px-4 py-3 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-gray-50 transition-colors rounded-md mx-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Pricing
              </Link>
              
              {/* Mobile Auth Buttons */}
              <div className="px-2 pt-4 border-t border-gray-200 mt-4 space-y-3">
                <Button 
                  variant="ghost" 
                  size="lg" 
                  className="w-full justify-center py-3 text-base font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Log in
                </Button>
                <Button 
                  size="lg" 
                  className="w-full bg-purple-600 text-white hover:bg-purple-700 justify-center py-3 text-base font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign up
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
