import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"

export function FeaturesSection() {
  return (
    <section className="py-12 sm:py-16 lg:py-20  mt-[250px] ">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-block px-3 sm:px-4 py-1.5 rounded-full border-2 border-purple-600 text-purple-600 text-xs sm:text-sm font-medium mb-3 sm:mb-4">
            FEATURES
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 leading-tight">
            A Platform for Scientific and Technical Writing
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Effortlessly create and format complex documents, collaborate in real-time, and have your work delivered to
            your door
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 max-w-6xl mx-auto mb-12 sm:mb-20">
          {/* Quick Start */}
          <div className="order-2 lg:order-1">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-purple-100 flex items-center justify-center mb-4 sm:mb-6">
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_i_2_2901)">
<circle cx="40" cy="40" r="40" fill="#EEEBFF"/>
</g>
<g clip-path="url(#clip0_2_2901)">
<path d="M33.0079 50.8438L29.0469 46.8829C28.3282 46.1641 28.1172 45.086 28.5235 44.1563C29.9532 40.8829 33.4219 33.2032 36.1875 29.1172C42.586 19.6797 52.1172 19.3672 57.8047 20.4141C58.711 20.5782 59.4141 21.2891 59.586 22.1954C60.6329 27.8907 60.3125 37.4141 50.8829 43.8125C46.7657 46.6016 38.9844 49.9922 35.7032 51.3829C34.7813 51.7735 33.7188 51.5547 33.0079 50.8438ZM50 33.125C50.8288 33.125 51.6237 32.7958 52.2098 32.2098C52.7958 31.6237 53.125 30.8288 53.125 30C53.125 29.1712 52.7958 28.3764 52.2098 27.7903C51.6237 27.2043 50.8288 26.875 50 26.875C49.1712 26.875 48.3764 27.2043 47.7903 27.7903C47.2043 28.3764 46.875 29.1712 46.875 30C46.875 30.8288 47.2043 31.6237 47.7903 32.2098C48.3764 32.7958 49.1712 33.125 50 33.125Z" fill="#4E1C9C"/>
<path opacity="0.4" d="M35.5156 30.1562C33.289 33.7344 30.7734 39.1016 29.2578 42.5H21.875C21.1953 42.5 20.5703 42.1328 20.2422 41.5469C19.914 40.9609 19.9218 40.2344 20.2734 39.6562L24.3984 32.8672C25.414 31.1875 27.2343 30.1562 29.2031 30.1562H35.5156ZM37.5 50.6094C40.9297 49.1172 46.2812 46.6797 49.8437 44.4844V50.7969C49.8437 52.7656 48.8203 54.5859 47.1406 55.6016L40.3515 59.7266C39.7734 60.0781 39.0468 60.0938 38.4609 59.7578C37.875 59.4219 37.5078 58.8047 37.5078 58.125V50.6094H37.5Z" fill="#4E1C9C"/>
</g>
<defs>
<filter id="filter0_i_2_2901" x="0" y="0" width="80" height="81" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="1"/>
<feGaussianBlur stdDeviation="22"/>
<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
<feColorMatrix type="matrix" values="0 0 0 0 0.305882 0 0 0 0 0.109804 0 0 0 0 0.611765 0 0 0 0.7 0"/>
<feBlend mode="normal" in2="shape" result="effect1_innerShadow_2_2901"/>
</filter>
<clipPath id="clip0_2_2901">
<rect width="40" height="40" fill="white" transform="translate(20 20)"/>
</clipPath>
</defs>
</svg>

            </div>
            <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Quick Start</h3>
            <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6 leading-relaxed">
              No downloads and no prior knowledge of LaTeX required.
            </p>
            <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
              <div className="flex items-start gap-2">
                <Check className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                <span className="text-xs sm:text-sm">Seamless Visual and Code Editing</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                <span className="text-xs sm:text-sm">Access Thousand of Free Templates</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                <span className="text-xs sm:text-sm">Comprehensive LaTeX Tutorials and Guidance</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                <span className="text-xs sm:text-sm">Export Support from Real-Life TeXperts</span>
              </div>
            </div>
            <Button className="bg-purple-600 text-white hover:bg-purple-700 rounded-full text-sm sm:text-base w-full sm:w-auto">
              Start Writing Your Thesis
            </Button>
          </div>

          {/* Image */}
          <div className="relative order-1 lg:order-2">
            <div className="absolute -top-2 -left-2 sm:-top-4 sm:-left-4 w-16 h-16 sm:w-24 sm:h-24 rounded-full" />
            <div >
              <img
                src="features-section1.png"
                alt="Quick Start Features"
                className="w-full rounded-lg h-auto"
              />
            </div>
          </div>
        </div>

        {/* Collaboration */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 max-w-6xl mx-auto items-center">
          <div className="relative">
            <div className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 w-16 h-16 sm:w-24 sm:h-24 rounded-full" />
            <div >
              <img
                src="/features-section2.png"
                alt="Collaboration Features"
                className="w-full rounded-lg h-auto"
              />
            </div>
          </div>

          <div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-purple-100 flex items-center justify-center mb-4 sm:mb-6">
             <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_i_2_3000)">
<circle cx="40" cy="40" r="40" fill="#EEEBFF"/>
</g>
<g clip-path="url(#clip0_2_3000)">
<path d="M40 45C40.9849 45 41.9602 44.806 42.8701 44.4291C43.7801 44.0522 44.6069 43.4997 45.3033 42.8033C45.9997 42.1069 46.5522 41.2801 46.9291 40.3701C47.306 39.4602 47.5 38.4849 47.5 37.5C47.5 36.5151 47.306 35.5398 46.9291 34.6299C46.5522 33.7199 45.9997 32.8931 45.3033 32.1967C44.6069 31.5003 43.7801 30.9478 42.8701 30.5709C41.9602 30.194 40.9849 30 40 30C39.0151 30 38.0398 30.194 37.1299 30.5709C36.2199 30.9478 35.3931 31.5003 34.6967 32.1967C34.0003 32.8931 33.4478 33.7199 33.0709 34.6299C32.694 35.5398 32.5 36.5151 32.5 37.5C32.5 38.4849 32.694 39.4602 33.0709 40.3701C33.4478 41.2801 34.0003 42.1069 34.6967 42.8033C35.3931 43.4997 36.2199 44.0522 37.1299 44.4291C38.0398 44.806 39.0151 45 40 45ZM35.4141 47.5C29.6641 47.5 25 52.1641 25 57.9141C25 59.0625 25.9297 60 27.0859 60H52.9141C54.0625 60 55 59.0703 55 57.9141C55 52.1641 50.3359 47.5 44.5859 47.5H35.4141Z" fill="#4E1C9C"/>
<path opacity="0.4" d="M32.5 26.25C32.5 24.5924 31.8415 23.0027 30.6694 21.8306C29.4973 20.6585 27.9076 20 26.25 20C24.5924 20 23.0027 20.6585 21.8306 21.8306C20.6585 23.0027 20 24.5924 20 26.25C20 27.9076 20.6585 29.4973 21.8306 30.6694C23.0027 31.8415 24.5924 32.5 26.25 32.5C27.9076 32.5 29.4973 31.8415 30.6694 30.6694C31.8415 29.4973 32.5 27.9076 32.5 26.25ZM61.25 26.25C61.25 24.5924 60.5915 23.0027 59.4194 21.8306C58.2473 20.6585 56.6576 20 55 20C53.3424 20 51.7527 20.6585 50.5806 21.8306C49.4085 23.0027 48.75 24.5924 48.75 26.25C48.75 27.9076 49.4085 29.4973 50.5806 30.6694C51.7527 31.8415 53.3424 32.5 55 32.5C56.6576 32.5 58.2473 31.8415 59.4194 30.6694C60.5915 29.4973 61.25 27.9076 61.25 26.25ZM23.3359 35C18.7344 35 15 38.7344 15 43.3359C15 44.25 15.75 45 16.6641 45H33.3359C33.3516 45 33.3672 45 33.3906 45C31.3125 43.1641 30.0078 40.4844 30.0078 37.5C30.0078 36.9062 30.0625 36.3281 30.1562 35.7578C29.0938 35.2656 27.9141 35 26.6719 35H23.3359ZM46.6172 45C46.6328 45 46.6484 45 46.6719 45H63.3359C64.2578 45 65 44.25 65 43.3359C65 38.7344 61.2656 35 56.6641 35H53.3359C52.0938 35 50.9141 35.2734 49.8516 35.7578C49.9531 36.3203 50 36.9062 50 37.5C50 40.4844 48.6875 43.1641 46.6172 45Z" fill="#4E1C9C"/>
</g>
<defs>
<filter id="filter0_i_2_3000" x="0" y="0" width="80" height="81" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="1"/>
<feGaussianBlur stdDeviation="22"/>
<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
<feColorMatrix type="matrix" values="0 0 0 0 0.305882 0 0 0 0 0.109804 0 0 0 0 0.611765 0 0 0 0.7 0"/>
<feBlend mode="normal" in2="shape" result="effect1_innerShadow_2_3000"/>
</filter>
<clipPath id="clip0_2_3000">
<rect width="50" height="40" fill="white" transform="translate(15 20)"/>
</clipPath>
</defs>
</svg>

            </div>
            <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Create your best work together</h3>
            <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6 leading-relaxed">
              Skip the email chains and streamline your workflow
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
              <div className="flex items-start gap-2">
                <Check className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                <span className="text-xs sm:text-sm">Work from any device, anywhere</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                <span className="text-xs sm:text-sm">Edit and comment together in real-time</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                <span className="text-xs sm:text-sm">Share your documents effortlessly</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                <span className="text-xs sm:text-sm">Access project history and versions</span>
              </div>
            </div>
            <Button className="bg-purple-600 text-white hover:bg-purple-700 rounded-full text-sm sm:text-base w-full sm:w-auto">
              Start Writing Your Thesis
            </Button>
          </div>
        </div>
        <div className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center max-w-6xl mx-auto">
          <div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-purple-100 flex items-center justify-center mb-4 sm:mb-6">
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_i_2_3083)">
<circle cx="40" cy="40" r="40" fill="#EEEBFF"/>
</g>
<path d="M20 45V38.3203C20 36.9922 20.5234 35.7188 21.4609 34.7812L24.7812 31.4609C25.7188 30.5234 26.9922 30 28.3203 30H51.6797C53.0078 30 54.2812 30.5234 55.2188 31.4609L58.5391 34.7812C59.4766 35.7188 60 36.9922 60 38.3203V45H50V42.5C50 41.1172 48.8828 40 47.5 40C46.1172 40 45 41.1172 45 42.5V45H35V42.5C35 41.1172 33.8828 40 32.5 40C31.1172 40 30 41.1172 30 42.5V45H20Z" fill="#4E1C9C"/>
<path opacity="0.4" d="M33.75 26.875V30H30V26.875C30 24.4609 31.9609 22.5 34.375 22.5H45.625C48.0391 22.5 50 24.4609 50 26.875V30H46.25V26.875C46.25 26.5312 45.9688 26.25 45.625 26.25H34.375C34.0312 26.25 33.75 26.5312 33.75 26.875ZM20 45H30V47.5C30 48.8828 31.1172 50 32.5 50C33.8828 50 35 48.8828 35 47.5V45H45V47.5C45 48.8828 46.1172 50 47.5 50C48.8828 50 50 48.8828 50 47.5V45H60V52.5C60 55.2578 57.7578 57.5 55 57.5H25C22.2422 57.5 20 55.2578 20 52.5V45Z" fill="#4E1C9C"/>
<defs>
<filter id="filter0_i_2_3083" x="0" y="0" width="80" height="81" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="1"/>
<feGaussianBlur stdDeviation="22"/>
<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
<feColorMatrix type="matrix" values="0 0 0 0 0.305882 0 0 0 0 0.109804 0 0 0 0 0.611765 0 0 0 0.7 0"/>
<feBlend mode="normal" in2="shape" result="effect1_innerShadow_2_3083"/>
</filter>
</defs>
</svg>

            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 leading-tight">
              Choose the right tool
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6 leading-relaxed">
              Equip yourself with the best tools for scientific and technical writing, powered by LaTeX.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
              <div className="flex items-start gap-2">
                <Check className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                <span className="text-xs sm:text-sm">Flawless and perfect formatting</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                <span className="text-xs sm:text-sm">Smart citations and bibliographies</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                <span className="text-xs sm:text-sm">Enhanced formulas figures, tables</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                <span className="text-xs sm:text-sm">Ready-to-use and production-ready template</span>
              </div>
            </div>
            <Button className="bg-purple-600 text-white hover:bg-purple-700 rounded-full text-sm sm:text-base w-full sm:w-auto">
              Start Writing Your Thesis
            </Button>
          </div>

          <div className="rounded-xl sm:rounded-2xl p-4 sm:p-8">
            <img
              src="/tools-section.png"
              alt="LaTeX Editor"
              className="w-full rounded-lg h-auto"
            />
          </div>
        </div>
      </div>
    </div>
      </div>
    </section>
  )
}
