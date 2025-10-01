export function HowItWorksSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-purple-50 via-white to-purple-50">
      <div className="container">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1.5 rounded-full border-2 border-purple-600 text-purple-600 text-sm font-medium mb-4">
            HOW IT WORKS
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Seamless Document Creation and Delivery</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover the Simple Steps to Create, Print, and Have Your Documents Delivered Right to Your Door.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Step 01 */}
          <div className="bg-purple-50 rounded-3xl p-8">
            <div className="text-sm font-medium text-purple-600 mb-3">01</div>
            <h3 className="text-2xl font-bold mb-3">Create Your Document</h3>
            <p className="text-muted-foreground mb-6">
              Start your document with our easy-to-use editor. Customize it with templates, styles and formats that
              suits your needs.
            </p>
            <div className="rounded-2xl overflow-hidden">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%20from%202025-10-01%2020-05-50-skQVgzg0TWpgdjfR8OlcfJHf3zFhJ9.png"
                alt="Create Document"
                className="w-full"
              />
            </div>
          </div>

          {/* Step 02 */}
          <div className="bg-gradient-to-br from-purple-400 to-pink-400 rounded-3xl p-8 text-white">
            <div className="text-sm font-medium mb-3">02</div>
            <h3 className="text-2xl font-bold mb-3">Review and Finalize</h3>
            <p className="mb-6 opacity-90">
              Preview your document in real-time. Make any adjustments to ensure it's perfect.
            </p>
            <div className="rounded-2xl overflow-hidden">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%20from%202025-10-01%2020-05-50-skQVgzg0TWpgdjfR8OlcfJHf3zFhJ9.png"
                alt="Review Document"
                className="w-full"
              />
            </div>
          </div>

          {/* Step 03 */}
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-3xl p-8 text-white">
            <div className="text-sm font-medium mb-3">03</div>
            <h3 className="text-2xl font-bold mb-3">Place Your Order</h3>
            <p className="mb-6 opacity-90">
              Press the 'Print & Deliver' button to place an order. Choose paper quality, binding options and provide
              your delivery address
            </p>
            <div className="rounded-2xl overflow-hidden">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%20from%202025-10-01%2020-05-50-skQVgzg0TWpgdjfR8OlcfJHf3zFhJ9.png"
                alt="Place Order"
                className="w-full"
              />
            </div>
          </div>

          {/* Step 04 */}
          <div className="bg-gradient-to-br from-pink-400 to-pink-500 rounded-3xl p-8 text-white">
            <div className="text-sm font-medium mb-3">04</div>
            <h3 className="text-2xl font-bold mb-3">Print and Deliver</h3>
            <p className="mb-6 opacity-90">
              We handle the printing and packaging with care. Your document is delivered to your doorstep promptly.
            </p>
            <div className="rounded-2xl overflow-hidden">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%20from%202025-10-01%2020-05-50-skQVgzg0TWpgdjfR8OlcfJHf3zFhJ9.png"
                alt="Print and Deliver"
                className="w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
