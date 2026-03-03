import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { projects } from '../data/projects'

const REPS = 10

function MarqueeRow({
  text,
  outline,
  speed,
  drift,
  driftDelay = 0,
  rotate = 0,
  enterFrom = 0,
  enterDelay = 0,
  scrollX = 0,
}: {
  text: string
  outline?: boolean
  speed: number
  drift: 'up' | 'down'
  driftDelay?: number
  rotate?: number
  enterFrom?: number
  enterDelay?: number
  scrollX?: number
}) {
  const chunk = (
    <span
      style={{
        fontFamily: 'var(--font-impact)',
        fontWeight: 900,
        fontSize: 'clamp(2rem, 7vw, 12rem)',
        lineHeight: 0.9,
        letterSpacing: '0.02em',
        textTransform: 'uppercase' as const,
        paddingRight: '0.6em',
        color: outline ? undefined : '#fff',
        WebkitTextFillColor: outline ? '#000' : undefined,
        WebkitTextStroke: outline ? '4px rgba(255,255,255,0.72)' : undefined,
        paintOrder: outline ? 'stroke fill' : undefined,
        userSelect: 'none',
      }}
    >
      {Array(REPS).fill(null).map((_, i) => (
        <span key={i}>{text}&nbsp;&nbsp;/&nbsp;&nbsp;</span>
      ))}
    </span>
  )

  return (
    /* Entrance wrapper — slides in from off-screen */
    <motion.div
      initial={{ x: `${enterFrom}vw` }}
      animate={{ x: scrollX }}
      transition={{ duration: 1.2, delay: enterDelay, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Rotation wrapper — separate layer so it doesn't conflict with entrance or drift */}
      <div style={{ transform: `rotate(${rotate}deg)` }}>
        {/* Drift wrapper: slow vertical oscillation */}
        <div
          style={{
            animation: `${drift === 'down' ? 'drift-down' : 'drift-up'} 7s ease-in-out ${driftDelay}s infinite alternate`,
          }}
        >
          {/* Marquee wrapper: continuous horizontal scroll */}
          <div
            style={{
              display: 'inline-flex',
              whiteSpace: 'nowrap',
              animation: `marquee ${speed}s linear infinite`,
            }}
          >
            {chunk}
            {chunk}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function ProjectDetailPage() {
  const { id } = useParams()
  const project = projects.find(p => p.id === id)
  const [scrollX, setScrollX] = useState(0)
  const lastScrollRef = useRef(0)
  const lastUpdateRef = useRef(0)
  const titleSectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let rafId: number | null = null

    const handleScroll = () => {
      const now = Date.now()
      // Throttle to 60fps (~16ms)
      if (now - lastUpdateRef.current < 16) return

      const titleSection = titleSectionRef.current
      if (!titleSection) return

      const rect = titleSection.getBoundingClientRect()
      const isInView = rect.top < window.innerHeight && rect.bottom > 0

      if (isInView) {
        const scrollDelta = window.scrollY - lastScrollRef.current
        // Move right on scroll down (positive), left on scroll up (negative)
        setScrollX((prev) => prev + scrollDelta * 0.3)
        lastScrollRef.current = window.scrollY
        lastUpdateRef.current = now
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  if (!project) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-4">
        <p className="text-white/50">Project not found.</p>
        <Link
          to="/portfolio"
          className="text-sm uppercase tracking-[0.2em] text-white border-b border-white/40 hover:border-accent-green hover:text-accent-green transition-colors duration-300"
        >
          ← Back to Work
        </Link>
      </div>
    )
  }

  return (
    <div className="bg-black text-white min-h-screen">

      {/* ── Title marquee band ──────────────────────────────────────── */}
      <div
        ref={titleSectionRef}
        style={{
          paddingTop: '80px',       // clear fixed navbar
          maxHeight: '44vh',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: '0',
          position: 'relative',
        }}
      >
        {/* Row 1: outline text — drifts up + scrolls left (slower) — BACK LAYER */}
        <div style={{ marginBottom: '-3rem', marginLeft: '-15%' }}>
          <MarqueeRow
            text={project.title}
            outline
            speed={90}
            drift="up"
            driftDelay={-3.5}
            rotate={5}
            enterFrom={0}
            enterDelay={0.25}
            scrollX={scrollX}
          />
        </div>

        {/* Row 2: solid white text — drifts down + scrolls left — FRONT LAYER */}
        <div style={{ marginTop: '-3rem', marginLeft: '-15%' }}>
          <MarqueeRow
            text={project.title}
            speed={65}
            drift="down"
            driftDelay={0}
            rotate={-5}
            enterFrom={0}
            enterDelay={0.1}
            scrollX={scrollX}
          />
        </div>
      </div>


      {/* ── Project info ────────────────────────────────────────────── */}
      <div className="px-4 sm:px-6 md:px-8 lg:px-16 py-16">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10 max-w-6xl mx-auto">

          <div className="flex-1">
            <p className="text-white/35 text-[11px] tracking-[0.3em] uppercase mb-5">
              {project.category}&nbsp;&nbsp;·&nbsp;&nbsp;{project.year}
            </p>
            <h1
              className="text-white mb-6"
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: 'clamp(2rem, 3.5vw, 4rem)',
                lineHeight: 1.05,
              }}
            >
              {project.title}
            </h1>
            <p className="text-white/55 text-base md:text-lg leading-relaxed max-w-xl">
              {project.description}
            </p>
          </div>

          <div className="flex-shrink-0 flex flex-col items-start gap-4 md:pt-14">
            <Link
              to="/portfolio"
              className="group/btn relative inline-flex items-center gap-3 border-2 border-white/40 rounded-full px-10 py-4 text-sm font-medium uppercase tracking-[0.2em] text-white overflow-hidden transition-colors duration-300 hover:border-transparent"
            >
              <span className="absolute inset-0 bg-accent-green rounded-full translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]" />
              <span className="relative z-10 group-hover/btn:text-bg transition-colors duration-300">
                ← Back to Work
              </span>
            </Link>
          </div>

        </div>
      </div>

      {/* ── Client Description ────────────────────────────────────────── */}
      {project.clientDescription && (
        <div className="px-4 sm:px-6 md:px-8 lg:px-16 py-16 border-t border-white/10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-white mb-8" style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: 'clamp(1.5rem, 2.5vw, 2.5rem)',
            }}>
              About the Client
            </h2>
            <p className="text-white/65 text-base md:text-lg leading-relaxed">
              {project.clientDescription}
            </p>
          </div>
        </div>
      )}

      {/* ── Challenges ────────────────────────────────────────────────── */}
      {project.challenges && project.challenges.length > 0 && (
        <div className="px-4 sm:px-6 md:px-8 lg:px-16 py-16 border-t border-white/10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-white mb-12" style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: 'clamp(1.5rem, 2.5vw, 2.5rem)',
            }}>
              The Challenges
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {project.challenges.map((challenge, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="p-6 border-l-4 border-accent-green bg-white/2 rounded"
                >
                  <p className="text-white/65 leading-relaxed">{challenge}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── The Original Design ────────────────────────────────────────── */}
      {(project.id === 'ember-restaurant' || project.id === 'swift-towing' || project.id === 'peak-roofing') && (
        <div className="px-4 sm:px-6 md:px-8 lg:px-16 py-16 border-t border-white/10">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-white mb-8" style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: 'clamp(1.5rem, 2.5vw, 2.5rem)',
            }}>
              The Original Design
            </h2>
            <p className="text-white/55 text-base md:text-lg leading-relaxed mb-8">
              {project.id === 'ember-restaurant'
                ? 'This is the original Ember Restaurant website as it existed before our redesign. Notice the early 2000s design patterns, outdated typography, and poor mobile responsiveness.'
                : project.id === 'swift-towing'
                ? 'This is the original Swift Towing website as it existed before our redesign. Notice the basic layout, limited interactivity, and poor mobile experience.'
                : 'This is the original Peak Roofing website as it existed before our redesign. Notice the text-heavy layout and lack of visual project examples.'}
            </p>
            <div className="bg-white/5 rounded-lg overflow-hidden border border-white/10">
              <iframe
                src={
                  project.id === 'ember-restaurant'
                    ? '/ember.html'
                    : project.id === 'swift-towing'
                    ? '/swift-towing-original.html'
                    : '/roofing-original.html'
                }
                title={`Original ${project.title} Website`}
                className="w-full"
                style={{
                  height: 'auto',
                  minHeight: '400px',
                  border: 'none',
                  display: 'block',
                }}
              />
            </div>
            <p className="text-white/35 text-sm mt-4 text-center">
              Original design showcasing the challenges we identified and addressed
            </p>
          </div>
        </div>
      )}

      {/* ── Insights ────────────────────────────────────────────────────── */}
      {project.insights && project.insights.length > 0 && (
        <div className="px-4 sm:px-6 md:px-8 lg:px-16 py-16 border-t border-white/10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-white mb-12" style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: 'clamp(1.5rem, 2.5vw, 2.5rem)',
            }}>
              Our Insights
            </h2>
            <div className="space-y-6">
              {project.insights.map((insight, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="flex gap-6 p-6 border border-white/10 rounded hover:border-accent-green/30 transition-colors"
                >
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-accent-green/20 flex items-center justify-center">
                      <span className="text-accent-green font-bold text-sm">{i + 1}</span>
                    </div>
                  </div>
                  <p className="text-white/65 leading-relaxed pt-1">{insight}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── What We Built ────────────────────────────────────────────────── */}
      {(project.id === 'ember-restaurant' || project.id === 'swift-towing' || project.id === 'peak-roofing') && (
        <div className="px-4 sm:px-6 md:px-8 lg:px-16 py-16 border-t border-white/10">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-white mb-8" style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: 'clamp(1.5rem, 2.5vw, 2.5rem)',
            }}>
              What We Built
            </h2>
            <div className="bg-white/5 rounded-lg overflow-hidden border border-white/10">
              <iframe
                src={
                  project.id === 'ember-restaurant'
                    ? '/ember-landing.html'
                    : project.id === 'swift-towing'
                    ? '/swift-towing-landing.html'
                    : '/peak-roofing-landing.html'
                }
                title={`${project.title} Landing Page Preview`}
                className="w-full"
                style={{
                  height: 'auto',
                  minHeight: '500px',
                  border: 'none',
                  display: 'block',
                }}
              />
            </div>
            <p className="text-white/35 text-sm mt-4 text-center">
              This is a preview of the landing page we designed and built
            </p>
          </div>
        </div>
      )}

    </div>
  )
}
