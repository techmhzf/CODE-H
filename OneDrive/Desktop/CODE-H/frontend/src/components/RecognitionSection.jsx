// RecognitionSection.jsx — SIH Win recognition block
// Centered layout, metallic abstract badge, scroll-triggered fade-in

import { useEffect, useRef, useState } from "react"

/* ─── Metallic abstract badge (pure SVG, no external deps) ─── */
const MetallicBadge = () => (
    <svg
        width="52"
        height="52"
        viewBox="0 0 52 52"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="recognition-badge"
    >
        {/* Outer hexagon ring */}
        <polygon
            points="26,4 45,15 45,37 26,48 7,37 7,15"
            stroke="url(#metalGrad)"
            strokeWidth="1.5"
            fill="none"
            opacity="0.9"
        />
        {/* Inner hexagon fill */}
        <polygon
            points="26,11 39,18.5 39,33.5 26,41 13,33.5 13,18.5"
            fill="url(#innerGrad)"
            opacity="0.15"
        />
        {/* Star / diamond centre */}
        <path
            d="M26 18 L29.5 24 L26 30 L22.5 24 Z"
            fill="url(#starGrad)"
            opacity="0.9"
        />
        {/* Reflection streak */}
        <path
            d="M18 12 Q26 20 34 12"
            stroke="url(#shineGrad)"
            strokeWidth="1"
            fill="none"
            opacity="0.6"
            className="badge-shine"
        />

        <defs>
            <linearGradient id="metalGrad" x1="0" y1="0" x2="52" y2="52" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#c0cfe0" />
                <stop offset="50%" stopColor="#8faabf" />
                <stop offset="100%" stopColor="#d4e0ec" />
            </linearGradient>
            <linearGradient id="innerGrad" x1="0" y1="0" x2="52" y2="52" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#a0b8d0" />
                <stop offset="100%" stopColor="#4a6a80" />
            </linearGradient>
            <linearGradient id="starGrad" x1="22" y1="18" x2="30" y2="30" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#e2ecf6" />
                <stop offset="100%" stopColor="#7a9ab5" />
            </linearGradient>
            <linearGradient id="shineGrad" x1="18" y1="12" x2="34" y2="12" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="transparent" />
                <stop offset="50%" stopColor="#dce9f4" />
                <stop offset="100%" stopColor="transparent" />
            </linearGradient>
        </defs>
    </svg>
)

const RecognitionSection = () => {
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
            { threshold: 0.25 }
        )
        observer.observe(el)
        return () => observer.disconnect()
    }, [])

    return (
        <>
            {/* ── Inline keyframes ── */}
            <style>{`
                @keyframes badgeFloat {
                    0%, 100% { transform: translateY(0px); }
                    50%       { transform: translateY(-4px); }
                }
                @keyframes shineSlide {
                    0%   { opacity: 0; stroke-dashoffset: 40; }
                    40%  { opacity: 0.7; }
                    100% { opacity: 0; stroke-dashoffset: -40; }
                }
                .recognition-badge {
                    animation: badgeFloat 6s ease-in-out infinite;
                    filter: drop-shadow(0 0 6px rgba(148,180,210,0.22));
                }
                .badge-shine {
                    stroke-dasharray: 40;
                    animation: shineSlide 4s ease-in-out infinite 1s;
                }
                .recognition-divider {
                    width: 32px;
                    height: 1px;
                    background: linear-gradient(90deg, transparent, rgba(148,180,210,0.4), transparent);
                }
            `}</style>

            <section
                ref={ref}
                id="recognition"
                style={{
                    backgroundColor: "#0a0a0f",
                    padding: "120px 7vw",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                    borderTop: "1px solid rgba(255,255,255,0.04)",
                }}
            >
                {/* Fade-in wrapper */}
                <div
                    style={{
                        opacity: visible ? 1 : 0,
                        transform: visible ? "translateY(0)" : "translateY(18px)",
                        transition: "opacity 0.9s ease, transform 0.9s ease",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "20px",
                        maxWidth: "520px",
                    }}
                >
                    {/* Title row with badge */}
                    <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                        <MetallicBadge />
                        <h2
                            style={{
                                margin: 0,
                                fontSize: "clamp(1.4rem, 3vw, 2rem)",
                                fontWeight: 700,
                                letterSpacing: "-0.02em",
                                background: "linear-gradient(160deg, #e8edf5 55%, #7a98b4 100%)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                backgroundClip: "text",
                            }}
                        >
                            Recognized for Innovation
                        </h2>
                    </div>

                    {/* Thin divider */}
                    <div className="recognition-divider" />

                    {/* Hackathon win line */}
                    <p
                        style={{
                            margin: 0,
                            fontSize: "0.82rem",
                            fontWeight: 600,
                            letterSpacing: "0.18em",
                            textTransform: "uppercase",
                            color: "#7a9ab4",
                        }}
                    >
                        Winners – Smart India Hackathon 2025
                    </p>

                    {/* Project description */}
                    <p
                        style={{
                            margin: 0,
                            fontSize: "1rem",
                            fontWeight: 400,
                            lineHeight: 1.7,
                            color: "#4e6070",
                            maxWidth: "380px",
                        }}
                    >
                        Built&nbsp;<span style={{ color: "#8faabf", fontWeight: 500 }}>C-TRACE</span>,
                        &nbsp;a real-world problem-solving system.
                    </p>
                </div>
            </section>
        </>
    )
}

export default RecognitionSection
