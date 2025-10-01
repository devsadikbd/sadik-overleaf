"use client"

import { Star, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function TestimonialSection() {
  return (
    <section className="py-20 bg-purple-50">
      <div className="container max-w-4xl">
        <div className="bg-white rounded-3xl p-12 shadow-lg">
          <div className="flex gap-1 mb-6 justify-center">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            ))}
          </div>

          <blockquote className="text-2xl md:text-3xl font-medium text-center mb-8 text-balance">
            We've really sped up our workflow using Untitled and haven't looked back.
          </blockquote>

          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-full bg-gray-200" />
            <div className="text-left">
              <div className="font-semibold">Rana Abbas</div>
              <div className="text-sm text-muted-foreground">Student</div>
            </div>
          </div>

          <div className="flex justify-center gap-2">
            <Button variant="outline" size="icon" className="rounded-full bg-transparent">
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="icon" className="rounded-full bg-transparent">
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
