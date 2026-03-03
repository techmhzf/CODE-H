// StartupSection.jsx — Business automation startup showcase with framer-motion
import { useState } from "react"
import { motion } from "framer-motion"
import { useScrollReveal } from "../hooks/useScrollReveal"

/* ─── Icons ─── */
const AutomateIcon = () => (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="14" cy="14" r="4" />
        <path d="M14 3v3M14 22v3M3 14h3M22 14h3" />
        <path d="M6.22 6.22l2.12 2.12M19.66 19.66l2.12 2.12M19.66 6.22l-2.12 2.12M6.22 19.66l2.12 2.12" />
    </svg>
)

const IdentityIcon = () => (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="5" width="22" height="18" rx="2" />
        <circle cx="10" cy="13" r="3" />
        <path d="M16 11h5M16 15h3" />
        <path d="M5 23c0-2 2.5-4 5-4s5 2 5 4" />
    </svg>
)

const ScaleIcon = () => (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M22 12V6H16" />
        <path d="M6 16v6h6" />
        <path d="M22 6L15 13" />
        <path d="M6 22l7-7" />
    </svg>
)

const features = [
    {
        id: "automate",
        icon: <AutomateIcon />,
        title: "Automate Manual Work",
        description: "We eliminate repetitive business processes with custom-built automation systems.",
        accent: "#8b5cf6",
    },
    {
        id: "identity",
        icon: <IdentityIcon />,
        title: "Build Digital Identity",
        description: "We create complete digital presence — websites, dashboards, and branded platforms.",
        accent: "#3b82f6",
    },
    {
        id: "solutions",
        icon: <ScaleIcon />,
        title: "Custom Business Solutions",
        description: "Tailored software built for your exact workflow — inventory, billing, CRM, and more.",
        accent: "#10b981",
    },
]

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
}

const cardVariants = {
    hidden: { opacity: 0, y: 28 },
    visible: {
        opacity: 1, y: 0,
        transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    },
}

const FeatureCard = ({ feature }) => {
    const [hovered, setHovered] = useState(false)

    return (
        <motion.div
            variants={cardVariants}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                padding: "32px 28px",
                backgroundColor: hovered ? "var(--bg-card-hover)" : "var(--bg-card)",
                border: `1px solid ${hovered ? `${feature.accent}55` : "var(--border-subtle)"}`,
                borderRadius: "14px",
                display: "flex",
                flexDirection: "column",
                gap: "18px",
                cursor: "default",
                position: "relative",
                overflow: "hidden",
                transform: hovered ? "translateY(-6px)" : "translateY(0)",
                transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1), border-color 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease",
                boxShadow: hovered
                    ? `0 20px 48px -8px rgba(0,0,0,0.5), 0 0 0 1px ${feature.accent}18, 0 0 28px ${feature.accent}08`
                    : "0 2px 12px rgba(0,0,0,0.15)",
            }}
        >
            {/* Top accent on hover */}
            <div style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "2px",
                background: `linear-gradient(90deg, transparent, ${feature.accent}, transparent)`,
                opacity: hovered ? 1 : 0,
                transition: "opacity 0.4s ease",
            }} />

            {/* Icon */}
            <div style={{
                width: "48px",
                height: "48px",
                borderRadius: "10px",
                background: `${feature.accent}12`,
                border: `1px solid ${feature.accent}20`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: hovered ? feature.accent : "var(--text-dim)",
                transition: "color 0.3s ease, transform 0.4s cubic-bezier(0.16,1,0.3,1)",
                transform: hovered ? "scale(1.08)" : "scale(1)",
            }}>
                {feature.icon}
            </div>

            {/* Title */}
            <h3 style={{
                margin: 0,
                fontSize: "1.05rem",
                fontWeight: 650,
                color: hovered ? "var(--text-primary)" : "var(--text-secondary)",
                letterSpacing: "-0.01em",
                transition: "color 0.3s ease",
            }}>
                {feature.title}
            </h3>

            {/* Description */}
            <p style={{
                margin: 0,
                fontSize: "0.85rem",
                color: "var(--text-muted)",
                lineHeight: 1.55,
                letterSpacing: "0.01em",
            }}>
                {feature.description}
            </p>
        </motion.div>
    )
}

const StartupSection = () => {
    const { ref, isVisible: visible } = useScrollReveal({ threshold: 0.1 })

    return (
        <>
            <style>{`
                .startup-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 20px;
                }
                @media (max-width: 900px) {
                    .startup-grid { grid-template-columns: repeat(2, 1fr); }
                }
                @media (max-width: 560px) {
                    .startup-grid { grid-template-columns: 1fr; }
                }
            `}</style>

            <section
                ref={ref}
                id="startup"
                style={{
                    backgroundColor: "var(--bg-secondary)",
                    padding: "120px 7vw",
                }}
            >
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={visible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                    style={{ marginBottom: "56px" }}
                >
                    <p
                        style={{
                            margin: "0 0 12px",
                            fontSize: "0.72rem",
                            fontWeight: 600,
                            letterSpacing: "0.2em",
                            textTransform: "uppercase",
                            color: "var(--accent-violet)",
                        }}
                    >
                        Our Startup
                    </p>
                    <h2
                        className="text-transparent bg-clip-text"
                        style={{
                            margin: "0 0 20px",
                            fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)",
                            fontWeight: 700,
                            letterSpacing: "-0.03em",
                            backgroundImage: "linear-gradient(160deg, #f8fafc 50%, #94a3b8 100%)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                        }}
                    >
                        Digitize. Automate. Scale.
                    </h2>
                    <p
                        style={{
                            margin: 0,
                            fontSize: "1rem",
                            color: "var(--text-muted)",
                            maxWidth: "520px",
                            lineHeight: 1.6,
                        }}
                    >
                        We run a startup focused on helping businesses eliminate manual work,
                        automate their repetitive processes, and build a strong digital identity
                        — from custom software to full online presence.
                    </p>

                    {/* CTA Button */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={visible ? { opacity: 1, scale: 1 } : {}}
                        transition={{ delay: 0.3, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        style={{ marginTop: "32px" }}
                    >
                        <a
                            href="https://www.chdigitalsolutions.in/"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                justifyContent: "center",
                                padding: "14px 32px",
                                background: "linear-gradient(135deg, #2563eb, #3b82f6, #6366f1)",
                                backgroundSize: "200% auto",
                                color: "#fff",
                                fontSize: "0.875rem",
                                fontWeight: 700,
                                letterSpacing: "0.03em",
                                borderRadius: "12px",
                                border: "1px solid rgba(59,130,246,0.3)",
                                textDecoration: "none",
                                transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
                                boxShadow: "0 8px 32px -8px rgba(37,99,235,0.4)",
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.boxShadow = "0 12px 48px -8px rgba(37,99,235,0.6)"
                                e.currentTarget.style.transform = "translateY(-3px) scale(1.02)"
                                e.currentTarget.style.backgroundPosition = "right center"
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.boxShadow = "0 8px 32px -8px rgba(37,99,235,0.4)"
                                e.currentTarget.style.transform = "translateY(0) scale(1)"
                                e.currentTarget.style.backgroundPosition = "left center"
                            }}
                        >
                            Work with Us
                            <svg
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                style={{ marginLeft: "8px" }}
                            >
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </a>
                    </motion.div>
                </motion.div>

                {/* Feature cards grid — staggered */}
                <motion.div
                    className="startup-grid"
                    variants={containerVariants}
                    initial="hidden"
                    animate={visible ? "visible" : "hidden"}
                >
                    {features.map((feature) => (
                        <FeatureCard key={feature.id} feature={feature} />
                    ))}
                </motion.div>
            </section>
        </>
    )
}

export default StartupSection
