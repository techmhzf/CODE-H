// AchievementsSection.jsx — SIH-2025 Hackathon win with animated counters & framer-motion
import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { useScrollReveal } from "../hooks/useScrollReveal"

/* ─── Icons ─── */
const TrophyIcon = () => (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M10 6h12v10a6 6 0 0 1-6 6 6 6 0 0 1-6-6V6z" />
        <path d="M10 10H6a2 2 0 0 0-2 2v1a4 4 0 0 0 4 4h2" />
        <path d="M22 10h4a2 2 0 0 1 2 2v1a4 4 0 0 1-4 4h-2" />
        <path d="M16 22v4" />
        <path d="M11 26h10" />
    </svg>
)

const GlobeIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10A15.3 15.3 0 0 1 12 2z" />
    </svg>
)

const RocketIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
        <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
        <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
        <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
)

const CheckCircleIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
)

const stats = [
    {
        id: "sih",
        icon: <TrophyIcon />,
        value: "SIH 2025",
        label: "National Hackathon Winners",
        accent: "#f59e0b",
    },
    {
        id: "ministry",
        icon: <GlobeIcon />,
        value: "Ministry of Earth Sciences",
        label: "Government Problem Statement",
        accent: "#3b82f6",
    },
    {
        id: "projects",
        icon: <RocketIcon />,
        value: "Multiple",
        label: "Real-World Projects Delivered",
        accent: "#8b5cf6",
    },
    {
        id: "solved",
        icon: <CheckCircleIcon />,
        value: "Problem-First",
        label: "Engineering Approach",
        accent: "#10b981",
    },
]

const containerVariants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.1, delayChildren: 0.15 },
    },
}

const cardVariants = {
    hidden: { opacity: 0, y: 28 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    },
}

const StatCard = ({ stat }) => {
    const [hovered, setHovered] = useState(false)

    return (
        <motion.div
            variants={cardVariants}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                padding: "28px 24px",
                backgroundColor: hovered ? "var(--bg-card-hover)" : "var(--bg-card)",
                border: `1px solid ${hovered ? `${stat.accent}55` : "var(--border-subtle)"}`,
                borderRadius: "14px",
                display: "flex",
                flexDirection: "column",
                gap: "14px",
                cursor: "default",
                transform: hovered ? "translateY(-6px)" : "translateY(0)",
                transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1), border-color 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease",
                boxShadow: hovered
                    ? `0 16px 40px -8px rgba(0,0,0,0.5), 0 0 0 1px ${stat.accent}18, 0 0 24px ${stat.accent}08`
                    : "0 2px 12px rgba(0,0,0,0.15)",
            }}
        >
            <span
                style={{
                    color: hovered ? stat.accent : "var(--text-dim)",
                    transition: "color 0.3s ease, transform 0.4s cubic-bezier(0.16,1,0.3,1)",
                    transform: hovered ? "scale(1.12)" : "scale(1)",
                    lineHeight: 0,
                    display: "inline-block",
                }}
            >
                {stat.icon}
            </span>

            <div>
                <p style={{
                    margin: "0 0 4px",
                    fontSize: "1.15rem",
                    fontWeight: 700,
                    color: "var(--text-primary)",
                    letterSpacing: "-0.01em",
                }}>
                    {stat.value}
                </p>
                <p style={{
                    margin: 0,
                    fontSize: "0.78rem",
                    color: "var(--text-muted)",
                    lineHeight: 1.4,
                    letterSpacing: "0.01em",
                }}>
                    {stat.label}
                </p>
            </div>
        </motion.div>
    )
}

const AchievementsSection = () => {
    const { ref, isVisible: visible } = useScrollReveal({ threshold: 0.1 })

    return (
        <>
            <style>{`
                .ach-grid {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 16px;
                }
                @media (max-width: 1024px) {
                    .ach-grid { grid-template-columns: repeat(2, 1fr); }
                }
                @media (max-width: 580px) {
                    .ach-grid { grid-template-columns: 1fr; }
                }
            `}</style>

            <section
                ref={ref}
                id="achievements"
                style={{
                    backgroundColor: "var(--bg-primary)",
                    padding: "clamp(56px, 10vw, 120px) 7vw",
                }}
            >
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={visible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                    style={{ marginBottom: "48px" }}
                >
                    <p
                        style={{
                            margin: "0 0 12px",
                            fontSize: "0.72rem",
                            fontWeight: 600,
                            letterSpacing: "0.2em",
                            textTransform: "uppercase",
                            color: "var(--accent-amber)",
                        }}
                    >
                        Achievements
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
                        Building Solutions That Matter
                    </h2>
                    <p
                        style={{
                            margin: 0,
                            fontSize: "1rem",
                            color: "var(--text-muted)",
                            maxWidth: "560px",
                            lineHeight: 1.6,
                        }}
                    >
                        We competed at the national level in Smart India Hackathon 2025, solved a real
                        problem statement issued by the <strong style={{ color: "var(--text-secondary)" }}>Ministry of Earth Sciences</strong>,
                        and won. We continue to build real-world, problem-solving systems.
                    </p>
                </motion.div>

                {/* Highlight Banner */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={visible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="ach-banner"
                    style={{
                        marginBottom: "32px",
                        padding: "28px 32px",
                        background: "linear-gradient(135deg, rgba(245,158,11,0.06) 0%, rgba(245,158,11,0.02) 100%)",
                        border: "1px solid rgba(245,158,11,0.15)",
                        borderRadius: "14px",
                        display: "flex",
                        alignItems: "center",
                        gap: "20px",
                        flexWrap: "wrap",
                    }}
                >
                    <div style={{
                        width: "56px",
                        height: "56px",
                        borderRadius: "12px",
                        background: "rgba(245,158,11,0.1)",
                        border: "1px solid rgba(245,158,11,0.2)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#f59e0b",
                        flexShrink: 0,
                    }}>
                        <TrophyIcon />
                    </div>

                    <div style={{ flex: 1, minWidth: "200px" }}>
                        <p style={{
                            margin: "0 0 4px",
                            fontSize: "0.68rem",
                            fontWeight: 700,
                            letterSpacing: "0.14em",
                            textTransform: "uppercase",
                            color: "#f59e0b",
                        }}>
                            🏆 Smart India Hackathon 2025 — Winners
                        </p>
                        <p style={{
                            margin: 0,
                            fontSize: "0.92rem",
                            color: "var(--text-secondary)",
                            lineHeight: 1.5,
                        }}>
                            Solved a national-level problem statement for the Ministry of Earth Sciences, Government of India.
                        </p>
                    </div>
                </motion.div>

                {/* Stats grid — staggered */}
                <motion.div
                    className="ach-grid"
                    variants={containerVariants}
                    initial="hidden"
                    animate={visible ? "visible" : "hidden"}
                >
                    {stats.map((stat) => (
                        <StatCard key={stat.id} stat={stat} />
                    ))}
                </motion.div>
            </section>
        </>
    )
}

export default AchievementsSection
