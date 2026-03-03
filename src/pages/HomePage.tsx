import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import * as THREE from 'three'
import FadeInSection from '../components/ui/FadeInSection'
import ServiceCard from '../components/ui/ServiceCard'
import DraggableCube from '../components/ui/DraggableCube'
import EarthSphere from '../components/ui/EarthSphere'
import { services } from '../data/services'

const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

function CheckOutOurWork() {
  const [distance, setDistance] = useState(Infinity)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {

      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        const dist = Math.sqrt(
          Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2)
        )
        setDistance(dist)
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const vibrationIntensity = Math.max(0, 1 - distance / 300)
  const vibrationAmount = vibrationIntensity * vibrationIntensity * 12

  return (
    <div ref={containerRef} className="relative mt-12 md:mt-48 mb-8">
      {/* Left arrow pointing right */}
      <svg className="hidden md:block absolute left-[-100px] top-1/2 -translate-y-1/2 w-28 h-28" viewBox="0 0 120 120" style={{ filter: 'drop-shadow(0 0 3px rgba(104, 211, 145, 0.5))' }}>
        <path
          d="M 10 40 Q 60 80 80 60"
          stroke="#68d391"
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <polygon points="105,60 80,50 80,70" fill="#68d391" />
      </svg>

      {/* Right arrow pointing left */}
      <svg className="hidden md:block absolute right-[-100px] top-1/2 -translate-y-1/2 w-28 h-28" viewBox="0 0 120 120" style={{ filter: 'drop-shadow(0 0 3px rgba(104, 211, 145, 0.5))' }}>
        <path
          d="M 110 40 Q 60 80 40 60"
          stroke="#68d391"
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <polygon points="15,60 40,50 40,70" fill="#68d391" />
      </svg>

      <motion.div
        animate={!isMobile ? {
          x: (Math.random() - 0.5) * vibrationAmount,
          y: (Math.random() - 0.5) * vibrationAmount,
        } : {}}
        transition={{ duration: 0.05, repeat: Infinity }}
      >
        <Link
          to="/portfolio"
          className="block group"
        >
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center text-text group-hover:text-accent-green transition-colors duration-500 whitespace-nowrap">
            Check out our work
          </h2>
        </Link>
      </motion.div>
    </div>
  )
}

export default function HomePage() {
  const sunDirRef = useRef(new THREE.Vector3(1.5, 0.5, 1.0).normalize())

  return (
    <>
      {/* ===== HERO: Full-bleed cinematic dark ===== */}
      <section className="relative h-screen overflow-hidden bg-black">
        {/* Texture overlay - matches work page */}
        <div className="portfolio-grain" aria-hidden="true" />

        {/* Gold 3D cube — centered above headline */}
        <div className="absolute bottom-[48%] left-1/2 -translate-x-1/2 z-10">
          <DraggableCube size={isMobile ? 150 : 300} />
        </div>

        {/* Headline text — split layout */}
        <div className="absolute bottom-0 left-0 right-0 z-10 px-6 md:px-10 pb-8 md:pb-14">
          <div className="max-w-[100rem] mx-auto">
            {/* Line 1: BUILT left, TO BE right */}
            <div className="flex justify-between items-end leading-[0.85]">
              <div className="overflow-hidden">
                <motion.span
                  initial={{ y: '110%' }}
                  animate={{ y: '0%' }}
                  transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="block font-display text-[10vw] md:text-[8vw] font-extrabold text-white tracking-[-0.02em]"
                >
                  BUILT
                </motion.span>
              </div>
              <div className="overflow-hidden">
                <motion.span
                  initial={{ y: '110%' }}
                  animate={{ y: '0%' }}
                  transition={{ duration: 0.9, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="block font-display text-[10vw] md:text-[8vw] font-extrabold text-white tracking-[-0.02em]"
                >
                  TO BE
                </motion.span>
              </div>
            </div>
            {/* Line 2: NOTICED centered */}
            <div className="flex justify-center leading-[0.85] -mt-[1vw]">
              <div className="overflow-hidden">
                <motion.span
                  initial={{ y: '110%' }}
                  animate={{ y: '0%' }}
                  transition={{ duration: 0.9, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="block font-display text-[10vw] md:text-[8vw] font-extrabold text-white tracking-[-0.02em]"
                >
                  NOTICED
                </motion.span>
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* ===== Services ===== */}
      <section className="py-32 px-6 md:px-10">
        <div>
          <FadeInSection>
            <span className="text-lg uppercase tracking-[0.3em] text-accent-green font-semibold block text-center">
              What We Do
            </span>
          </FadeInSection>
          <FadeInSection delay={0.1}>
            <h2 className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold mt-4 mb-20 text-center">
              We straddle two worlds
            </h2>
          </FadeInSection>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 items-start md:min-h-[700px]">
            {/* Left column — Services 1-2 */}
            <div className="md:col-span-4">
              <FadeInSection delay={0.2}>
                <h3 className="text-2xl md:text-3xl font-display font-bold text-accent-green mb-8">
                  Brand & Design
                </h3>
              </FadeInSection>
              <div className="space-y-8">
                {services.slice(0, 2).map((service, i) => (
                  <ServiceCard
                    key={service.title}
                    title={service.title}
                    description={service.description}
                    index={i}
                    sunDirRef={sunDirRef}
                  />
                ))}
              </div>
            </div>

            {/* Center — Earth sphere */}
            <div className="md:col-span-4 flex flex-col items-center pt-4">
              <div>
                <EarthSphere size={420} sunDirRef={sunDirRef} />
              </div>
              <FadeInSection delay={0.3}>
                <CheckOutOurWork />
              </FadeInSection>
            </div>

            {/* Right column — Services 3-4 */}
            <div className="md:col-span-4">
              <FadeInSection delay={0.2}>
                <h3 className="text-2xl md:text-3xl font-display font-bold text-accent-green mb-8">
                  Web Dev & AI Automation
                </h3>
              </FadeInSection>
              <div className="space-y-8">
                {services.slice(2).map((service, i) => (
                  <ServiceCard
                    key={service.title}
                    title={service.title}
                    description={service.description}
                    index={i + 2}
                    sunDirRef={sunDirRef}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

    </>
  )
}
