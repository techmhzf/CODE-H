// Navbar.jsx — Floating glassmorphic navbar with hamburger menu on mobile
import { useState, useEffect, useCallback, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"

const navLinks = [
    { label: "Home", href: "#home" },
    { label: "Achievements", href: "#achievements" },
    { label: "Projects", href: "#featured-projects" },
    { label: "Tech Stack", href: "#tech-stack" },
    { label: "Team", href: "#team" },
]

const Navbar = () => {
    const [visible, setVisible] = useState(true)
    const [activeSection, setActiveSection] = useState("home")
    const [scrolled, setScrolled] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 640)
    const ticking = useRef(false)

    // Detect mobile
    useEffect(() => {
        const onResize = () => setIsMobile(window.innerWidth <= 640)
        window.addEventListener("resize", onResize)
        return () => window.removeEventListener("resize", onResize)
    }, [])

    // Close menu on resize to desktop
    useEffect(() => {
        if (!isMobile) setMenuOpen(false)
    }, [isMobile])

    const handleScroll = useCallback(() => {
        const currentY = window.scrollY
        setScrolled(currentY > 40)
        ticking.current = false
    }, [])

    useEffect(() => {
        const onScroll = () => {
            if (!ticking.current) {
                ticking.current = true
                requestAnimationFrame(handleScroll)
            }
        }
        window.addEventListener("scroll", onScroll, { passive: true })
        return () => window.removeEventListener("scroll", onScroll)
    }, [handleScroll])

    // Active section tracking via IntersectionObserver
    useEffect(() => {
        const sectionIds = ["home", "achievements", "featured-projects", "tech-stack", "team"]
        const observers = []

        sectionIds.forEach((id) => {
            const el = document.getElementById(id)
            if (!el) return
            const obs = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) setActiveSection(id)
                },
                { threshold: 0.3, rootMargin: "-80px 0px -40% 0px" }
            )
            obs.observe(el)
            observers.push(obs)
        })

        return () => observers.forEach((o) => o.disconnect())
    }, [])

    const handleClick = (e, href) => {
        e.preventDefault()
        const id = href.replace("#", "")
        const el = document.getElementById(id)
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
        setMenuOpen(false)
    }

    const glassStyle = {
        background: scrolled ? "rgba(10, 10, 18, 0.5)" : "rgba(10, 10, 18, 0.28)",
        backdropFilter: "blur(32px) saturate(1.8)",
        WebkitBackdropFilter: "blur(32px) saturate(1.8)",
        border: `1px solid ${scrolled ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.08)"}`,
        boxShadow: scrolled
            ? "0 8px 32px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.06) inset"
            : "0 4px 24px rgba(0,0,0,0.15), 0 0 0 1px rgba(255,255,255,0.04) inset",
        transition: "background 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease",
    }

    return (
        <AnimatePresence>
            {visible && (
                <>
                    {/* ── Main pill navbar ── */}
                    <motion.nav
                        initial={{ y: -80, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -80, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="navbar-container"
                        style={{
                            position: "fixed",
                            top: "40px",
                            left: 0,
                            right: 0,
                            margin: "0 auto",
                            width: "fit-content",
                            zIndex: 9999,
                            display: "flex",
                            alignItems: "center",
                            gap: "6px",
                            padding: "16px 28px",
                            borderRadius: "9999px",
                            ...glassStyle,
                        }}
                    >
                        {/* Brand */}
                        <a
                            href="#home"
                            onClick={(e) => handleClick(e, "#home")}
                            style={{
                                fontSize: "0.76rem",
                                fontWeight: 800,
                                letterSpacing: "0.12em",
                                color: "#f8fafc",
                                textDecoration: "none",
                                padding: "8px 16px 8px 14px",
                                whiteSpace: "nowrap",
                                userSelect: "none",
                            }}
                        >
                            CODE-H
                        </a>

                        {/* Divider — hidden on mobile */}
                        {!isMobile && (
                            <div
                                style={{
                                    width: "1px",
                                    height: "16px",
                                    background: "rgba(255,255,255,0.1)",
                                    flexShrink: 0,
                                }}
                            />
                        )}

                        {/* Desktop nav links */}
                        {!isMobile && navLinks.map(({ label, href }) => {
                            const isActive = activeSection === href.replace("#", "")
                            return (
                                <a
                                    key={href}
                                    href={href}
                                    onClick={(e) => handleClick(e, href)}
                                    className="nav-link"
                                    style={{
                                        position: "relative",
                                        fontSize: "0.73rem",
                                        fontWeight: 500,
                                        letterSpacing: "0.03em",
                                        color: isActive ? "#ffffff" : "#94a3b8",
                                        textDecoration: "none",
                                        padding: "12px 20px",
                                        borderRadius: "999px",
                                        background: isActive ? "rgba(255,255,255,0.08)" : "transparent",
                                        transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                                        whiteSpace: "nowrap",
                                        userSelect: "none",
                                    }}
                                >
                                    {label}
                                </a>
                            )
                        })}

                        {/* Hamburger button — mobile only */}
                        {isMobile && (
                            <button
                                onClick={() => setMenuOpen((o) => !o)}
                                aria-label={menuOpen ? "Close menu" : "Open menu"}
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    gap: "5px",
                                    width: "36px",
                                    height: "36px",
                                    padding: "6px",
                                    background: "transparent",
                                    border: "none",
                                    cursor: "pointer",
                                    borderRadius: "8px",
                                    flexShrink: 0,
                                }}
                            >
                                <motion.span
                                    animate={menuOpen
                                        ? { rotate: 45, y: 7, width: "20px" }
                                        : { rotate: 0, y: 0, width: "20px" }}
                                    style={{
                                        display: "block",
                                        height: "2px",
                                        background: "#f8fafc",
                                        borderRadius: "2px",
                                        transformOrigin: "center",
                                    }}
                                    transition={{ duration: 0.25 }}
                                />
                                <motion.span
                                    animate={menuOpen
                                        ? { opacity: 0, scaleX: 0 }
                                        : { opacity: 1, scaleX: 1 }}
                                    style={{
                                        display: "block",
                                        height: "2px",
                                        width: "20px",
                                        background: "#94a3b8",
                                        borderRadius: "2px",
                                    }}
                                    transition={{ duration: 0.2 }}
                                />
                                <motion.span
                                    animate={menuOpen
                                        ? { rotate: -45, y: -7, width: "20px" }
                                        : { rotate: 0, y: 0, width: "20px" }}
                                    style={{
                                        display: "block",
                                        height: "2px",
                                        background: "#f8fafc",
                                        borderRadius: "2px",
                                        transformOrigin: "center",
                                    }}
                                    transition={{ duration: 0.25 }}
                                />
                            </button>
                        )}
                    </motion.nav>

                    {/* ── Mobile dropdown menu ── */}
                    <AnimatePresence>
                        {isMobile && menuOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: -12, scale: 0.97 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -12, scale: 0.97 }}
                                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                                style={{
                                    position: "fixed",
                                    top: "110px",
                                    left: "50%",
                                    transform: "translateX(-50%)",
                                    zIndex: 9998,
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "4px",
                                    padding: "12px",
                                    borderRadius: "20px",
                                    minWidth: "200px",
                                    background: "rgba(10, 10, 18, 0.92)",
                                    backdropFilter: "blur(32px) saturate(1.8)",
                                    WebkitBackdropFilter: "blur(32px) saturate(1.8)",
                                    border: "1px solid rgba(255,255,255,0.1)",
                                    boxShadow: "0 24px 64px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04) inset",
                                }}
                            >
                                {navLinks.map(({ label, href }) => {
                                    const isActive = activeSection === href.replace("#", "")
                                    return (
                                        <a
                                            key={href}
                                            href={href}
                                            onClick={(e) => handleClick(e, href)}
                                            style={{
                                                display: "block",
                                                padding: "12px 20px",
                                                borderRadius: "12px",
                                                fontSize: "0.9rem",
                                                fontWeight: isActive ? 600 : 400,
                                                color: isActive ? "#ffffff" : "#94a3b8",
                                                textDecoration: "none",
                                                background: isActive ? "rgba(255,255,255,0.08)" : "transparent",
                                                transition: "all 0.2s ease",
                                                letterSpacing: "0.01em",
                                            }}
                                            onMouseEnter={e => {
                                                e.currentTarget.style.background = "rgba(255,255,255,0.06)"
                                                e.currentTarget.style.color = "#e2e8f0"
                                            }}
                                            onMouseLeave={e => {
                                                e.currentTarget.style.background = isActive ? "rgba(255,255,255,0.08)" : "transparent"
                                                e.currentTarget.style.color = isActive ? "#ffffff" : "#94a3b8"
                                            }}
                                        >
                                            {label}
                                        </a>
                                    )
                                })}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </>
            )}
        </AnimatePresence>
    )
}

export default Navbar
