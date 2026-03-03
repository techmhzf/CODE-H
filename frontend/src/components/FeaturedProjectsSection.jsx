// FeaturedProjectsSection.jsx — Showcase of key projects
import { useEffect, useRef, useState } from "react"

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
    },
    {
        id: "stms",
        name: "STMS – Super Imli Traders Management System",
        description: "Custom inventory and billing system for a wholesale business.",
        githubUrl: "https://github.com",
        category: "FULL STACK",
    },
    {
        id: "smartexam",
        name: "SmartExam",
        description: "Online examination and proctoring platform.",
        githubUrl: "https://github.com",
        category: "FULL STACK",
    },
    {
        id: "stylescript",
        name: "StyleScript",
        description: "Smart code and document styling automation tool.",
        githubUrl: "https://github.com",
        category: "AI / ML",
    },
    {
        id: "pharmacy",
        name: "Pharmacy Billing",
        description: "Retail medical billing system.",
        githubUrl: "https://github.com",
        category: "FULL STACK",
    },
    {
        id: "bloomtale",
        name: "BloomTale",
        description: "Creative digital content platform.",
        githubUrl: "https://github.com",
        viewUrl: "https://bloomtale.cloud/home",
        category: "FULL STACK",
    },
    {
        id: "mindseeds",
        name: "MindSeeds",
        description: "Educational concept system.",
        githubUrl: "https://github.com",
        category: "PROBLEM SOLVING",
    },
]

const ProjectCard = ({ project, visible, delay }) => {
    const [tilt, setTilt] = useState({ x: 0, y: 0 })
    const [hovered, setHovered] = useState(false)
    const cardRef = useRef(null)

    const handleMouseMove = (e) => {
        const card = cardRef.current
        if (!card) return
        const rect = card.getBoundingClientRect()
        const cx = rect.left + rect.width / 2
        const cy = rect.top + rect.height / 2
        const dx = (e.clientX - cx) / (rect.width / 2)
        const dy = (e.clientY - cy) / (rect.height / 2)
        setTilt({ x: dy * -8, y: dx * 8 })
    }

    const handleMouseLeave = () => {
        setTilt({ x: 0, y: 0 })
        setHovered(false)
    }

    return (
        <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={handleMouseLeave}
            className="fp-card"
            style={{
                opacity: visible ? 1 : 0,
                transform: visible
                    ? `translateY(0) perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`
                    : "translateY(24px) perspective(800px) rotateX(0deg) rotateY(0deg)",
                transition: `opacity 0.7s ease ${delay}ms, transform ${hovered ? "0.1s" : "0.6s"} ease${hovered ? "" : ` ${delay}ms`}, box-shadow 0.3s ease`,
                willChange: "transform",
                /* Dark Background */
                background: hovered ? "#1a1a24" : "#111116",
                border: `1px solid ${hovered ? "rgba(37,99,235,0.4)" : "rgba(255,255,255,0.06)"}`,
                borderRadius: "14px",
                padding: "0",
                overflow: "hidden",
                cursor: "default",
                /* Soft Shadow depth */
                boxShadow: hovered
                    ? "0 20px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(37,99,235,0.1)"
                    : "0 4px 24px rgba(0,0,0,0.2)",
            }}
        >
            {/* Blue accent line at top */}
            <div
                style={{
                    height: "3px",
                    background: hovered
                        ? "linear-gradient(90deg, #2563eb, #60a5fa, #2563eb)"
                        : "linear-gradient(90deg, #3b82f6, #60a5fa)",
                    backgroundSize: hovered ? "200% 100%" : "100% 100%",
                    transition: "background 0.4s ease",
                    borderRadius: "14px 14px 0 0",
                }}
            />

            {/* Card body */}
            <div style={{ padding: "22px 24px 24px" }}>
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
                            color: "#2563eb",
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
                        color: hovered ? "#f8fafc" : "#e2e8f0",
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
                        color: "#94a3b8",
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
                    {/* GitHub button */}
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

                    {/* View button — BloomTale only */}
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
        </div>
    )
}

const FeaturedProjectsSection = () => {
    const ref = useRef(null)
    const [visible, setVisible] = useState(false)
    const [activeCategory, setActiveCategory] = useState("ALL PROJECTS")

    const categories = ["ALL PROJECTS", "AI / ML", "BLOCKCHAIN", "FULL STACK", "PROBLEM SOLVING"]

    useEffect(() => {
        const el = ref.current
        if (!el) return
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true)
                    observer.disconnect()
                }
            },
            { threshold: 0.1 }
        )
        observer.observe(el)
        return () => observer.disconnect()
    }, [])

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
        /* Ghost style — GitHub */
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
        /* Primary style — View */
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

        /* Filter Pills - Premium Style based on reference */
        .filter-container {
            background: #05070a; 
            padding: 8px;
            border-radius: 99px;
            display: inline-flex;
            gap: 4px;
            margin-bottom: 50px;
            border: 1px solid rgba(255,255,255,0.05);
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
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
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
        }
      `}</style>

            <section
                ref={ref}
                id="featured-projects"
                style={{
                    backgroundColor: "#09090b",
                    padding: "120px 7vw",
                    borderTop: "1px solid rgba(255,255,255,0.03)",
                }}
            >
                {/* Section header */}
                <div
                    style={{
                        opacity: visible ? 1 : 0,
                        transform: visible ? "translateY(0)" : "translateY(16px)",
                        transition: "opacity 0.8s ease, transform 0.8s ease",
                        marginBottom: "48px",
                    }}
                >
                    <p
                        style={{
                            margin: "0 0 12px",
                            fontSize: "0.72rem",
                            fontWeight: 600,
                            letterSpacing: "0.2em",
                            textTransform: "uppercase",
                            color: "#3b82f6",
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
                </div>

                {/* Filter Navigation - Using Reference Image Style */}
                <div
                    style={{
                        opacity: visible ? 1 : 0,
                        transform: visible ? "translateY(0)" : "translateY(16px)",
                        transition: "opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s",
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
                </div>

                {/* Cards grid */}
                <div className="fp-grid">
                    {filteredProjects.map((project, i) => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            visible={visible}
                            delay={80 * i}
                        />
                    ))}
                </div>
            </section>
        </>
    )
}

export default FeaturedProjectsSection
