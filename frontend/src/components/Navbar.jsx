// Navbar.jsx — Floating glassmorphic centered navbar with smart-hide
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
    const ticking = useRef(false)

    // Smart-hide: show on scroll-up, hide on scroll-down
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
                    if (entry.isIntersecting) {
                        setActiveSection(id)
                    }
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
        if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" })
        }
    }

    return (
        <AnimatePresence>
            {visible && (
                <motion.nav
                    initial={{ y: -80, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -80, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="navbar-container"
                    style={{
                        position: "fixed",
                        top: "16px",
                        left: 0,
                        right: 0,
                        margin: "0 auto",
                        width: "fit-content",
                        zIndex: 9999,
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        padding: "16px 28px",
                        borderRadius: "999px",
                        /* Glass effect — strong translucency */
                        background: scrolled
                            ? "rgba(10, 10, 18, 0.4)"
                            : "rgba(10, 10, 18, 0.22)",
                        backdropFilter: "blur(32px) saturate(1.8)",
                        WebkitBackdropFilter: "blur(32px) saturate(1.8)",
                        border: `1px solid ${scrolled ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.08)"}`,
                        boxShadow: scrolled
                            ? "0 8px 32px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.06) inset, 0 0 80px -20px rgba(37,99,235,0.06)"
                            : "0 4px 24px rgba(0,0,0,0.15), 0 0 0 1px rgba(255,255,255,0.04) inset",
                        transition: "background 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease",
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

                    {/* Divider */}
                    <div
                        style={{
                            width: "1px",
                            height: "16px",
                            background: "rgba(255,255,255,0.1)",
                            flexShrink: 0,
                        }}
                    />

                    {/* Nav links */}
                    {navLinks.map(({ label, href }) => {
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

                    {/* Contact CTA */}
                    <a
                        href="mailto:contact@codeh.com"
                        className="nav-cta"
                        style={{
                            fontSize: "0.72rem",
                            fontWeight: 600,
                            letterSpacing: "0.04em",
                            color: "#ffffff",
                            textDecoration: "none",
                            padding: "12px 24px",
                            borderRadius: "999px",
                            background: "linear-gradient(135deg, #2563eb, #3b82f6)",
                            border: "1px solid rgba(59,130,246,0.3)",
                            whiteSpace: "nowrap",
                            transition: "all 0.3s ease",
                            boxShadow: "0 2px 12px rgba(37,99,235,0.25)",
                        }}
                    >
                        Contact
                    </a>
                </motion.nav>
            )}
        </AnimatePresence>
    )
}

export default Navbar
