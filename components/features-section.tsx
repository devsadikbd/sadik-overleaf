import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"

export function FeaturesSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-purple-50 via-white to-purple-50">
      <div className="container">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1.5 rounded-full border-2 border-purple-600 text-purple-600 text-sm font-medium mb-4">
            FEATURES
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">A Platform for Scientific and Technical Writing</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Effortlessly create and format complex documents, collaborate in real-time, and have your work delivered to
            your door
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto mb-20">
          {/* Quick Start */}
          <div>
            <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center mb-6">
              <svg
                className="w-6 h-6 text-purple-600"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-4">Quick Start</h3>
            <p className="text-muted-foreground mb-6">No downloads and no prior knowledge of LaTeX required.</p>
            <div className="space-y-3 mb-6">
              <div className="flex items-start gap-2">
                <Check className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm">Seamless Visual and Code Editing</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm">Access Thousand of Free Templates</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm">Comprehensive LaTeX Tutorials and Guidance</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm">Export Support from Real-Life TeXperts</span>
              </div>
            </div>
            <Button className="bg-purple-600 text-white hover:bg-purple-700 rounded-full">
              Start Writing Your Thesis
            </Button>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-purple-100 rounded-full" />
            <div className="relative bg-white rounded-2xl shadow-xl p-6">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%20from%202025-10-01%2020-05-14-Ysgko5K3LXJXoSrsIoOIihQfaDqbXX.png"
                alt="Quick Start Features"
                className="w-full rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Collaboration */}
        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto items-center">
          <div className="relative">
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-pink-100 rounded-full" />
            <div className="relative bg-white rounded-2xl shadow-xl p-6">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%20from%202025-10-01%2020-05-14-Ysgko5K3LXJXoSrsIoOIihQfaDqbXX.png"
                alt="Collaboration Features"
                className="w-full rounded-lg"
              />
            </div>
          </div>

          <div>
            <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-6">
              <svg
                className="w-6 h-6 text-purple-600"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-4">Create your best work together</h3>
            <p className="text-muted-foreground mb-6">Skip the email chains and streamline your workflow</p>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-start gap-2">
                <Check className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm">Work from any device, anywhere</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm">Edit and comment togethern real-time</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm">Share your documents effortlessly</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm">Access project history and versions</span>
              </div>
            </div>
            <Button className="bg-purple-600 text-white hover:bg-purple-700 rounded-full mt-6">
              Start Writing Your Thesis
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
