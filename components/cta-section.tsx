import { Button } from "@/components/ui/button"

export function CtaSection() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 text-center text-white" style={{ backgroundImage: "url('/image copy.png')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 leading-tight">
            Start your 7-day free trial
          </h2>
          <p className="text-base sm:text-lg mb-6 sm:mb-8 opacity-90 leading-relaxed">
            Join over 4,000+ academicians already growing with Overleaf
          </p>
          <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 rounded-full px-6 sm:px-8 text-sm sm:text-base">
            Start Writing Your Thesis
          </Button>
        </div>
      </div>
    </section>
  )
}
