import { BookOpen, CheckCircle2 } from "lucide-react"

export function UseCasesSection() {
  return (
    <section className="container py-16 md:py-24">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-red-100 text-red-600">
            <BookOpen className="w-6 h-6" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold">
            Use the right tool for <span className="italic">your</span> job
          </h2>
          <p className="text-muted-foreground">Purpose-built for scientific and technical writing. Powered by LaTeX.</p>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <span>Beautiful formatting</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <span>Clever bibliographies and citations</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <span>Better formulas, figures, and tables</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <span>Built-in templates</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <span>Advanced reference search</span>
                <span className="text-sm text-muted-foreground ml-2 px-2 py-0.5 bg-orange-100 text-orange-700 rounded">
                  Premium
                </span>
              </div>
            </li>
          </ul>
          <a href="#" className="inline-flex items-center text-primary hover:underline font-medium">
            Discover LaTeX →
          </a>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-4">
            <div className="rounded-lg overflow-hidden shadow-lg border bg-background p-4">
              <div className="text-sm font-mono mb-2">Computational Techniques in Astronomy</div>
              <img src="/academic-paper-with-mathematical-formulas.jpg" alt="Academic Paper" className="w-full rounded" />
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg border bg-background p-4">
              <div className="text-sm font-mono mb-2 bg-orange-100 text-orange-800 px-2 py-1 inline-block">
                Image Analysis of Galactic Structures
              </div>
              <img src="/galaxy-image-analysis-document.jpg" alt="Research Document" className="w-full rounded mt-2" />
            </div>
          </div>
          <div className="pt-8">
            <div className="rounded-lg overflow-hidden shadow-lg border bg-background">
              <img src="/latex-code-editor-with-syntax-highlighting.jpg" alt="Code Editor" className="w-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
