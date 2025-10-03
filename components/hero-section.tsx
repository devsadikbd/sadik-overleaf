import { Button } from "@/components/ui/button"
import { FileText, Package, Zap, ShoppingBag } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative py-16 sm:py-24 bg-gradient-to-br from-purple-50 ">
      {/* Decorative icons - Hidden on mobile for cleaner look */}
      <div className="absolute inset-0 pointer-events-none hidden md:block">
      <img
        src="/hero-section1.png"
        alt="Decorative Background"
        className="w-full h-full object-cover"
      />
      
      </div>
     
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-8 sm:mb-12">
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 text-balance leading-tight">
            Streamline Your <span className="text-purple-600"><br />Thesis Journey</span>
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed">
            From Drafting to delivery, we make writing and printing your thesis seamless and stress-free
          </p>
        </div>

        <div className="flex justify-center mb-8 sm:mb-12">
          <Button size="lg" className="bg-purple-600 text-white hover:bg-purple-700 rounded-full px-6 sm:px-8 text-sm sm:text-base">
            Start Writing Your Thesis
          </Button>
        </div>
      
        
      </div>
      <div className="max-w-5xl mx-auto mb-[-330px] mt-[50px] relative inset-0 pointer-events-none hidden md:block">
          
            <img
              src="/hero-section.png"
              alt="Dashboard Preview"
              className="w-full h-auto "
            />
            
        </div>
    </section>
   
  )
}
