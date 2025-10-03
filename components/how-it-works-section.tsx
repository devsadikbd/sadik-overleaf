export function HowItWorksSection() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 ">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-block px-3 sm:px-4 py-1.5 rounded-full border-2 border-purple-600 text-purple-600 text-xs sm:text-sm font-medium mb-3 sm:mb-4">
            HOW IT WORKS
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 text-balance leading-tight">
            Seamless Document Creation and Delivery
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Discover the Simple Steps to Create, Print, and Have Your Documents Delivered Right to Your Door.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {/* Step 01 */}
          <div className="bg-purple-50 rounded-2xl sm:rounded-3xl p-6 sm:p-8">
            <div className="text-xs sm:text-sm font-medium text-purple-600 mb-2 sm:mb-3">01</div>
            <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3">Create Your Document</h3>
            <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6 leading-relaxed">
              Start your document with our easy-to-use editor. Customize it with templates, styles and formats that
              suits your needs.
            </p>
            <div >
              <img
                src="/how-it-works1.png"
                alt="Create Document"
                className="w-full h-auto"
              />
            </div>
          </div>

          {/* Step 02 */}
          <div className="bg-purple-50 rounded-2xl sm:rounded-3xl p-6 sm:p-8">
            <div className="text-xs sm:text-sm font-medium mb-2 sm:mb-3">02</div>
            <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3">Review and Finalize</h3>
            <p className="mb-4 sm:mb-6 opacity-90 text-sm sm:text-base leading-relaxed">
              Preview your document in real-time. Make any adjustments to ensure it's perfect.
            </p>
            <div className="rounded-xl sm:rounded-2xl overflow-hidden">
              <img
                src="/how-it-works2.png"
                alt="Review Document"
                className="w-full h-auto"
              />
            </div>
          </div>

          {/* Step 03 */}
          <div className="bg-purple-50 rounded-2xl sm:rounded-3xl p-6 sm:p-8">
            <div className="text-xs sm:text-sm font-medium mb-2 sm:mb-3">03</div>
            <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3">Place Your Order</h3>
            <p className="mb-4 sm:mb-6 opacity-90 text-sm sm:text-base leading-relaxed">
              Press the 'Print & Deliver' button to place an order. Choose paper quality, binding options and provide
              your delivery address
            </p>
            <div className="rounded-xl sm:rounded-2xl overflow-hidden">
              <img
                src="/how-it-works3.png"
                alt="Place Order"
                className="w-full h-auto"
              />
            </div>
          </div>

          {/* Step 04 */}
          <div className="bg-purple-50 rounded-2xl sm:rounded-3xl p-6 sm:p-8">
            <div className="text-xs sm:text-sm font-medium mb-2 sm:mb-3">04</div>
            <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3">Print and Deliver</h3>
            <p className="mb-4 sm:mb-6 opacity-90 text-sm sm:text-base leading-relaxed">
              We handle the printing and packaging with care. Your document is delivered to your doorstep promptly.
            </p>
            <div className="rounded-xl sm:rounded-2xl overflow-hidden">
              <img
                src="/how-it-works4.png"
                alt="Print and Deliver"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
