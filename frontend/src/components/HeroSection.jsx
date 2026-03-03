// HeroSection.jsx — Full-screen hero with scroll-based parallax
// 3D object scales down + shifts right on scroll, text fades slightly
import { useEffect, useState, useCallback } from "react"
import HeroScene from "./HeroScene"

const EASING = "cubic-bezier(0.16, 1, 0.3, 1)"

const HeroSection = () => {
    const [visible, setVisible] = useState(false)
    const [scrollY, setScrollY] = useState(0)

    useEffect(() => {
        const t = setTimeout(() => setVisible(true), 80)
        return () => clearTimeout(t)
    }, [])

    // Scroll listener for parallax — rAF throttled
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

    // Clamp scroll influence to the hero viewport height
    const maxScroll = typeof window !== "undefined" ? window.innerHeight : 900
    const t = Math.min(scrollY / maxScroll, 1) // 0 → 1

    // Text parallax: fades to 0.15 opacity, moves up 60px
    const textOpacity = 1 - t * 0.85
    const textTranslateY = -t * 60

    // 3D object parallax: scales to 0.82, shifts right 40px
    const cubeScale = 1 - t * 0.18
    const cubeTranslateX = t * 40

    // Background glow: slower parallax rate (depth shift)
    const glowTranslateY = -t * 30

    return (
        <section className="relative min-h-screen w-full bg-[#0a0a0f] flex items-center overflow-hidden px-[7vw]">

            {/* Subtle radial glow — parallax depth */}
            <div
                className="pointer-events-none absolute right-0 top-1/2 w-[55vw] h-[55vw] max-w-[700px] max-h-[700px] rounded-full"
                style={{
                    background: "radial-gradient(circle, rgba(99,102,241,0.07) 0%, rgba(99,102,241,0.02) 40%, transparent 70%)",
                    transform: `translate3d(0, calc(-50% + ${glowTranslateY}px), 0)`,
                    willChange: "transform",
                }}
            />

            {/* ── Grid wrapper ── */}
            <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-2 items-center gap-12 py-16">

                {/* ── Left: Text content — fades on scroll ── */}
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "24px",
                        opacity: visible ? textOpacity : 0,
                        transform: visible
                            ? `translate3d(0, ${textTranslateY}px, 0)`
                            : "translate3d(0, 20px, 0)",
                        transition: visible ? "none" : `opacity 0.7s ${EASING}, transform 0.7s ${EASING}`,
                        willChange: "transform, opacity",
                    }}
                >
                    {/* Small label */}
                    <span className="w-fit text-[0.72rem] font-semibold tracking-[0.22em] uppercase text-violet-400 border border-violet-500/20 bg-violet-500/[0.04] px-3 py-1 rounded-full">
                        CODE-H
                    </span>

                    {/* Main headline */}
                    <h1 className="text-5xl xl:text-[4.4rem] font-extrabold leading-[1.06] tracking-[-0.03em] text-transparent bg-clip-text"
                        style={{
                            backgroundImage: "linear-gradient(160deg, #f8fafc 60%, #94a3b8 100%)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent"
                        }}
                    >
                        Problem-Solving<br />Engineers
                    </h1>

                    {/* Sub-headline */}
                    <p className="text-[1rem] font-normal leading-relaxed text-zinc-400 max-w-[400px]">
                        We build custom software systems for real-world businesses.
                    </p>

                    {/* Buttons */}
                    <div className="flex flex-wrap gap-3 mt-2">
                        <a
                            href="#work"
                            className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold tracking-wide rounded-lg border border-transparent transition-all duration-200 hover:shadow-[0_4px_28px_rgba(37,99,235,0.4)] hover:-translate-y-px active:translate-y-0"
                        >
                            View Our Work
                        </a>
                        <a
                            href="#contact"
                            className="inline-flex items-center justify-center px-6 py-3 bg-transparent hover:bg-white/[0.05] text-zinc-300 hover:text-white text-sm font-medium tracking-wide rounded-lg border border-white/10 hover:border-white/20 transition-all duration-200 hover:-translate-y-px active:translate-y-0"
                        >
                            Start a Project
                        </a>
                    </div>
                </div>

                {/* ── Right: 3D canvas — scales down + shifts right on scroll ── */}
                <div
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
        </section>
    )
}

export default HeroSection
