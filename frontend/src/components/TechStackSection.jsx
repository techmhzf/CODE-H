// TechStackSection.jsx — Dual-row opposing marquee with icon glow effects
import { motion } from "framer-motion"
import { useScrollReveal } from "../hooks/useScrollReveal"

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
    Python: (
        <svg viewBox="0 0 40 40" width="32" height="32" fill="none" aria-hidden="true">
            <path d="M20 4c-6 0-8 3-8 6v4h8v2H10c-4 0-6 3-6 7s2 7 6 7h3v-5c0-3 2-5 5-5h8c3 0 5-2 5-5V10c0-3-2-6-6-6h-5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
            <circle cx="15" cy="10" r="1.5" fill="currentColor" />
        </svg>
    ),
}

const techsRow1 = ["React", "Node.js", "MongoDB", "Express", "Three.js", "Vercel", "AWS", "Python"]
const TechStackSection = () => {
    const { ref, isVisible: visible } = useScrollReveal({ threshold: 0.15 })

    const marqueeItems = [...techsRow1, ...techsRow1]

    return (
        <>
            <style>{`
                @keyframes marqueeScroll {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                @keyframes marqueeScrollReverse {
                    0% { transform: translateX(-50%); }
                    100% { transform: translateX(0); }
                }
                .marquee-track {
                    display: flex;
                    gap: 20px;
                    animation: marqueeScroll 45s linear infinite;
                    width: max-content;
                }
                .marquee-track:hover {
                    animation-play-state: paused;
                }
                .marquee-track-reverse {
                    display: flex;
                    gap: 20px;
                    animation: marqueeScrollReverse 40s linear infinite;
                    width: max-content;
                }
                .marquee-track-reverse:hover {
                    animation-play-state: paused;
                }
                .tech-chip {
                    display: flex;
                    align-items: center;
                    gap: 14px;
                    padding: 16px 28px;
                    background: var(--bg-card);
                    border: 1px solid var(--border-subtle);
                    border-radius: 12px;
                    white-space: nowrap;
                    cursor: default;
                    transition: border-color 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
                    flex-shrink: 0;
                    position: relative;
                    overflow: hidden;
                }
                .tech-chip::before {
                    content: '';
                    position: absolute;
                    inset: 0;
                    border-radius: 12px;
                    background: radial-gradient(circle at 50% 50%, rgba(59,130,246,0.06) 0%, transparent 70%);
                    opacity: 0;
                    transition: opacity 0.4s ease;
                }
                .tech-chip:hover::before {
                    opacity: 1;
                }
                .tech-chip:hover {
                    background: var(--bg-card-hover);
                    border-color: var(--border-hover);
                    box-shadow: 0 8px 28px rgba(0,0,0,0.3), 0 0 20px rgba(37,99,235,0.08);
                    transform: translateY(-3px);
                }
                .tech-chip .chip-icon {
                    color: var(--text-dim);
                    line-height: 0;
                    transition: color 0.3s ease, filter 0.3s ease;
                    position: relative;
                    z-index: 1;
                }
                .tech-chip:hover .chip-icon {
                    color: #3b82f6;
                    filter: drop-shadow(0 0 6px rgba(59,130,246,0.3));
                }
                .tech-chip .chip-label {
                    font-size: 0.88rem;
                    font-weight: 500;
                    letter-spacing: 0.02em;
                    color: var(--text-muted);
                    transition: color 0.3s ease;
                    position: relative;
                    z-index: 1;
                }
                .tech-chip:hover .chip-label {
                    color: var(--text-primary);
                }
            `}</style>

            <section
                ref={ref}
                id="tech-stack"
                style={{
                    backgroundColor: "var(--bg-primary)",
                    padding: "80px 0",
                    overflow: "hidden",
                }}
            >
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={visible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                    style={{ padding: "0 7vw", marginBottom: "48px" }}
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
                </motion.div>

                {/* Marquee — single row */}
                <div
                    style={{
                        opacity: visible ? 1 : 0,
                        transition: "opacity 1.2s cubic-bezier(0.16,1,0.3,1) 0.2s",
                        maskImage: "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
                        WebkitMaskImage: "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
                    }}
                >
                    <div className="marquee-track">
                        {marqueeItems.map((name, i) => (
                            <div key={`${name}-${i}`} className="tech-chip">
                                <span className="chip-icon">{icons[name]}</span>
                                <span className="chip-label">{name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}

export default TechStackSection
