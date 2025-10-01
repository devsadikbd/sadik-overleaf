import Link from "next/link"
import { Twitter, Linkedin, Facebook, Github } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-purple-400 flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              </div>
              <span className="font-serif text-xl font-semibold">Vergleaf</span>
            </div>
            <p className="text-sm text-gray-400 max-w-xs">Banking technology that has your back.</p>
          </div>

          <nav className="flex gap-8">
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

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-400">© 2077 Overleaf. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">
              <Twitter className="w-5 h-5" />
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
