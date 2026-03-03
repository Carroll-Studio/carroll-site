import AnimatedText from '../components/ui/AnimatedText'
import FadeInSection from '../components/ui/FadeInSection'
import ImageReveal from '../components/ui/ImageReveal'
import Button from '../components/ui/Button'

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-[60vh] md:h-[70vh] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&h=1080&fit=crop"
          alt="Our team collaborating"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60 flex items-end">
          <div className="max-w-7xl mx-auto px-6 md:px-10 w-full pb-16">
            <span className="text-xs uppercase tracking-[0.3em] text-accent-green font-semibold block mb-4">
              About Us
            </span>
            <AnimatedText
              text="We believe great design is built on understanding"
              className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.05]"
              delay={0.2}
            />
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <ImageReveal
              src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&h=1000&fit=crop"
              alt="Our studio workspace"
              aspectRatio="aspect-[4/5]"
            />
            <div>
              <FadeInSection direction="right">
                <span className="text-xs uppercase tracking-[0.3em] text-accent-green font-semibold">
                  Our Story
                </span>
                <h2 className="font-display text-4xl font-bold mt-4 mb-8">
                  Design with intention,<br />build with care
                </h2>
                <div className="space-y-6 text-text-muted leading-relaxed text-lg">
                  <p>
                    Cohesium was founded on a simple belief: every small business
                    deserves a digital presence that matches the quality of what they
                    do. We&apos;ve spent years refining our craft to deliver exactly that.
                  </p>
                  <p>
                    We&apos;re not a factory. We&apos;re a small, intentional team that partners
                    closely with each client. We listen before we design. We understand
                    before we build. And we don&apos;t stop until every detail is right.
                  </p>
                  <p>
                    From brand strategy to launch day and beyond, we&apos;re in your corner
                    — championing your vision and translating it into digital experiences
                    that drive real results.
                  </p>
                </div>
              </FadeInSection>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-surface py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <FadeInSection>
            <span className="text-xs uppercase tracking-[0.3em] text-accent-green font-semibold">
              Our Values
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold mt-4 mb-16">
              What guides us
            </h2>
          </FadeInSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                num: '01',
                title: 'Craft Over Convention',
                desc: 'Every pixel has purpose. We reject templates in favor of bespoke solutions tailored to your unique story.',
              },
              {
                num: '02',
                title: 'Partnership, Not Service',
                desc: 'We embed ourselves in your vision. Your success is our portfolio piece.',
              },
              {
                num: '03',
                title: 'Results That Resonate',
                desc: 'Beautiful design is only the beginning. We measure success by the impact on your business.',
              },
            ].map((value, i) => (
              <FadeInSection key={value.num} delay={i * 0.15}>
                <div>
                  <span className="font-display text-5xl font-bold text-surface-light block mb-4">
                    {value.num}
                  </span>
                  <h3 className="text-xl font-display font-bold text-text mb-3">
                    {value.title}
                  </h3>
                  <p className="text-text-muted leading-relaxed">{value.desc}</p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-surface py-32 px-6 md:px-10">
        <div className="max-w-4xl mx-auto text-center">
          <FadeInSection>
            <h2 className="font-display text-4xl md:text-5xl font-bold">
              Let&apos;s work together
            </h2>
          </FadeInSection>
          <FadeInSection delay={0.15}>
            <p className="text-text-muted text-lg mt-6 mb-10">
              We&apos;d love to hear about your project and explore how we can help.
            </p>
          </FadeInSection>
          <FadeInSection delay={0.25}>
            <Button to="/contact">Get in Touch</Button>
          </FadeInSection>
        </div>
      </section>
    </>
  )
}
