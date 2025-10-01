export function LogoCloud() {
  return (
    <section className="border-y bg-muted/30 py-12">
      <div className="container">
        <p className="text-center text-sm text-muted-foreground mb-8">
          Over 20 million users at research institutions and businesses worldwide love Overleaf
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 opacity-60">
          <div className="text-2xl font-bold text-red-600">Adobe</div>
          <div className="text-xl font-semibold">香港中文大學</div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full border-2 border-blue-600" />
            <span className="text-sm font-medium">UNESCO</span>
          </div>
          <div className="text-2xl font-bold">SAMSUNG</div>
          <div className="text-2xl font-bold text-orange-600">Caltech</div>
          <div className="text-xl font-bold text-red-600">TOSHIBA</div>
        </div>
        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground">
            Explore Overleaf for{" "}
            <a href="#" className="text-primary hover:underline">
              business
            </a>{" "}
            and{" "}
            <a href="#" className="text-primary hover:underline">
              universities
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
