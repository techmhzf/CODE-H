// WhatWeBuildSection.jsx — Service offerings grid with enhanced animations
import { useState } from "react"
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

const EASE = "cubic-bezier(0.16, 1, 0.3, 1)"

const ServiceCard = ({ icon, label, visible, delay }) => {
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
                gap: "16px",
                padding: "36px 24px",
                backgroundColor: hovered ? "#1a1a24" : "#111116",
                border: `1px solid ${hovered ? "rgba(37,99,235,0.4)" : "rgba(255,255,255,0.06)"}`,
                borderRadius: "12px",
                cursor: "default",
                textAlign: "center",
                /* Entrance animation */
                opacity: visible ? 1 : 0,
                transform: visible
                    ? (hovered ? "translateY(-6px)" : "translateY(0)")
                    : "translateY(24px)",
                transition: `opacity 0.8s ${EASE} ${delay}ms, transform 0.5s ${EASE} ${hovered ? 0 : delay}ms, border-color 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease`,
                /* Hover elevation + glow */
                boxShadow: hovered
                    ? "0 16px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(37,99,235,0.1), 0 0 20px rgba(37,99,235,0.06)"
                    : "0 2px 12px rgba(0,0,0,0.2)",
            }}
        >
            {/* Icon — scales up on hover */}
            <span
                style={{
                    color: hovered ? "#3b82f6" : "#64748b",
                    transition: `color 0.3s ease, transform 0.4s ${EASE}`,
                    lineHeight: 0,
                    transform: hovered ? "scale(1.15)" : "scale(1)",
                }}
            >
                {icon}
            </span>

            {/* Title */}
            <p
                style={{
                    margin: 0,
                    fontSize: "0.875rem",
                    fontWeight: 500,
                    letterSpacing: "0.01em",
                    color: hovered ? "#f8fafc" : "#94a3b8",
                    transition: "color 0.3s ease",
                    lineHeight: 1.4,
                }}
            >
                {label}
            </p>
        </div>
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
                    backgroundColor: "#0a0a0f",
                    padding: "120px 7vw",
                    borderTop: "1px solid rgba(255,255,255,0.03)",
                }}
            >
                {/* Section header */}
                <div
                    style={{
                        opacity: visible ? 1 : 0,
                        transform: visible ? "translateY(0)" : "translateY(20px)",
                        transition: `opacity 0.9s ${EASE}, transform 0.9s ${EASE}`,
                        marginBottom: "64px",
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
                </div>

                {/* Cards grid */}
                <div className="wwb-grid">
                    {services.map(({ id, label, icon }, i) => (
                        <ServiceCard
                            key={id}
                            icon={icon}
                            label={label}
                            visible={visible}
                            delay={100 * i}
                        />
                    ))}
                </div>
            </section>
        </>
    )
}

export default WhatWeBuildSection
