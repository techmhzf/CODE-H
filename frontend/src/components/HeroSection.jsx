// HeroSection.jsx — Full-screen hero with mesh gradient orbs, parallax, and scroll indicator
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import HeroScene from "./HeroScene"

const EASING = "cubic-bezier(0.16, 1, 0.3, 1)"

const HeroSection = () => {
    const [visible, setVisible] = useState(false)
    const [scrollY, setScrollY] = useState(0)

    useEffect(() => {
        const t = setTimeout(() => setVisible(true), 80)
        return () => clearTimeout(t)
    }, [])

    useEffect(() => {
        let rafId = null
        const onScroll = () => {
            if (rafId) return
            rafId = requestAnimationFrame(() => {
                setScrollY(window.scrollY)
                rafId = null
            })
        }
        window.addEventListener("scroll", onScroll, { passive: true })
        return () => {
            window.removeEventListener("scroll", onScroll)
            if (rafId) cancelAnimationFrame(rafId)
        }
    }, [])

    const maxScroll = typeof window !== "undefined" ? window.innerHeight : 900
    const t = Math.min(scrollY / maxScroll, 1)

    const textOpacity = 1 - t * 0.85
    const textTranslateY = -t * 60
    const cubeScale = 1 - t * 0.18
    const cubeTranslateX = t * 40

    return (
        <section
            id="home"
            className="relative min-h-screen w-full flex items-center overflow-hidden px-[7vw]"
            style={{ backgroundColor: "var(--bg-primary)" }}
        >
            {/* ── Animated Mesh Gradient Orbs ── */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 overflow-hidden"
            >
                {/* Blue orb — top right */}
                <div
                    style={{
                        position: "absolute",
                        top: "10%",
                        right: "5%",
                        width: "clamp(300px, 50vw, 700px)",
                        height: "clamp(300px, 50vw, 700px)",
                        borderRadius: "50%",
                        background: "radial-gradient(circle, rgba(37,99,235,0.1) 0%, rgba(37,99,235,0.03) 40%, transparent 70%)",
                        animation: "meshFloat1 18s ease-in-out infinite",
                        filter: "blur(40px)",
                    }}
                />
                {/* Violet orb — bottom left */}
                <div
                    style={{
                        position: "absolute",
                        bottom: "10%",
                        left: "-5%",
                        width: "clamp(250px, 40vw, 600px)",
                        height: "clamp(250px, 40vw, 600px)",
                        borderRadius: "50%",
                        background: "radial-gradient(circle, rgba(139,92,246,0.08) 0%, rgba(139,92,246,0.02) 40%, transparent 70%)",
                        animation: "meshFloat2 22s ease-in-out infinite",
                        filter: "blur(50px)",
                    }}
                />
                {/* Subtle grid pattern */}
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        backgroundImage: `
                            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
                        `,
                        backgroundSize: "64px 64px",
                        maskImage: "radial-gradient(ellipse 60% 60% at 50% 50%, black 20%, transparent 70%)",
                        WebkitMaskImage: "radial-gradient(ellipse 60% 60% at 50% 50%, black 20%, transparent 70%)",
                    }}
                />
            </div>

            {/* ── Grid wrapper ── */}
            <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-2 items-center gap-12 py-16">

                {/* ── Left: Text content ── */}
                <motion.div
                    className="hero-text-col"
                    initial={{ opacity: 0, y: 32 }}
                    animate={{ opacity: visible ? textOpacity : 0, y: visible ? textTranslateY : 20 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "24px",
                        willChange: "transform, opacity",
                    }}
                >

                    {/* Main headline */}
                    <h1 className="hero-headline text-3xl xl:text-[4.4rem] font-extrabold leading-[1.06] tracking-[-0.03em] text-transparent bg-clip-text pb-1"
                        style={{
                            backgroundImage: "linear-gradient(160deg, #f8fafc 60%, #94a3b8 100%)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent"
                        }}
                    >
                        <span style={{ whiteSpace: "nowrap" }}>Problem-Solving</span><br />Engineers
                    </h1>

                    {/* Sub-headline */}
                    <p className="hero-sub text-[1rem] font-normal leading-relaxed text-zinc-300 max-w-[400px]">
                        We build custom software systems for real-world businesses.
                    </p>

                    {/* Buttons — improved with glows */}
                    <div className="hero-cta-row flex flex-wrap gap-3 mt-2">
                        <a
                            href="#featured-projects"
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                justifyContent: "center",
                                padding: "14px 28px",
                                background: "linear-gradient(135deg, #2563eb, #3b82f6, #6366f1)",
                                backgroundSize: "200% auto",
                                color: "#fff",
                                fontSize: "0.875rem",
                                fontWeight: 700,
                                letterSpacing: "0.02em",
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
                            View Our Work
                        </a>
                    </div>
                </motion.div>

                {/* ── Right: 3D canvas ── */}
                <div
                    className="hero-canvas-wrapper"
                    style={{
                        height: "min(60vw, 540px)",
                        width: "100%",
                        opacity: visible ? Math.max(1 - t * 0.5, 0.5) : 0,
                        transform: visible
                            ? `translate3d(${cubeTranslateX}px, 0, 0) scale(${cubeScale})`
                            : "translate3d(0, 16px, 0) scale(1)",
                        transition: visible ? "none" : `opacity 1s ${EASING} 0.15s, transform 1s ${EASING} 0.15s`,
                        willChange: "transform, opacity",
                    }}
                >
                    <HeroScene />
                </div>
            </div>

            {/* ── Scroll indicator ── */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: t < 0.15 ? 0.5 : 0 }}
                transition={{ delay: 1.5, duration: 0.6 }}
                style={{
                    position: "absolute",
                    bottom: "32px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "8px",
                }}
            >
                <span style={{ fontSize: "0.65rem", letterSpacing: "0.15em", color: "#64748b", textTransform: "uppercase" }}>
                    Scroll
                </span>
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                    style={{
                        width: "1px",
                        height: "24px",
                        background: "linear-gradient(180deg, #64748b, transparent)",
                    }}
                />
            </motion.div>
        </section>
    )
}

export default HeroSection
