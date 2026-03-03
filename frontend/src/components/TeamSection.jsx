// TeamSection.jsx — Engineering team with polished scroll animations
import { useState } from "react"
import { useScrollReveal } from "../hooks/useScrollReveal"

const EASE = "cubic-bezier(0.16, 1, 0.3, 1)"

const team = [
    {
        name: "Abubakkar",
        role: "Lead Systems Engineer",
        spec: "Scalable Architecture • Backend",
        github: "https://github.com"
    },
    {
        name: "Member 2",
        role: "Full-Stack Developer",
        spec: "React • Node.js • Cloud",
        github: "https://github.com"
    },
    {
        name: "Member 3",
        role: "Frontend Architect",
        spec: "UI/UX • Performance • Three.js",
        github: "https://github.com"
    },
    {
        name: "Member 4",
        role: "DevOps Specialist",
        spec: "Kubernetes • AWS • CI/CD",
        github: "https://github.com"
    },
]

const GithubIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
    </svg>
)

const MemberCard = ({ member, visible, delay }) => {
    const [hovered, setHovered] = useState(false)

    return (
        <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                position: "relative",
                padding: "32px 24px",
                backgroundColor: hovered ? "#1a1a24" : "#111116",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: "12px",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "16px",
                cursor: "default",
                /* Entrance Animation */
                opacity: visible ? 1 : 0,
                transform: visible
                    ? (hovered ? "translateY(-6px)" : "translateY(0)")
                    : "translateY(28px)",
                transition: `opacity 0.8s ${EASE} ${delay}ms, transform 0.5s ${EASE} ${hovered ? 0 : delay}ms, border-color 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease`,
                boxShadow: hovered
                    ? "0 16px 40px -8px rgba(0,0,0,0.5), 0 0 0 1px rgba(37,99,235,0.1)"
                    : "none",
                borderColor: hovered ? "rgba(37,99,235,0.4)" : "rgba(255,255,255,0.06)",
            }}
        >
            <div style={{ width: "100%" }}>
                <h3 style={{
                    margin: "0 0 4px",
                    fontSize: "1.1rem",
                    fontWeight: 600,
                    color: "#f8fafc",
                    letterSpacing: "-0.01em"
                }}>
                    {member.name}
                </h3>
                <p style={{
                    margin: 0,
                    fontSize: "0.8rem",
                    fontWeight: 500,
                    color: "#3b82f6",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em"
                }}>
                    {member.role}
                </p>
            </div>

            <p style={{
                margin: 0,
                fontSize: "0.85rem",
                lineHeight: 1.5,
                color: "#94a3b8",
                maxWidth: "200px"
            }}>
                {member.spec}
            </p>

            <a
                href={member.github}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                    marginTop: "8px",
                    color: hovered ? "#f8fafc" : "#64748b",
                    transition: "color 0.3s ease",
                    display: "flex",
                    alignItems: "center"
                }}
            >
                <GithubIcon />
            </a>

            {/* Top accent line visible on hover */}
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
        </div>
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
                    backgroundColor: "#09090b",
                    padding: "120px 7vw",
                    borderTop: "1px solid rgba(255,255,255,0.03)",
                }}
            >
                {/* Header */}
                <div style={{
                    marginBottom: "64px",
                    opacity: visible ? 1 : 0,
                    transform: visible ? "translateY(0)" : "translateY(24px)",
                    transition: `opacity 0.9s ${EASE}, transform 0.9s ${EASE}`,
                }}>
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
                        color: "#94a3b8",
                        maxWidth: "400px",
                        lineHeight: 1.6,
                        letterSpacing: "0.01em"
                    }}>
                        A 4-member engineering team focused on building scalable digital systems.
                    </p>
                </div>

                {/* Team Grid */}
                <div className="team-grid">
                    {team.map((m, i) => (
                        <MemberCard
                            key={m.name}
                            member={m}
                            visible={visible}
                            delay={120 * i}
                        />
                    ))}
                </div>
            </section>
        </>
    )
}

export default TeamSection
