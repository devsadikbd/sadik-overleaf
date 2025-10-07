import { Button } from "@/components/ui/button"
import { FileText, Package, Zap, ShoppingBag } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative py-16 sm:py-24 lg:py-32 bg-[#F7F7FB]">
      {/* Decorative icons - Hidden on mobile and tablet for cleaner look */}
      <div className="absolute inset-0 pointer-events-none hidden lg:block overflow-hidden">
      <img
        src="/hero-section1.png"
        alt="Decorative Background"
        className="w-full h-full object-cover object-center"
        style={{ objectPosition: 'center top' }}
      />
      
      </div>
     
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 relative z-10 max-w-7xl">
        <div className="text-center mt-[30px] sm:mb-12 lg:mb-16">
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 lg:mb-8 text-balance leading-tight">
            Streamline Your <span className="text-purple-600"><br />Thesis Journey</span>
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto text-pretty leading-relaxed">
            From Drafting to delivery, we make writing and printing your thesis seamless and stress-free
          </p>
        </div>

        <div className="flex justify-center mb-8 sm:mb-12 lg:mb-16">
          <Button size="lg" className="bg-purple-600 text-white hover:bg-purple-700 rounded-full px-6 sm:px-8 lg:px-10 text-sm sm:text-base lg:text-lg h-12 lg:h-14">
            Start Writing Your Thesis
          </Button>
        </div>
      
        
      </div>
      <div className="max-w-7xl mx-auto mb-[-100px] sm:mb-[-200px] md:mb-[-350px] mt-[20px] sm:mt-[30px] relative pointer-events-none px-4 sm:px-6 lg:px-8">
          
            <img
              src="/hero-section.png"
              alt="Dashboard Preview"
              className="w-full h-auto"
            />
            
        </div>
    </section>
   
  )
}