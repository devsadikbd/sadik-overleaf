import { Button } from "@/components/ui/button"
import { FileText, Package, Zap, ShoppingBag } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-purple-50 via-pink-50 to-purple-50 py-20">
      {/* Decorative icons */}
      <div className="absolute top-20 left-10 w-16 h-16 rounded-2xl bg-purple-200/50 flex items-center justify-center rotate-12">
        <FileText className="w-8 h-8 text-purple-600" />
      </div>
      <div className="absolute top-32 right-16 w-16 h-16 rounded-2xl bg-purple-200/50 flex items-center justify-center -rotate-12">
        <Package className="w-8 h-8 text-purple-600" />
      </div>
      <div className="absolute bottom-32 left-20 w-14 h-14 rounded-2xl bg-pink-200/50 flex items-center justify-center rotate-6">
        <Zap className="w-7 h-7 text-pink-600" />
      </div>
      <div className="absolute top-40 right-32 w-14 h-14 rounded-2xl bg-purple-200/50 flex items-center justify-center -rotate-6">
        <ShoppingBag className="w-7 h-7 text-purple-600" />
      </div>

      <div className="container relative z-10">
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-1.5 rounded-full border-2 border-purple-600 text-purple-600 text-sm font-medium mb-6">
            HOW IT WORKS
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance">
            Streamline Your <span className="text-purple-600">Thesis Journey</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            From Drafting to delivery, we make writing and printing your thesis seamless and stress-free
          </p>
        </div>

        <div className="flex justify-center mb-12">
          <Button size="lg" className="bg-purple-600 text-white hover:bg-purple-700 rounded-full px-8">
            Start Writing Your Thesis
          </Button>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="rounded-2xl overflow-hidden shadow-2xl border-8 border-gray-900 bg-white">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%20from%202025-10-01%2020-04-58-jZlJ4PDvzF5Dh4dfUQGCGu4QFRbO9m.png"
              alt="Dashboard Preview"
              className="w-full"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
