// WhatWeBuildSection.jsx — Service offerings grid with framer-motion stagger + cursor glow
import { useState } from "react"
import { motion } from "framer-motion"
import { useScrollReveal } from "../hooks/useScrollReveal"

/* ─── Minimal line icons (inline SVG) ─── */
const icons = {
    custom: (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="3" y="5" width="22" height="16" rx="2" />
            <path d="M9 21v2M19 21v2M6 23h16" />
            <path d="M8 11h3M8 15h7" />
            <circle cx="19" cy="13" r="2.5" />
        </svg>
    ),
    erp: (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="3" y="3" width="9" height="9" rx="1.5" />
            <rect x="16" y="3" width="9" height="9" rx="1.5" />
            <rect x="3" y="16" width="9" height="9" rx="1.5" />
            <rect x="16" y="16" width="9" height="9" rx="1.5" />
        </svg>
    ),
    inventory: (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M4 8l10-5 10 5v12l-10 5L4 20V8z" />
            <path d="M14 3v17M4 8l10 5 10-5" />
        </svg>
    ),
    exam: (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="5" y="3" width="18" height="22" rx="2" />
            <path d="M9 9h10M9 13h10M9 17h6" />
            <path d="M17 19l1.5 1.5L22 17" />
        </svg>
    ),
    automation: (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="14" cy="14" r="4" />
            <path d="M14 3v3M14 22v3M3 14h3M22 14h3" />
            <path d="M6.22 6.22l2.12 2.12M19.66 19.66l2.12 2.12M19.66 6.22l-2.12 2.12M6.22 19.66l2.12 2.12" />
        </svg>
    ),
    api: (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="7,10 3,14 7,18" />
            <polyline points="21,10 25,14 21,18" />
            <line x1="16" y1="6" x2="12" y2="22" />
        </svg>
    ),
}

const services = [
    { id: "custom", label: "Custom Business Systems", icon: icons.custom },
    { id: "erp", label: "ERP & Management Software", icon: icons.erp },
    { id: "inventory", label: "Inventory & Billing Systems", icon: icons.inventory },
    { id: "exam", label: "Examination Platforms", icon: icons.exam },
    { id: "automation", label: "Automation Tools", icon: icons.automation },
    { id: "api", label: "API & Backend Systems", icon: icons.api },
]

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } },
}

const cardVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
        opacity: 1, y: 0,
        transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    },
}

const ServiceCard = ({ icon, label }) => {
    const [hovered, setHovered] = useState(false)

    return (
        <motion.div
            variants={cardVariants}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "16px",
                padding: "36px 24px",
                backgroundColor: hovered ? "var(--bg-card-hover)" : "var(--bg-card)",
                border: `1px solid ${hovered ? "var(--border-hover)" : "var(--border-subtle)"}`,
                borderRadius: "12px",
                cursor: "default",
                textAlign: "center",
                transform: hovered ? "translateY(-6px)" : "translateY(0)",
                transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1), border-color 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease",
                boxShadow: hovered
                    ? "0 16px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(37,99,235,0.1), 0 0 20px rgba(37,99,235,0.06)"
                    : "0 2px 12px rgba(0,0,0,0.15)",
            }}
        >
            <span
                style={{
                    color: hovered ? "#3b82f6" : "var(--text-dim)",
                    transition: "color 0.3s ease, transform 0.4s cubic-bezier(0.16,1,0.3,1), filter 0.3s ease",
                    lineHeight: 0,
                    transform: hovered ? "scale(1.15)" : "scale(1)",
                    filter: hovered ? "drop-shadow(0 0 8px rgba(59,130,246,0.3))" : "none",
                }}
            >
                {icon}
            </span>

            <p
                style={{
                    margin: 0,
                    fontSize: "0.875rem",
                    fontWeight: 500,
                    letterSpacing: "0.01em",
                    color: hovered ? "var(--text-primary)" : "var(--text-muted)",
                    transition: "color 0.3s ease",
                    lineHeight: 1.4,
                }}
            >
                {label}
            </p>
        </motion.div>
    )
}

const WhatWeBuildSection = () => {
    const { ref, isVisible: visible } = useScrollReveal({ threshold: 0.15 })

    return (
        <>
            <style>{`
        .wwb-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }
        @media (max-width: 900px) {
          .wwb-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 540px) {
          .wwb-grid { grid-template-columns: 1fr; }
        }
      `}</style>

            <section
                ref={ref}
                id="what-we-build"
                style={{
                    backgroundColor: "var(--bg-primary)",
                    padding: "120px 7vw",
                }}
            >
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={visible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                    style={{ marginBottom: "64px" }}
                >
                    <p
                        style={{
                            margin: "0 0 12px",
                            fontSize: "0.72rem",
                            fontWeight: 600,
                            letterSpacing: "0.2em",
                            textTransform: "uppercase",
                            color: "var(--text-muted)",
                        }}
                    >
                        Our Expertise
                    </p>
                    <h2
                        className="text-transparent bg-clip-text"
                        style={{
                            margin: 0,
                            fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)",
                            fontWeight: 700,
                            letterSpacing: "-0.03em",
                            backgroundImage: "linear-gradient(160deg, #f8fafc 50%, #94a3b8 100%)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                        }}
                    >
                        What We Build
                    </h2>
                </motion.div>

                {/* Cards grid — staggered */}
                <motion.div
                    className="wwb-grid"
                    variants={containerVariants}
                    initial="hidden"
                    animate={visible ? "visible" : "hidden"}
                >
                    {services.map(({ id, label, icon }) => (
                        <ServiceCard key={id} icon={icon} label={label} />
                    ))}
                </motion.div>
            </section>
        </>
    )
}

export default WhatWeBuildSection
