// HeroSection.jsx — Full-screen hero for CODE-H
// Two-column layout: left text + right 3D cube
// Design: Dark #0a0a0f | Accent: Violet #7c3aed → Cyan #06b6d4

import { useEffect, useState } from "react"
import HeroScene from "./HeroScene"

const HeroSection = () => {
    // Controls fade-up entrance animation
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const t = setTimeout(() => setVisible(true), 80)
        return () => clearTimeout(t)
    }, [])

    return (
        <section className="relative min-h-screen w-full bg-[#0a0a0f] flex items-center overflow-hidden px-[7vw]">

            {/* Subtle radial glow behind 3D object (right side) */}
            <div className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 w-[55vw] h-[55vw] max-w-[700px] max-h-[700px] rounded-full"
                style={{
                    background: "radial-gradient(circle, rgba(99,102,241,0.07) 0%, rgba(99,102,241,0.02) 40%, transparent 70%)"
                }}
            />

            {/* ── Grid wrapper ── */}
            <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-2 items-center gap-12 py-16">

                {/* ── Left: Text content ── */}
                <div
                    className={`flex flex-col gap-6 transition-all duration-700 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
                        }`}
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

                        {/* Primary — solid electric blue with glow on hover */}
                        <a
                            href="#work"
                            className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold tracking-wide rounded-lg border border-transparent transition-all duration-200 hover:shadow-[0_4px_28px_rgba(37,99,235,0.4)] hover:-translate-y-px active:translate-y-0"
                        >
                            View Our Work
                        </a>

                        {/* Secondary — ghost, fills on hover */}
                        <a
                            href="#contact"
                            className="inline-flex items-center justify-center px-6 py-3 bg-transparent hover:bg-white/[0.05] text-zinc-300 hover:text-white text-sm font-medium tracking-wide rounded-lg border border-white/10 hover:border-white/20 transition-all duration-200 hover:-translate-y-px active:translate-y-0"
                        >
                            Start a Project
                        </a>

                    </div>
                </div>

                {/* ── Right: 3D canvas ── */}
                <div
                    className={`h-[min(60vw,540px)] w-full transition-all duration-1000 ease-out delay-150 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                        }`}
                >
                    <HeroScene />
                </div>

            </div>
        </section>
    )
}

export default HeroSection
