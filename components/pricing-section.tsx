import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"

export function PricingSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-purple-50 via-pink-50 to-purple-50">
      <div className="container">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1.5 rounded-full border-2 border-purple-600 text-purple-600 text-sm font-medium mb-4">
            PRICING
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Accessible for All</h2>
          <p className="text-lg text-muted-foreground">Get Started Free, Upgrade Anytime</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Basic Plan */}
          <div className="bg-white rounded-3xl p-8 shadow-lg">
            <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center mb-6">
              <svg
                className="w-6 h-6 text-purple-600"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Basic plan</h3>
            <div className="mb-6">
              <span className="text-5xl font-bold">$10</span>
              <span className="text-muted-foreground">/mth</span>
            </div>
            <p className="text-sm text-muted-foreground mb-6">Billed annually.</p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm">Access to all basic features</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm">Basic reporting and analytics</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm">Up to 10 individual users</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm">20GB individual data user</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm">Basic chat and email support</span>
              </li>
            </ul>
            <Button className="w-full bg-purple-600 text-white hover:bg-purple-700 rounded-full">
              Start Writing Your Thesis
            </Button>
          </div>

          {/* Business Plan */}
          <div className="bg-gradient-to-br from-purple-400 to-pink-400 rounded-3xl p-8 shadow-lg text-white">
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mb-6">
              <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Business plan</h3>
            <div className="mb-6">
              <span className="text-5xl font-bold">$20</span>
              <span className="opacity-90">/mth</span>
            </div>
            <p className="text-sm opacity-90 mb-6">Billed annually.</p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span className="text-sm">200+ integrations</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span className="text-sm">Advanced reporting</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span className="text-sm">Up to 20 individual users</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span className="text-sm">40GB individual data user</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span className="text-sm">Priority chat and em support</span>
              </li>
            </ul>
            <Button className="w-full bg-white text-purple-600 hover:bg-gray-100 rounded-full">
              Start Writing Your Thesis
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
