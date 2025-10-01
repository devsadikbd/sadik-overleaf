import { FileText, Lightbulb, Printer } from "lucide-react"
import { Button } from "@/components/ui/button"

export function WhyChooseSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1.5 rounded-full border-2 border-purple-600 text-purple-600 text-sm font-medium mb-4">
            WHY CHOOSE US
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Create Stunning Documents Effortlessly</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Overleaf makes it easy to format complex idea no LaTeX knowledge required.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Visual or Code Editor */}
          <div className="bg-purple-50 rounded-3xl p-8">
            <div className="w-16 h-16 rounded-2xl bg-purple-200 flex items-center justify-center mb-6">
              <FileText className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold mb-3">Visual or Code Editor</h3>
            <p className="text-muted-foreground mb-6">
              Start your document with our easy-to-use editor. Customize it with templates, styles and formats that
              suits your needs.
            </p>
            <Button className="bg-purple-600 text-white hover:bg-purple-700 rounded-full w-full">
              Start Writing Your Thesis
            </Button>
          </div>

          {/* Learn by doing */}
          <div className="bg-purple-50 rounded-3xl p-8">
            <div className="w-16 h-16 rounded-2xl bg-purple-200 flex items-center justify-center mb-6">
              <Lightbulb className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold mb-3">Learn by doing</h3>
            <p className="text-muted-foreground mb-6">
              Start with our sample project to quickly get familiar with how LaTeX works and understand its features.
            </p>
            <Button className="bg-purple-600 text-white hover:bg-purple-700 rounded-full w-full">
              Start Writing Your Thesis
            </Button>
          </div>

          {/* Print and Deliver */}
          <div className="bg-purple-50 rounded-3xl p-8">
            <div className="w-16 h-16 rounded-2xl bg-purple-200 flex items-center justify-center mb-6">
              <Printer className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold mb-3">Print and Deliver</h3>
            <p className="text-muted-foreground mb-6">
              We handle the printing and packaging with care. Your document is delivered to your doorstep promptly.
            </p>
            <Button className="bg-purple-600 text-white hover:bg-purple-700 rounded-full w-full">
              Start Writing Your Thesis
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
