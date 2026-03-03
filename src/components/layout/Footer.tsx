import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <footer className="bg-accent-green text-bg">
      {/* Big CTA marquee */}
      <div className="overflow-hidden py-12 border-b border-bg/10">
        <div className="animate-marquee whitespace-nowrap flex gap-16">
          {Array.from({ length: 4 }).map((_, i) => (
            <span key={i} className="font-display text-[8vw] font-bold uppercase tracking-tight">
              Let&apos;s build something &mdash;
            </span>
          ))}
        </div>
      </div>

      {/* Footer content */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <span className="font-display text-3xl font-bold">Cohesium</span>
            <span className="text-bg/50 ml-0.5 text-3xl">.</span>
            <p className="mt-4 text-bg/70 max-w-sm leading-relaxed">
              A design studio crafting bold digital experiences for
              businesses that refuse to blend in.
            </p>
          </div>

          {/* Nav */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-bg/50 font-semibold mb-6">
              Sitemap
            </h4>
            <div className="flex flex-col gap-3">
              {[
                { label: 'Home', to: '/' },
                { label: 'Work', to: '/portfolio' },
                { label: 'About', to: '/about' },
                { label: 'Contact', to: '/contact' },
              ].map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => {
                    if (link.to === '/') {
                      window.scrollTo({ top: 0, behavior: 'smooth' })
                    }
                  }}
                  className="text-sm text-bg/70 hover:text-bg transition-colors duration-300"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-bg/50 font-semibold mb-6">
              Say hello
            </h4>
            <div className="flex flex-col gap-3 text-sm text-bg/70">
              <a href="mailto:hello@neighborhoodstudio.co" className="hover:text-bg transition-colors duration-300">
                hello@neighborhoodstudio.co
              </a>
              <span>(555) 123-4567</span>
              <span>Richmond, VA</span>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-bg/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-bg/40">
            &copy; {new Date().getFullYear()} Cohesium. All rights reserved.
          </p>

          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            whileHover={{ y: -3 }}
            className="text-xs uppercase tracking-widest text-bg/50 hover:text-bg transition-colors duration-300 flex items-center gap-2"
          >
            Back to top &uarr;
          </motion.button>
        </div>
      </div>
    </footer>
  )
}
