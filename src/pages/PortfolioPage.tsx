import { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { projects } from '../data/projects'
import PixelCanvas from '../components/ui/PixelCanvas'

function ProjectSection({ project, index }: { project: typeof projects[0]; index: number }) {
  const glowRef = useRef<HTMLDivElement>(null)

  const onFrameMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!glowRef.current) return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const mask = `radial-gradient(ellipse 120px 80px at ${x}px ${y}px, black 0%, transparent 100%)`
    glowRef.current.style.maskImage = mask
    glowRef.current.style.webkitMaskImage = mask
    glowRef.current.style.opacity = '1'
  }

  const onFrameMouseLeave = () => {
    if (glowRef.current) glowRef.current.style.opacity = '0'
  }

  return (
    <section
      className="portfolio-snap-section relative h-screen flex flex-col items-center justify-center"
      style={{ paddingTop: '80px' }}
    >
      {/* Content wrapper — 70vw, leaves room for logo on both sides */}
      <div className="relative" style={{ width: '70vw' }}>

        {/* ── Labels row — flush with photo edges, right above image ── */}
        <div className="flex justify-between items-baseline mb-3">
          <span className="text-[11px] font-medium text-white/35 tracking-[0.25em] uppercase">
            {String(index + 1).padStart(2, '0')} — {String(projects.length).padStart(2, '0')}
          </span>
          <span className="text-[11px] font-medium text-white/35 tracking-[0.25em] uppercase">
            {project.title}
          </span>
        </div>

        {/* ── IMAGE FRAME ─────────────────────────────────────────── */}
        <motion.div
          layoutId={`project-image-${project.id}`}
          className="relative w-full"
          style={{ aspectRatio: '16 / 9', maxHeight: '68vh', overflow: 'hidden' }}
          transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
          onMouseMove={onFrameMouseMove}
          onMouseLeave={onFrameMouseLeave}
        >
          {/* Pixel displacement canvas — handles mouse interaction */}
          <PixelCanvas
            src={project.image}
            alt={project.title}
            className="absolute inset-0 w-full h-full"
          />

          {/* All overlays are pointer-events:none */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: [
                'linear-gradient(to top,    rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.12) 40%, transparent 65%)',
                'linear-gradient(to bottom, rgba(0,0,0,0.40) 0%, transparent 40%)',
                'linear-gradient(to right,  rgba(0,0,0,0.40) 0%, transparent 40%)',
                'linear-gradient(to left,   rgba(0,0,0,0.40) 0%, transparent 40%)',
              ].join(', '),
            }}
          />
          <div className="photo-grain pointer-events-none" aria-hidden="true" />

          {/* Title — centered, overlaid at bottom of image */}
          <div className="absolute bottom-0 left-0 right-0 pb-14 z-10 flex justify-center px-4 pointer-events-none">
            <h2
              className="text-white uppercase text-center leading-[0.88]"
              style={{
                fontFamily: 'var(--font-impact)',
                fontWeight: 900,
                fontSize: 'clamp(1.4rem, 4.2vw, 5rem)',
                letterSpacing: '0.08em',
              }}
            >
              {project.title}
            </h2>
          </div>

          {/* Glow layer — same text, masked to cursor position */}
          <div
            ref={glowRef}
            className="absolute bottom-0 left-0 right-0 pb-14 z-20 flex justify-center px-4 pointer-events-none"
            style={{ opacity: 0, transition: 'opacity 0.15s' }}
          >
            <h2
              className="uppercase text-center leading-[0.88]"
              style={{
                fontFamily: 'var(--font-impact)',
                fontWeight: 900,
                fontSize: 'clamp(1.4rem, 4.2vw, 5rem)',
                letterSpacing: '0.08em',
                color: 'rgba(255,255,255,1)',
                textShadow: '0 0 8px rgba(255,255,255,1), 0 0 24px rgba(255,255,255,0.9), 0 0 60px rgba(255,255,255,0.5)',
                filter: 'brightness(1.4)',
              }}
            >
              {project.title}
            </h2>
          </div>
        </motion.div>

        {/* ── VIEW PROJECT button — overlapping the image bottom edge ── */}
        <div className="flex justify-center relative z-10" style={{ marginTop: '-1.4rem' }}>
          <Link
            to={`/portfolio/${project.id}`}
            className="group/btn relative inline-flex items-center gap-3 border-2 border-white/65 rounded-full px-14 py-[1.1rem] text-sm font-medium uppercase tracking-[0.2em] text-white overflow-hidden transition-colors duration-300 hover:border-transparent"
          >
            <span className="absolute inset-0 bg-accent-green rounded-full translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]" />
            <span className="relative z-10 group-hover/btn:text-bg transition-colors duration-300">
              View Project
            </span>
            <span className="relative z-10 group-hover/btn:text-bg transition-colors duration-300 text-base leading-none">
              ↗
            </span>
          </Link>
        </div>

      </div>
    </section>
  )
}

export default function PortfolioPage() {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    let animating = false
    let rafId: number | null = null

    function ease(t: number) {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
    }

    function scrollTo(target: number) {
      if (animating) return
      const start = el!.scrollTop
      if (Math.abs(target - start) < 1) return

      const startTime = performance.now()
      const duration = 950
      animating = true
      function step(now: number) {
        const progress = Math.min((now - startTime) / duration, 1)
        el!.scrollTop = start + (target - start) * ease(progress)
        if (progress < 1) {
          rafId = requestAnimationFrame(step)
        } else {
          el!.scrollTop = target
          animating = false
          rafId = null
        }
      }
      rafId = requestAnimationFrame(step)
    }

    function onWheel(e: WheelEvent) {
      e.preventDefault()
      if (animating) return
      const h = el!.clientHeight
      const idx = Math.round(el!.scrollTop / h)
      const sections = el!.querySelectorAll('.portfolio-snap-section')
      const next = Math.max(0, Math.min(sections.length - 1, idx + (e.deltaY > 0 ? 1 : -1)))
      scrollTo(next * h)
    }

    el!.addEventListener('wheel', onWheel, { passive: false })
    return () => {
      el!.removeEventListener('wheel', onWheel)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <div ref={scrollRef} className="portfolio-snap-container">
      <div className="portfolio-grain" aria-hidden="true" />

      {/* Confidentiality notice banner */}
      <div className="fixed top-16 left-1/2 -translate-x-1/2 z-40 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl px-10 py-6 max-w-4xl">
        <p className="text-base text-white/70 text-center">
          <span className="text-accent-green font-semibold">Note:</span> Client names, logos, and personal details have been modified to protect confidentiality.
        </p>
      </div>

      {/* Available badge — fixed bottom-left */}
      <div className="fixed bottom-8 left-8 z-50 flex items-start gap-2.5">
        <span className="mt-[3px] w-2 h-2 rounded-full bg-accent-green flex-shrink-0 animate-dot-blink" />
        <span className="text-[12px] font-semibold text-white uppercase tracking-[0.15em] leading-[1.4]">
          Currently Available<br />For New Projects
        </span>
      </div>

      {projects.map((project, i) => (
        <ProjectSection key={project.id} project={project} index={i} />
      ))}

      {/* CTA section */}
      <section className="portfolio-snap-section relative h-screen w-full flex flex-col items-center justify-center gap-8">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="font-display text-5xl md:text-7xl font-bold text-white text-center px-6"
        >
          Like what you see?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          viewport={{ once: true }}
          className="text-text-muted text-lg text-center px-6 max-w-md"
        >
          Let&apos;s create something remarkable for your business.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          viewport={{ once: true }}
        >
          <Link
            to="/contact"
            className="group/btn relative inline-flex items-center gap-3 border border-white/55 rounded-full px-14 py-[1.1rem] text-sm font-medium uppercase tracking-[0.2em] text-white overflow-hidden transition-colors duration-300 hover:border-transparent"
          >
            <span className="absolute inset-0 bg-accent-green rounded-full translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]" />
            <span className="relative z-10 group-hover/btn:text-bg transition-colors duration-300">
              Start a Project
            </span>
          </Link>
        </motion.div>
      </section>
    </div>
  )
}
