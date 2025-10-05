import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"

export function PricingSection() {
  return (
    <section className="py-12 sm:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <div className="inline-block px-3 sm:px-4 py-1.5 rounded-full border-2 border-purple-600 text-purple-600 text-xs sm:text-sm font-medium mb-3 sm:mb-4">
            PRICING
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 sm:mb-4 leading-tight px-2 sm:px-0">
            Accessible for All
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground px-4 sm:px-0">Get Started Free, Upgrade Anytime</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 max-w-4xl mx-auto px-4 sm:px-0">
          {/* Basic Plan */}
          <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-purple-100 flex items-center justify-center mb-4 sm:mb-6">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0 24C0 10.7452 10.7452 0 24 0C37.2548 0 48 10.7452 48 24C48 37.2548 37.2548 48 24 48C10.7452 48 0 37.2548 0 24Z" fill="#EEEBFF"/>
<path d="M25.0001 14L16.0936 24.6879C15.7448 25.1064 15.5703 25.3157 15.5677 25.4925C15.5654 25.6461 15.6338 25.7923 15.7534 25.8889C15.8909 26 16.1633 26 16.7081 26H24.0001L23.0001 34L31.9067 23.3121C32.2555 22.8936 32.4299 22.6843 32.4325 22.5075C32.4348 22.3539 32.3664 22.2077 32.2468 22.1111C32.1094 22 31.8369 22 31.2921 22H24.0001L25.0001 14Z" stroke="#6F47AE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

            </div>
            <h3 className="text-lg sm:text-xl font-bold mb-2">Basic plan</h3>
            <div className="mb-4 sm:mb-6">
              <span className="text-3xl sm:text-4xl lg:text-5xl font-bold">$10</span>
              <span className="text-muted-foreground text-sm sm:text-base">/mth</span>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground mb-4 sm:mb-6">Billed annually.</p>
            <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                <span className="text-xs sm:text-sm">Access to all basic features</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                <span className="text-xs sm:text-sm">Basic reporting and analytics</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                <span className="text-xs sm:text-sm">Up to 10 individual users</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                <span className="text-xs sm:text-sm">20GB individual data user</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                <span className="text-xs sm:text-sm">Basic chat and email support</span>
              </li>
            </ul>
            <Button className="w-full bg-purple-600 text-white hover:bg-purple-700 rounded-full text-sm sm:text-base">
              Start Writing Your Thesis
            </Button>
          </div>

          {/* Business Plan */}
            <div className="bg-gradient-to-br rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg text-black" style={{ backgroundImage: "url('/image.png')", backgroundSize: '150%', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white/20 flex items-center justify-center mb-4 sm:mb-6">
             <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0 24C0 10.7452 10.7452 0 24 0C37.2548 0 48 10.7452 48 24C48 37.2548 37.2548 48 24 48C10.7452 48 0 37.2548 0 24Z" fill="#EEEBFF"/>
<path d="M14 26.5001L23.6422 31.3212C23.7734 31.3868 23.839 31.4196 23.9078 31.4325C23.9687 31.4439 24.0313 31.4439 24.0922 31.4325C24.161 31.4196 24.2266 31.3868 24.3578 31.3212L34 26.5001M14 21.5001L23.6422 16.679C23.7734 16.6134 23.839 16.5806 23.9078 16.5677C23.9687 16.5562 24.0313 16.5562 24.0922 16.5677C24.161 16.5806 24.2266 16.6134 24.3578 16.679L34 21.5001L24.3578 26.3212C24.2266 26.3868 24.161 26.4196 24.0922 26.4325C24.0313 26.4439 23.9687 26.4439 23.9078 26.4325C23.839 26.4196 23.7734 26.3868 23.6422 26.3212L14 21.5001Z" stroke="#6F47AE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

            </div>
            <h3 className="text-lg sm:text-xl font-bold mb-2">Business plan</h3>
            <div className="mb-4 sm:mb-6">
              <span className="text-3xl sm:text-4xl lg:text-5xl font-bold">$20</span>
              <span className="opacity-90 text-sm sm:text-base">/mth</span>
            </div>
            <p className="text-xs sm:text-sm opacity-90 mb-4 sm:mb-6">Billed annually.</p>
            <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm">200+ integrations</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm">Advanced reporting</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm">Up to 20 individual users</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm">40GB individual data user</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm">Priority chat and email support</span>
              </li>
            </ul>
            <Button className="w-full bg-white text-purple-600 hover:bg-gray-100 rounded-full text-sm sm:text-base">
              Start Writing Your Thesis
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
