import { Button } from "@/components/ui/button"

export function CtaSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-purple-600 to-purple-500 rounded-3xl p-12 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Start your 7-day free trial</h2>
          <p className="text-lg mb-8 opacity-90">Join over 4,000+ academicians already growing with Overleaf</p>
          <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 rounded-full px-8">
            Start Writing Your Thesis
          </Button>
        </div>
      </div>
    </section>
  )
}
