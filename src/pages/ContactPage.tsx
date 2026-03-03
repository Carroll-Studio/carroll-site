import AnimatedText from '../components/ui/AnimatedText'
import FadeInSection from '../components/ui/FadeInSection'
import ImageReveal from '../components/ui/ImageReveal'
import ContactForm from '../components/ui/ContactForm'

export default function ContactPage() {
  return (
    <>
      {/* Header */}
      <section className="pt-40 pb-20 px-4 sm:px-6 md:px-8 lg:px-10">
        <div className="max-w-7xl mx-auto">
          <FadeInSection>
            <span className="text-xs uppercase tracking-[0.3em] text-accent-green font-semibold">
              Contact
            </span>
          </FadeInSection>
          <div className="mt-4">
            <AnimatedText
              text="Let's build something remarkable together"
              className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05] text-text"
              delay={0.1}
            />
          </div>
        </div>
      </section>

      {/* Form + Info */}
      <section className="px-4 sm:px-6 md:px-8 lg:px-10 pb-32">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 md:gap-12 lg:gap-16 xl:gap-20">
            {/* Form */}
            <div className="lg:col-span-3">
              <ContactForm />
            </div>

            {/* Info */}
            <div className="lg:col-span-2">
              <FadeInSection direction="right">
                <div className="lg:pt-4">
                  <h3 className="font-display text-2xl font-bold mb-8">Get in Touch</h3>

                  <div className="space-y-8">
                    <div>
                      <h4 className="text-xs uppercase tracking-widest text-text-muted font-semibold mb-2">
                        Email
                      </h4>
                      <a
                        href="mailto:hello@neighborhoodstudio.co"
                        className="text-text hover:text-accent-green transition-colors duration-300"
                      >
                        hello@neighborhoodstudio.co
                      </a>
                    </div>

                    <div>
                      <h4 className="text-xs uppercase tracking-widest text-text-muted font-semibold mb-2">
                        Phone
                      </h4>
                      <span className="text-text">(555) 123-4567</span>
                    </div>

                    <div>
                      <h4 className="text-xs uppercase tracking-widest text-text-muted font-semibold mb-2">
                        Location
                      </h4>
                      <span className="text-text">Brooklyn, New York</span>
                    </div>

                    <div>
                      <h4 className="text-xs uppercase tracking-widest text-text-muted font-semibold mb-2">
                        Social
                      </h4>
                      <div className="flex flex-col gap-2">
                        <a href="#" className="text-text hover:text-accent-green transition-colors duration-300">
                          Instagram
                        </a>
                        <a href="#" className="text-text hover:text-accent-green transition-colors duration-300">
                          Dribbble
                        </a>
                        <a href="#" className="text-text hover:text-accent-green transition-colors duration-300">
                          LinkedIn
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeInSection>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Image */}
      <section className="px-4 sm:px-6 md:px-8 lg:px-10 pb-16">
        <div className="max-w-7xl mx-auto">
          <ImageReveal
            src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1920&h=800&fit=crop"
            alt="Brooklyn cityscape"
            aspectRatio="aspect-[21/9]"
          />
        </div>
      </section>
    </>
  )
}
