"use client"

import { Star, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function TestimonialSection() {
  return (
    <section className="py-12 sm:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 shadow-lg">
          <div className="flex gap-1 mb-4 sm:mb-6 justify-center">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
 
          <blockquote className="text-xl sm:text-2xl md:text-3xl font-medium text-center mb-6 sm:mb-8 text-balance leading-tight">
            We've really sped up our workflow using Untitled and haven't looked back.
          </blockquote>

          <div className="flex items-center justify-center gap-3 sm:gap-4 mb-4 sm:mb-6">

            <img src="/testimonial-section.png" alt="Testimonial" className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-200" />
            <div className="text-left">
              <div className="font-semibold text-sm sm:text-base">Rana Abbas</div>
              <div className="text-xs sm:text-sm text-muted-foreground">Student</div>
            </div>
          </div>

          <div className="flex justify-center gap-2">
            <Button variant="outline" size="icon" className="rounded-full bg-transparent w-8 h-8 sm:w-10 sm:h-10">
              <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4" />
            </Button>
            <Button variant="outline" size="icon" className="rounded-full bg-transparent w-8 h-8 sm:w-10 sm:h-10">
              <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
