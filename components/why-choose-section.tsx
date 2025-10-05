import { FileText, Lightbulb, Printer } from "lucide-react"
import { Button } from "@/components/ui/button"

export function WhyChooseSection() {
  return (
    <section className="py-12 md:py-16 lg:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-block px-3 sm:px-4 py-1.5 rounded-full border-2 border-purple-600 text-purple-600 text-xs sm:text-sm font-medium mb-3 sm:mb-4">
            WHY CHOOSE US
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 leading-tight">
            Create Stunning Documents Effortlessly
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Overleaf makes it easy to format complex idea no LaTeX knowledge required.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-6 lg:gap-8 max-w-6xl mx-auto">
          {/* Visual or Code Editor */}
          <div className="bg-purple-50 rounded-2xl sm:rounded-3xl p-6 sm:p-8">
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-purple-200 flex items-center justify-center mb-4 sm:mb-6">
              <FileText className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">Visual or Code Editor</h3>
            <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6 leading-relaxed">
              Start your document with our easy-to-use editor. Customize it with templates, styles and formats that
              suits your needs.
            </p>
            <Button className="bg-purple-600 text-white hover:bg-purple-700 rounded-full w-full text-sm sm:text-base">
              Start Writing Your Thesis
            </Button>
          </div>

          {/* Learn by doing */}
          <div className="bg-purple-50 rounded-2xl sm:rounded-3xl p-6 sm:p-8">
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-purple-200 flex items-center justify-center mb-4 sm:mb-6">
              <Lightbulb className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">Learn by doing</h3>
            <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6 leading-relaxed">
              Start with our sample project to quickly get familiar with how LaTeX works and understand its features.
            </p>
            <Button className="bg-purple-600 text-white hover:bg-purple-700 rounded-full w-full text-sm sm:text-base">
              Start Writing Your Thesis
            </Button>
          </div>

          {/* Print and Deliver */}
          <div className="bg-purple-50 rounded-2xl sm:rounded-3xl p-6 sm:p-8">
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-purple-200 flex items-center justify-center mb-4 sm:mb-6">
              <Printer className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">Print and Deliver</h3>
            <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6 leading-relaxed">
              We handle the printing and packaging with care. Your document is delivered to your doorstep promptly.
            </p>
            <Button className="bg-purple-600 text-white hover:bg-purple-700 rounded-full w-full text-sm sm:text-base">
              Start Writing Your Thesis
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
