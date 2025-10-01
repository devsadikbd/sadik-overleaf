import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="w-full border-b bg-white">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-purple-400 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </div>
            <span className="font-serif text-xl font-semibold text-foreground">overleafex</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="#"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Home
            </Link>
            <Link
              href="#"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Products
            </Link>
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
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm">
            Log in
          </Button>
          <Button size="sm" className="bg-purple-600 text-white hover:bg-purple-700">
            Sign up
          </Button>
        </div>
      </div>
    </header>
  )
}
