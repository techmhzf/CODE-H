// Footer.jsx — Expanded with CTA banner, social links, and gradient divider
import { motion } from "framer-motion"
import { useScrollReveal } from "../hooks/useScrollReveal"

/* Social Icons */
const GithubIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
)

const LinkedInIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
)

const TwitterIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
)

const ArrowIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <line x1="5" y1="12" x2="19" y2="12" />
        <polyline points="12 5 19 12 12 19" />
    </svg>
)

const socialLinks = [
    { icon: <GithubIcon />, href: "https://github.com/techmhzf", label: "GitHub" },
    { icon: <LinkedInIcon />, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: <TwitterIcon />, href: "https://x.com", label: "X / Twitter" },
]

const footerLinks = [
    { label: "Home", href: "#home" },
    { label: "Achievements", href: "#achievements" },
    { label: "Projects", href: "#featured-projects" },
    { label: "Tech Stack", href: "#tech-stack" },
    { label: "Team", href: "#team" },
]

const Footer = () => {
    const { ref, isVisible: visible } = useScrollReveal({ threshold: 0.1 })

    return (
        <footer
            ref={ref}
            style={{ backgroundColor: "var(--bg-secondary)" }}
        >


            {/* ── Footer Bottom ── */}
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={visible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="footer-inner"
                style={{
                    padding: "48px 7vw 40px",
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    gap: "40px",
                }}
            >
                {/* Brand column */}
                <div style={{ maxWidth: "280px" }}>
                    <h3 style={{
                        margin: "0 0 10px",
                        fontSize: "0.82rem",
                        fontWeight: 800,
                        letterSpacing: "0.14em",
                        color: "var(--text-primary)",
                        textTransform: "uppercase",
                    }}>
                        CODE-H
                    </h3>
                    <p style={{
                        margin: "0 0 20px",
                        fontSize: "0.82rem",
                        color: "var(--text-dim)",
                        lineHeight: 1.6,
                    }}>
                        Engineering scalable digital systems for real-world businesses.
                    </p>

                    {/* Social icons */}
                    <div className="footer-social-row" style={{ display: "flex", gap: "12px" }}>
                        {socialLinks.map(({ icon, href, label }) => (
                            <a
                                key={label}
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                title={label}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    width: "36px",
                                    height: "36px",
                                    borderRadius: "8px",
                                    background: "rgba(255,255,255,0.04)",
                                    border: "1px solid var(--border-subtle)",
                                    color: "var(--text-dim)",
                                    transition: "all 0.3s ease",
                                    textDecoration: "none",
                                }}
                                onMouseEnter={e => {
                                    e.currentTarget.style.color = "var(--accent-blue-light)"
                                    e.currentTarget.style.borderColor = "rgba(59,130,246,0.3)"
                                    e.currentTarget.style.background = "rgba(59,130,246,0.08)"
                                    e.currentTarget.style.transform = "translateY(-2px)"
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.color = "var(--text-dim)"
                                    e.currentTarget.style.borderColor = "var(--border-subtle)"
                                    e.currentTarget.style.background = "rgba(255,255,255,0.04)"
                                    e.currentTarget.style.transform = "translateY(0)"
                                }}
                            >
                                {icon}
                            </a>
                        ))}
                    </div>
                </div>

                {/* Quick links */}
                <div>
                    <h4 style={{
                        margin: "0 0 16px",
                        fontSize: "0.7rem",
                        fontWeight: 600,
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        color: "var(--text-muted)",
                    }}>
                        Quick Links
                    </h4>
                    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                        {footerLinks.map(({ label, href }) => (
                            <a
                                key={href}
                                href={href}
                                style={{
                                    fontSize: "0.82rem",
                                    color: "var(--text-dim)",
                                    textDecoration: "none",
                                    transition: "color 0.2s ease",
                                }}
                                onMouseEnter={e => e.currentTarget.style.color = "var(--text-primary)"}
                                onMouseLeave={e => e.currentTarget.style.color = "var(--text-dim)"}
                            >
                                {label}
                            </a>
                        ))}
                    </div>
                </div>
            </motion.div>

            {/* ── Copyright ── */}
            <div style={{
                padding: "20px 7vw",
                borderTop: "1px solid rgba(255,255,255,0.04)",
            }}>
                <p style={{
                    margin: 0,
                    fontSize: "0.7rem",
                    color: "rgba(100,116,139,0.5)",
                    letterSpacing: "0.1em",
                    textAlign: "center",
                }}>
                    © {new Date().getFullYear()} CODE-H. All rights reserved.
                </p>
            </div>
        </footer>
    )
}

export default Footer
