// FeaturedProjectsSection.jsx — Showcase with gradient hover borders & framer-motion stagger
import { useRef, useState } from "react"
import { motion } from "framer-motion"
import { useScrollReveal } from "../hooks/useScrollReveal"

/* GitHub icon SVG */
const GitHubIcon = () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
)

/* External link icon */
const ExternalIcon = () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
        <polyline points="15 3 21 3 21 9" />
        <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
)

const projects = [
    {
        id: "ctrace",
        name: "C-TRACE",
        tag: "SIH 2025 Winning Project",
        description: "National-level problem-solving system.",
        githubUrl: "https://github.com",
        category: "PROBLEM SOLVING",
        gradient: "linear-gradient(135deg, rgba(245,158,11,0.12) 0%, rgba(245,158,11,0.03) 100%)",
    },
    {
        id: "stms",
        name: "STMS – Super Imli Traders Management System",
        description: "Custom inventory and billing system for a wholesale business.",
        githubUrl: "https://github.com",
        category: "FULL STACK",
        gradient: "linear-gradient(135deg, rgba(59,130,246,0.1) 0%, rgba(59,130,246,0.02) 100%)",
    },
    {
        id: "smartexam",
        name: "SmartExam",
        description: "Online examination and proctoring platform.",
        githubUrl: "https://github.com",
        category: "FULL STACK",
        gradient: "linear-gradient(135deg, rgba(139,92,246,0.1) 0%, rgba(139,92,246,0.02) 100%)",
    },
    {
        id: "stylescript",
        name: "StyleScript",
        description: "Smart code and document styling automation tool.",
        githubUrl: "https://github.com",
        category: "AI / ML",
        gradient: "linear-gradient(135deg, rgba(16,185,129,0.1) 0%, rgba(16,185,129,0.02) 100%)",
    },
    {
        id: "pharmacy",
        name: "Pharmacy Billing",
        description: "Retail medical billing system.",
        githubUrl: "https://github.com",
        category: "FULL STACK",
        gradient: "linear-gradient(135deg, rgba(59,130,246,0.08) 0%, rgba(37,99,235,0.02) 100%)",
    },
    {
        id: "bloomtale",
        name: "BloomTale",
        description: "Creative digital content platform.",
        githubUrl: "https://github.com",
        viewUrl: "https://bloomtale.cloud/home",
        category: "FULL STACK",
        gradient: "linear-gradient(135deg, rgba(236,72,153,0.1) 0%, rgba(236,72,153,0.02) 100%)",
    },
    {
        id: "mindseeds",
        name: "MindSeeds",
        description: "Educational concept system.",
        githubUrl: "https://github.com",
        category: "PROBLEM SOLVING",
        gradient: "linear-gradient(135deg, rgba(139,92,246,0.08) 0%, rgba(139,92,246,0.02) 100%)",
    },
]

const cardVariants = {
    hidden: { opacity: 0, y: 28 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] },
    }),
}

const ProjectCard = ({ project, index, visible }) => {
    const [tilt, setTilt] = useState({ x: 0, y: 0 })
    const [hovered, setHovered] = useState(false)
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
    const cardRef = useRef(null)

    const handleMouseMove = (e) => {
        const card = cardRef.current
        if (!card) return
        const rect = card.getBoundingClientRect()
        const cx = rect.left + rect.width / 2
        const cy = rect.top + rect.height / 2
        const dx = (e.clientX - cx) / (rect.width / 2)
        const dy = (e.clientY - cy) / (rect.height / 2)
        setTilt({ x: dy * -5, y: dx * 5 })
        // Cursor glow position
        setMousePos({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        })
    }

    const handleMouseLeave = () => {
        setTilt({ x: 0, y: 0 })
        setHovered(false)
    }

    return (
        <motion.div
            ref={cardRef}
            custom={index}
            variants={cardVariants}
            initial="hidden"
            animate={visible ? "visible" : "hidden"}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={handleMouseLeave}
            className="fp-card"
            style={{
                position: "relative",
                transform: hovered
                    ? `translateY(-4px) perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`
                    : "translateY(0) perspective(800px) rotateX(0deg) rotateY(0deg)",
                transition: `transform ${hovered ? "0.1s" : "0.5s cubic-bezier(0.16,1,0.3,1)"}, box-shadow 0.4s ease`,
                willChange: "transform",
                background: hovered ? "var(--bg-card-hover)" : "var(--bg-card)",
                border: `1px solid ${hovered ? "var(--border-hover)" : "var(--border-subtle)"}`,
                borderRadius: "14px",
                padding: "0",
                overflow: "hidden",
                cursor: "default",
                boxShadow: hovered
                    ? "0 24px 64px rgba(0,0,0,0.45), 0 0 0 1px rgba(37,99,235,0.12), 0 0 30px rgba(37,99,235,0.05)"
                    : "0 4px 24px rgba(0,0,0,0.15)",
            }}
        >
            {/* Cursor-follow glow */}
            {hovered && (
                <div
                    style={{
                        position: "absolute",
                        width: "200px",
                        height: "200px",
                        borderRadius: "50%",
                        background: "radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 70%)",
                        left: mousePos.x - 100,
                        top: mousePos.y - 100,
                        pointerEvents: "none",
                        zIndex: 0,
                        transition: "left 0.05s, top 0.05s",
                    }}
                />
            )}

            {/* Top gradient preview strip */}
            <div
                style={{
                    height: "48px",
                    background: project.gradient,
                    position: "relative",
                    overflow: "hidden",
                }}
            >
                {/* Blue accent line */}
                <div
                    style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: "2px",
                        background: hovered
                            ? "linear-gradient(90deg, #2563eb, #60a5fa, #2563eb)"
                            : "linear-gradient(90deg, #3b82f6, #60a5fa)",
                        backgroundSize: hovered ? "200% 100%" : "100% 100%",
                        transition: "background 0.4s ease, box-shadow 0.4s ease",
                        boxShadow: hovered ? "0 0 12px rgba(37,99,235,0.4)" : "none",
                    }}
                />
            </div>

            {/* Card body */}
            <div style={{ padding: "20px 24px 24px", position: "relative", zIndex: 1 }}>
                {/* Tag badge */}
                {(project.tag || project.category) && (
                    <span
                        style={{
                            display: "inline-block",
                            marginBottom: "10px",
                            fontSize: "0.66rem",
                            fontWeight: 700,
                            letterSpacing: "0.12em",
                            textTransform: "uppercase",
                            color: "var(--accent-blue)",
                            background: "rgba(59,130,246,0.08)",
                            border: "1px solid rgba(59,130,246,0.15)",
                            borderRadius: "4px",
                            padding: "3px 8px",
                        }}
                    >
                        {project.tag || project.category}
                    </span>
                )}

                {/* Project name */}
                <h3
                    style={{
                        margin: "0 0 8px",
                        fontSize: "1rem",
                        fontWeight: 650,
                        letterSpacing: "-0.015em",
                        color: hovered ? "var(--text-primary)" : "var(--text-secondary)",
                        transition: "color 0.3s ease",
                        lineHeight: 1.3,
                    }}
                >
                    {project.name}
                </h3>

                {/* Description */}
                <p
                    style={{
                        margin: "0 0 20px",
                        fontSize: "0.82rem",
                        color: "var(--text-muted)",
                        lineHeight: 1.5,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                    }}
                >
                    {project.description}
                </p>

                {/* Action buttons */}
                <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                    <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="fp-btn fp-btn-ghost"
                        title="View on GitHub"
                    >
                        <GitHubIcon />
                        GitHub
                    </a>
                    {project.viewUrl && (
                        <a
                            href={project.viewUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="fp-btn fp-btn-primary"
                            title="View live site"
                        >
                            <ExternalIcon />
                            View
                        </a>
                    )}
                </div>
            </div>
        </motion.div>
    )
}

const FeaturedProjectsSection = () => {
    const { ref, isVisible: visible } = useScrollReveal({ threshold: 0.1 })
    const [activeCategory, setActiveCategory] = useState("ALL PROJECTS")

    const categories = ["ALL PROJECTS", "AI / ML", "BLOCKCHAIN", "FULL STACK", "PROBLEM SOLVING"]

    const filteredProjects = activeCategory === "ALL PROJECTS"
        ? projects
        : projects.filter(p => p.category === activeCategory)

    return (
        <>
            <style>{`
        .fp-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        @media (max-width: 960px) {
          .fp-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 560px) {
          .fp-grid { grid-template-columns: 1fr; }
        }
        .fp-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 13px;
          border-radius: 6px;
          font-size: 0.76rem;
          font-weight: 600;
          letter-spacing: 0.01em;
          text-decoration: none;
          cursor: pointer;
          transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease, transform 0.15s ease, box-shadow 0.2s ease;
          user-select: none;
          white-space: nowrap;
        }
        .fp-btn:hover { transform: translateY(-1px); }
        .fp-btn:active { transform: translateY(0); }
        .fp-btn-ghost {
          color: #94a3b8;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
        }
        .fp-btn-ghost:hover {
          color: #f8fafc;
          background: rgba(255,255,255,0.1);
          border-color: rgba(255,255,255,0.2);
          box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        }
        .fp-btn-primary {
          color: #ffffff;
          background: #2563eb;
          border: 1px solid #2563eb;
        }
        .fp-btn-primary:hover {
          background: #1d4ed8;
          border-color: #1d4ed8;
          box-shadow: 0 2px 14px rgba(37,99,235,0.2);
          color: #ffffff;
        }
        .filter-container {
            background: rgba(5,7,10,0.8);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            padding: 8px;
            border-radius: 99px;
            display: inline-flex;
            gap: 4px;
            margin-bottom: 50px;
            border: 1px solid rgba(255,255,255,0.06);
        }
        @media (max-width: 600px) {
            .filter-container {
                flex-wrap: wrap;
                border-radius: 20px;
                justify-content: center;
                width: 100%;
            }
        }
        .ref-pill {
            padding: 10px 24px;
            border-radius: 99px;
            font-size: 0.72rem;
            font-weight: 700;
            letter-spacing: 0.1em;
            text-transform: uppercase;
            cursor: pointer;
            transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
            color: #94a3b8;
            border: 1px solid transparent;
            white-space: nowrap;
        }
        .ref-pill:hover {
            color: #f8fafc;
        }
        .ref-pill.active {
            background: #ffffff;
            color: #000000 !important;
            box-shadow: 0 4px 16px rgba(255,255,255,0.1);
        }
      `}</style>

            <section
                ref={ref}
                id="featured-projects"
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
                    style={{ marginBottom: "48px" }}
                >
                    <p
                        style={{
                            margin: "0 0 12px",
                            fontSize: "0.72rem",
                            fontWeight: 600,
                            letterSpacing: "0.2em",
                            textTransform: "uppercase",
                            color: "var(--accent-blue-light)",
                        }}
                    >
                        Our Work
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
                        Featured Projects
                    </h2>
                </motion.div>

                {/* Filter Navigation */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={visible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                        display: "flex",
                        justifyContent: "flex-start",
                        marginBottom: "30px"
                    }}
                >
                    <div className="filter-container">
                        {categories.map((cat) => (
                            <div
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`ref-pill ${activeCategory === cat ? "active" : ""}`}
                            >
                                {cat}
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Cards grid */}
                <div className="fp-grid">
                    {filteredProjects.map((project, i) => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            index={i}
                            visible={visible}
                        />
                    ))}
                </div>
            </section>
        </>
    )
}

export default FeaturedProjectsSection
