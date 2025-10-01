import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ToolsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          <div>
            <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center mb-6">
              <svg
                className="w-6 h-6 text-purple-600"
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Choose the right tool</h2>
            <p className="text-muted-foreground mb-6">
              Equip yourself with the best tools for scientific and technical writing, powered by LaTeX.
            </p>
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="flex items-start gap-2">
                <Check className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm">Flawless and perfect formatting</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm">Smart citations and bibliographies</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm">Enhanced formulas figures, tables</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm">Ready-to-use and production-ready template</span>
              </div>
            </div>
            <Button className="bg-purple-600 text-white hover:bg-purple-700 rounded-full">
              Start Writing Your Thesis
            </Button>
          </div>

          <div className="bg-purple-50 rounded-2xl p-8">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%20from%202025-10-01%2020-05-31-QqosSTD3uYEg5hZ5PIwB8fPw5Xn0YI.png"
              alt="LaTeX Editor"
              className="w-full rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
