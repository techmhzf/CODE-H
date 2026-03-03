// TechStackSection.jsx — Technology stack grid with icons
import { useEffect, useRef, useState } from "react"

/* ─── Inline SVG brand-style icons ─── */
const icons = {
    React: (
        <svg viewBox="0 0 40 40" width="32" height="32" fill="none" aria-hidden="true">
            <ellipse cx="20" cy="20" rx="18" ry="7" stroke="currentColor" strokeWidth="1.5" />
            <ellipse cx="20" cy="20" rx="18" ry="7" stroke="currentColor" strokeWidth="1.5" transform="rotate(60 20 20)" />
            <ellipse cx="20" cy="20" rx="18" ry="7" stroke="currentColor" strokeWidth="1.5" transform="rotate(120 20 20)" />
            <circle cx="20" cy="20" r="2.8" fill="currentColor" />
        </svg>
    ),
    "Node.js": (
        <svg viewBox="0 0 40 40" width="32" height="32" fill="none" aria-hidden="true">
            <polygon points="20,4 35,13 35,27 20,36 5,27 5,13" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
            <path d="M15 16v5a3 3 0 0 0 6 0v-1h-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M26 16h-3v8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    ),
    MongoDB: (
        <svg viewBox="0 0 40 40" width="32" height="32" fill="none" aria-hidden="true">
            <path d="M20 5c0 0-9 7-9 17a9 9 0 0 0 18 0C29 12 20 5 20 5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
            <line x1="20" y1="22" x2="20" y2="35" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    ),
    Express: (
        <svg viewBox="0 0 40 40" width="32" height="32" fill="none" aria-hidden="true">
            <rect x="5" y="5" width="30" height="30" rx="4" stroke="currentColor" strokeWidth="1.5" />
            <path d="M11 20h18M11 14h10M11 26h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    ),
    "Three.js": (
        <svg viewBox="0 0 40 40" width="32" height="32" fill="none" aria-hidden="true">
            <polygon points="20,5 36,33 4,33" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
            <polygon points="20,12 30,28 10,28" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
        </svg>
    ),
    Vercel: (
        <svg viewBox="0 0 40 40" width="32" height="32" fill="none" aria-hidden="true">
            <polygon points="20,7 35,33 5,33" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" fill="none" />
        </svg>
    ),
    AWS: (
        <svg viewBox="0 0 40 40" width="32" height="32" fill="none" aria-hidden="true">
            <path d="M8 26c0 0-3 1-3 4s3 4 3 4h24c0 0 3-1 3-4s-3-4-3-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12 26V18a8 8 0 0 1 16 0v8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M16 26v-6M24 26v-6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        </svg>
    ),
}

const techs = ["React", "Node.js", "MongoDB", "Express", "Three.js", "Vercel", "AWS"]

const TechTile = ({ name, visible, delay }) => {
    const [hovered, setHovered] = useState(false)

    return (
        <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "14px",
                padding: "28px 16px",
                backgroundColor: hovered ? "#1a1a24" : "#111116",
                border: `1px solid ${hovered ? "rgba(37,99,235,0.4)" : "rgba(255,255,255,0.06)"}`,
                borderRadius: "10px",
                cursor: "default",
                textAlign: "center",
                opacity: visible ? 1 : 0,
                transform: visible
                    ? hovered ? "scale(1.04)" : "scale(1)"
                    : "translateY(18px) scale(0.97)",
                transition: `opacity 0.65s ease ${delay}ms, transform 0.3s ease, border-color 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease`,
                boxShadow: hovered
                    ? "0 6px 28px rgba(0,0,0,0.3), 0 0 0 1px rgba(37,99,235,0.05)"
                    : "none",
            }}
        >
            {/* Icon */}
            <span
                style={{
                    color: hovered ? "#3b82f6" : "#64748b",
                    lineHeight: 0,
                    transition: "color 0.3s ease",
                }}
            >
                {icons[name]}
            </span>

            {/* Label */}
            <span
                style={{
                    fontSize: "0.75rem",
                    fontWeight: 500,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: hovered ? "#f8fafc" : "#94a3b8",
                    transition: "color 0.3s ease",
                }}
            >
                {name}
            </span>
        </div>
    )
}

const TechStackSection = () => {
    const ref = useRef(null)
    const [visible, setVisible] = useState(false)

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
            { threshold: 0.15 }
        )
        observer.observe(el)
        return () => observer.disconnect()
    }, [])

    return (
        <>
            <style>{`
        .ts-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
        }
        @media (max-width: 860px) {
          .ts-grid { grid-template-columns: repeat(3, 1fr); }
        }
        @media (max-width: 540px) {
          .ts-grid { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>

            <section
                ref={ref}
                id="tech-stack"
                style={{
                    backgroundColor: "#0a0a0f",
                    padding: "100px 7vw",
                    borderTop: "1px solid rgba(255,255,255,0.03)",
                }}
            >
                {/* Header */}
                <div
                    style={{
                        opacity: visible ? 1 : 0,
                        transform: visible ? "translateY(0)" : "translateY(16px)",
                        transition: "opacity 0.8s ease, transform 0.8s ease",
                        marginBottom: "52px",
                    }}
                >
                    <p
                        style={{
                            margin: "0 0 12px",
                            fontSize: "0.72rem",
                            fontWeight: 600,
                            letterSpacing: "0.2em",
                            textTransform: "uppercase",
                            color: "#94a3b8",
                        }}
                    >
                        Built With
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
                        Technology Stack
                    </h2>
                </div>

                {/* Tiles */}
                <div className="ts-grid">
                    {techs.map((name, i) => (
                        <TechTile
                            key={name}
                            name={name}
                            visible={visible}
                            delay={60 * i}
                        />
                    ))}
                </div>
            </section>
        </>
    )
}

export default TechStackSection
