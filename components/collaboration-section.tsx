import { Users } from "lucide-react"

export function CollaborationSection() {
  return (
    <section className="bg-muted/30 py-16 md:py-24">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative rounded-lg overflow-hidden shadow-xl border bg-background">
            <img src="/collaborative-editing-interface-with-comments-and-.jpg" alt="Collaboration Features" className="w-full" />
          </div>

          <div className="space-y-6">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-purple-100 text-purple-600">
              <Users className="w-6 h-6" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold">Write your best work, together</h2>
            <p className="text-muted-foreground">Say goodbye to endless rounds of email feedback.</p>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5 flex-shrink-0">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                </div>
                <div>
                  <strong className="block">Access from anywhere, on any device</strong>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5 flex-shrink-0">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                </div>
                <div>
                  <strong className="block">Document sharing</strong>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5 flex-shrink-0">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                </div>
                <div>
                  <strong className="block">Simultaneous editing and commenting</strong>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5 flex-shrink-0">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                </div>
                <div>
                  <strong className="block">Real-time track changes</strong>
                  <span className="text-sm text-muted-foreground ml-2 px-2 py-0.5 bg-orange-100 text-orange-700 rounded">
                    Premium
                  </span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5 flex-shrink-0">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                </div>
                <div>
                  <strong className="block">Project history and version control</strong>
                  <span className="text-sm text-muted-foreground ml-2 px-2 py-0.5 bg-orange-100 text-orange-700 rounded">
                    Premium
                  </span>
                </div>
              </li>
            </ul>
            <a href="#" className="inline-flex items-center text-primary hover:underline font-medium">
              Explore features →
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
