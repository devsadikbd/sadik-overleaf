export function HowItWorksSection() {
  return (
    <section className="py-12 sm:py-16 lg:py-24 xl:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 max-w-7xl">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16 xl:mb-20">
          <div className="inline-block px-3 sm:px-4 py-1.5 rounded-full border-2 border-purple-600 text-purple-600 text-xs sm:text-sm lg:text-base font-medium mb-3 sm:mb-4">
            HOW IT WORKS
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold mb-3 sm:mb-4 lg:mb-6 text-balance leading-tight px-2 sm:px-0">
            Seamless Document Creation and Delivery
          </h2>
          <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
            Discover the Simple Steps to Create, Print, and Have Your Documents Delivered Right to Your Door.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 xl:gap-10 px-4 sm:px-0">
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
