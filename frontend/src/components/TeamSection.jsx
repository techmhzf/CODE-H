// TeamSection.jsx — Engineering team with framer-motion stagger + enhanced cards
import { useState } from "react"
import { motion } from "framer-motion"
import { useScrollReveal } from "../hooks/useScrollReveal"

const team = [
    {
        name: "Faraaz",
        role: "Frontend Developer & UI/UX Designer",
        spec: "Design Systems • User Experience • Responsive Interfaces",
        bio: "Focuses on crafting intuitive interfaces and scalable frontend architectures that enhance user interaction and performance.",
        github: "https://github.com/Faraaz1806"
    },
    {
        name: "Huzaifa",
        role: "App Developer & UI/UX Specialist",
        spec: "Cross-Platform Apps • System Thinking • Experience Design",
        bio: "Builds structured mobile applications with strong UI logic, user flow optimization, and performance-focused architecture.",
        github: "https://github.com/techmhzf"
    },
    {
        name: "Taufique",
        role: "Backend Engineer & Deployment Specialist",
        spec: "API Architecture • Database Design • Cloud Deployment",
        bio: "Designs scalable backend systems, secure APIs, and handles deployment pipelines with performance optimization.",
        github: "https://github.com/TaufiqueUmar"
    },
    {
        name: "Shahid",
        role: "Blockchain Engineer & System Designer",
        spec: "Smart Contracts • Distributed Systems • System Architecture",
        bio: "Specializes in blockchain-based solutions and robust system design for secure and scalable digital infrastructures.",
        github: "https://github.com/InputBlock"
    },
]

const GithubIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
    </svg>
)

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

const MemberCard = ({ member }) => {
    const [hovered, setHovered] = useState(false)

    // Single first-letter initial for avatar badge
    const initials = member.name[0].toUpperCase()

    return (
        <motion.div
            variants={cardVariants}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                position: "relative",
                padding: "32px 24px",
                backgroundColor: hovered ? "var(--bg-card-hover)" : "var(--bg-card)",
                border: `1px solid ${hovered ? "var(--border-hover)" : "var(--border-subtle)"}`,
                borderRadius: "14px",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "16px",
                cursor: "default",
                overflow: "hidden",
                transform: hovered ? "translateY(-6px)" : "translateY(0)",
                transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1), border-color 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease",
                boxShadow: hovered
                    ? "0 16px 40px -8px rgba(0,0,0,0.5), 0 0 0 1px rgba(37,99,235,0.1)"
                    : "0 2px 12px rgba(0,0,0,0.1)",
            }}
        >
            {/* Top accent line */}
            <div style={{
                position: "absolute",
                top: 0,
                left: "24px",
                right: "24px",
                height: "1px",
                background: "linear-gradient(90deg, transparent, rgba(37,99,235,0.4), transparent)",
                opacity: hovered ? 1 : 0,
                transition: "opacity 0.4s ease"
            }} />

            {/* Avatar circle */}
            <div style={{
                width: "48px",
                height: "48px",
                borderRadius: "12px",
                background: hovered
                    ? "linear-gradient(135deg, rgba(37,99,235,0.2), rgba(139,92,246,0.2))"
                    : "rgba(255,255,255,0.04)",
                border: `1px solid ${hovered ? "rgba(59,130,246,0.3)" : "var(--border-subtle)"}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.82rem",
                fontWeight: 700,
                color: hovered ? "var(--accent-blue-light)" : "var(--text-dim)",
                transition: "all 0.3s ease",
                letterSpacing: "0.05em",
            }}>
                {initials}
            </div>

            <div style={{ width: "100%" }}>
                <h3 style={{
                    margin: "0 0 4px",
                    fontSize: "1.1rem",
                    fontWeight: 600,
                    color: "var(--text-primary)",
                    letterSpacing: "-0.01em"
                }}>
                    {member.name}
                </h3>
                <p style={{
                    margin: 0,
                    fontSize: "0.8rem",
                    fontWeight: 500,
                    color: "var(--accent-blue-light)",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em"
                }}>
                    {member.role}
                </p>
            </div>

            <p style={{
                margin: "0 0 2px",
                fontSize: "0.78rem",
                lineHeight: 1.5,
                color: "var(--accent-blue-light)",
                opacity: 0.75,
                letterSpacing: "0.02em",
            }}>
                {member.spec}
            </p>
            <p style={{
                margin: 0,
                fontSize: "0.85rem",
                lineHeight: 1.6,
                color: "var(--text-muted)",
            }}>
                {member.bio}
            </p>

            <a
                href={member.github}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                    position: "absolute",
                    top: "50px",
                    right: "40px",
                    color: hovered ? "var(--text-primary)" : "var(--text-dim)",
                    transition: "color 0.3s ease, transform 0.3s ease",
                    display: "flex",
                    alignItems: "center",
                    transform: hovered ? "scale(1.15)" : "scale(1)",
                }}
            >
                <GithubIcon />
            </a>
        </motion.div>
    )
}

const TeamSection = () => {
    const { ref, isVisible: visible } = useScrollReveal({ threshold: 0.1 })

    return (
        <>
            <style>{`
                .team-grid {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 16px;
                }
                @media (max-width: 1024px) {
                    .team-grid { grid-template-columns: repeat(2, 1fr); }
                }
                @media (max-width: 580px) {
                    .team-grid { grid-template-columns: 1fr; }
                }
            `}</style>

            <section
                ref={ref}
                id="team"
                style={{
                    backgroundColor: "var(--bg-secondary)",
                    padding: "clamp(56px, 10vw, 120px) 7vw",
                }}
            >
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={visible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                    style={{ marginBottom: "64px" }}
                >
                    <h2
                        className="text-transparent bg-clip-text"
                        style={{
                            margin: "0 0 16px",
                            fontSize: "clamp(2rem, 4vw, 2.75rem)",
                            fontWeight: 700,
                            letterSpacing: "-0.04em",
                            backgroundImage: "linear-gradient(160deg, #f8fafc 40%, #94a3b8 100%)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                        }}
                    >
                        The Team
                    </h2>
                    <p style={{
                        margin: 0,
                        fontSize: "1.05rem",
                        color: "var(--text-muted)",
                        maxWidth: "400px",
                        lineHeight: 1.6,
                        letterSpacing: "0.01em"
                    }}>
                        A focused engineering team building structured, scalable, and real-world digital systems.
                    </p>
                </motion.div>

                {/* Team Grid — staggered */}
                <motion.div
                    className="team-grid"
                    variants={containerVariants}
                    initial="hidden"
                    animate={visible ? "visible" : "hidden"}
                >
                    {team.map((m) => (
                        <MemberCard key={m.name} member={m} />
                    ))}
                </motion.div>
            </section>
        </>
    )
}

export default TeamSection
