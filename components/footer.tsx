import Link from "next/link"
import { Twitter, Linkedin, Facebook, Github } from "lucide-react"
import { OverleafWordmark } from "@/components/overleaf-logo"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8 sm:py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 sm:gap-8 mb-6 sm:mb-8">
          <div>
            <div className="mb-3">
              <OverleafWordmark variant="white" />
            </div>
            <p className="text-sm text-gray-400 max-w-xs leading-relaxed">
              The collaborative LaTeX editor for scientific writing.
            </p>
          </div>

          <nav className="flex flex-wrap gap-4 sm:gap-8">
            <Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
              Features
            </Link>
            <Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
              Pricing
            </Link>
            <Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
              How it Works
            </Link>
            <Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
              Why Choose Us
            </Link>
          </nav>
        </div>

        <div className="border-t border-gray-800 pt-6 sm:pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-400">© 2077 Overleaf. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">
              <Twitter className="w-5 h-5"/>
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">
              <Linkedin className="w-5 h-5" />
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">
              <Facebook className="w-5 h-5" />
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">
              <Github className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
