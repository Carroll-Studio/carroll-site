import { useState, useEffect, useRef, useCallback } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { label: 'Work', to: '/portfolio' },
  { label: 'About', to: '/about' },
]

const LOGO_TEXT = 'Cohesium'
const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

function useScramble(target: string) {
  const [display, setDisplay] = useState(target)
  const rafRef = useRef<number | null>(null)

  const scramble = useCallback(() => {
    if (rafRef.current != null) cancelAnimationFrame(rafRef.current)

    const total = 300      // ms of full scramble before settling
    const settle = 200     // ms to settle left-to-right after scramble
    const start = performance.now()

    function tick(now: number) {
      const elapsed = now - start

      if (elapsed < total) {
        // Pure random scramble phase
        const result = target
          .split('')
          .map(() => CHARS[Math.floor(Math.random() * CHARS.length)])
          .join('')
        setDisplay(result)
        rafRef.current = requestAnimationFrame(tick)
      } else {
        // Settle left-to-right over `settle` ms
        const settleElapsed = elapsed - total
        const progress = Math.min(settleElapsed / settle, 1)
        const fixedCount = Math.floor(progress * target.length)
        const result = target
          .split('')
          .map((ch, i) =>
            i < fixedCount ? ch : CHARS[Math.floor(Math.random() * CHARS.length)]
          )
          .join('')
        setDisplay(result)
        if (progress < 1) {
          rafRef.current = requestAnimationFrame(tick)
        } else {
          setDisplay(target)
          rafRef.current = null
        }
      }
    }

    rafRef.current = requestAnimationFrame(tick)
  }, [target])

  useEffect(() => () => { if (rafRef.current != null) cancelAnimationFrame(rafRef.current) }, [])

  return { display, scramble }
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()
  const { display: logoDisplay, scramble: runScramble } = useScramble(LOGO_TEXT)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 80)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsMenuOpen(false)
  }, [location.pathname, location.hash])

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isMenuOpen])

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? 'bg-bg/90 backdrop-blur-md'
            : 'bg-transparent'
        }`}
      >
        <div className="w-full px-6 md:px-10 flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="relative z-50 group shrink-0" onMouseEnter={runScramble}>
            <span className="font-display text-4xl font-bold tracking-tight text-text">
              {logoDisplay}
            </span>
            <span className="text-accent-green text-4xl">.</span>
          </Link>

          {/* Desktop nav — evenly spaced */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.to || location.pathname.startsWith(link.to + '/')
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className="relative group"
                >
                  <span className={`text-sm font-medium transition-colors duration-300 ${
                    isActive
                      ? 'text-text'
                      : 'text-text-muted hover:text-text'
                  }`}>
                    {link.label}
                  </span>
                  {isActive && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute -bottom-1 left-0 right-0 h-px bg-accent-green"
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </Link>
              )
            })}

            <Link
              to="/contact"
              className="text-sm font-medium text-bg bg-accent-green px-5 py-2.5 rounded-full hover:bg-accent-beige transition-colors duration-300"
            >
              Let&apos;s talk
            </Link>
          </div>

          {/* Hamburger */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="relative z-50 md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5"
            aria-label="Toggle menu"
          >
            <motion.span
              animate={isMenuOpen ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
              className="block w-6 h-0.5 bg-text"
            />
            <motion.span
              animate={isMenuOpen ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
              className="block w-6 h-0.5 bg-text"
            />
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 bg-bg flex items-center justify-center"
          >
            <nav className="flex flex-col items-center gap-10">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 40 }}
                  transition={{ duration: 0.5, delay: 0.1 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    to={link.to}
                    className="font-display text-6xl font-bold text-text hover:text-accent-green transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
