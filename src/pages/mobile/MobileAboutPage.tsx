import { Link } from 'react-router-dom'
import FadeInSection from '../../components/ui/FadeInSection'

export default function MobileAboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-24 pb-12 px-6 bg-black text-center overflow-hidden">
        <div className="portfolio-grain" aria-hidden="true" />
        <FadeInSection>
          <span className="text-xs uppercase tracking-[0.3em] text-accent-green font-semibold block mb-4">
            About Us
          </span>
          <h1 className="font-display text-3xl font-bold text-white leading-[1.05] mb-8">
            We believe great design is built on understanding
          </h1>
        </FadeInSection>
      </section>

      {/* Story */}
      <section className="py-12 px-6">
        <FadeInSection>
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-accent-green font-semibold block mb-4">
              Our Story
            </span>
            <h2 className="font-display text-2xl font-bold mb-6 text-white">
              Design with intention, build with care
            </h2>
            <div className="space-y-4 text-sm text-text-muted leading-relaxed">
              <p>
                Cohesium was founded on a simple belief: every small business deserves a digital presence that matches the quality of what they do. We've spent years refining our craft to deliver exactly that.
              </p>
              <p>
                We're not a factory. We're a small, intentional team that partners closely with each client. We listen before we design. We understand before we build. And we don't stop until every detail is right.
              </p>
              <p>
                From brand strategy to launch day and beyond, we're in your corner — championing your vision and translating it into digital experiences that drive real results.
              </p>
            </div>
          </div>
        </FadeInSection>
      </section>

      {/* Values */}
      <section className="bg-surface py-12 px-6">
        <FadeInSection>
          <span className="text-xs uppercase tracking-[0.3em] text-accent-green font-semibold block mb-4">
            Our Values
          </span>
          <h2 className="font-display text-2xl font-bold mb-8 text-white">
            What guides us
          </h2>
        </FadeInSection>

        <div className="space-y-6">
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
            <FadeInSection key={value.num} delay={i * 0.1}>
              <div>
                <span className="font-display text-3xl font-bold text-surface-light block mb-2">
                  {value.num}
                </span>
                <h3 className="text-lg font-display font-bold text-text mb-2">
                  {value.title}
                </h3>
                <p className="text-sm text-text-muted leading-relaxed">{value.desc}</p>
              </div>
            </FadeInSection>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-surface py-12 px-6 text-center">
        <FadeInSection>
          <h2 className="font-display text-2xl font-bold mb-4 text-white">
            Let&apos;s work together
          </h2>
        </FadeInSection>
        <FadeInSection delay={0.1}>
          <p className="text-text-muted text-sm mb-6">
            We'd love to hear about your project and explore how we can help.
          </p>
        </FadeInSection>
        <FadeInSection delay={0.2}>
          <Link
            to="/contact"
            className="inline-block bg-accent-green text-black font-bold px-6 py-2 rounded-full hover:bg-opacity-90 transition-all text-sm"
          >
            Get in Touch
          </Link>
        </FadeInSection>
      </section>
    </>
  )
}
