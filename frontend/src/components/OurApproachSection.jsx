// OurApproachSection.jsx — Vertical parallax process journey with framer-motion and design tokens
import { useEffect, useRef, useState, useCallback } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"

const steps = [
    { num: "01", title: "Understand the Problem", desc: "We begin by deeply understanding the core issue and its real-world impact." },
    { num: "02", title: "Research & Ground Reality", desc: "We analyze practical challenges, user behavior, and operational constraints." },
    { num: "03", title: "Identify Core Challenges", desc: "We break down the problem into measurable and structured components." },
    { num: "04", title: "Define the Unique Solution", desc: "We architect a tailored solution and validate it with stakeholders or authorities." },
    { num: "05", title: "Prototype & Validate", desc: "We build an initial working prototype and gather structured feedback." },
    { num: "06", title: "System Architecture & Data Modeling", desc: "We design database schemas, system flow, and scalable architecture." },
    { num: "07", title: "API Development", desc: "We build secure, structured, and efficient APIs." },
    { num: "08", title: "Backend & Frontend Development", desc: "Parallel system development with performance optimization." },
    { num: "09", title: "Integration & Testing", desc: "We integrate systems and rigorously test for stability and edge cases." },
    { num: "10", title: "Deployment & Delivery", desc: "We deploy, optimize, and ensure smooth operational delivery." },
]

const StepRow = ({ num, title, desc, index, isActive }) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
            style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "clamp(24px, 4vw, 56px)",
                padding: "48px 0",
                position: "relative",
            }}
        >
            {/* Step Number */}
            <div
                style={{
                    flexShrink: 0,
                    width: "clamp(48px, 8vw, 80px)",
                    position: "relative",
                }}
            >
                {/* Dot indicator */}
                <div
                    style={{
                        position: "absolute",
                        left: "clamp(-18px, -3vw, -25px)",
                        top: "14px",
                        width: "12px",
                        height: "12px",
                        borderRadius: "50%",
                        backgroundColor: isActive ? "var(--accent-blue-light)" : "rgba(255, 255, 255, 0.05)",
                        border: isActive ? "3px solid var(--bg-primary)" : "1px solid rgba(255, 255, 255, 0.1)",
                        boxShadow: isActive ? "0 0 15px var(--accent-blue-light)" : "none",
                        transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                        zIndex: 2,
                    }}
                />

                <span
                    style={{
                        fontSize: "clamp(2rem, 5vw, 3.5rem)",
                        fontWeight: 900,
                        letterSpacing: "-0.04em",
                        lineHeight: 1,
                        color: isActive ? "var(--text-primary)" : "rgba(255, 255, 255, 0.03)",
                        transition: "color 0.4s ease",
                        userSelect: "none",
                        fontVariantNumeric: "tabular-nums",
                        WebkitTextStroke: isActive ? "0" : "1px rgba(255, 255, 255, 0.05)",
                    }}
                >
                    {num}
                </span>
            </div>

            {/* Text content */}
            <div style={{ flex: 1, paddingTop: "8px" }}>
                <h3
                    style={{
                        margin: "0 0 12px",
                        fontSize: "clamp(1.1rem, 2.5vw, 1.4rem)",
                        fontWeight: 700,
                        color: isActive ? "var(--text-primary)" : "rgba(255, 255, 255, 0.2)",
                        transition: "color 0.4s ease",
                        letterSpacing: "-0.01em",
                    }}
                >
                    {title}
                </h3>
                <p
                    style={{
                        margin: 0,
                        fontSize: "clamp(0.85rem, 1.5vw, 0.95rem)",
                        lineHeight: 1.6,
                        color: isActive ? "var(--text-secondary)" : "rgba(255, 255, 255, 0.1)",
                        transition: "color 0.4s ease",
                        maxWidth: "500px",
                    }}
                >
                    {desc}
                </p>
            </div>
        </motion.div>
    )
}

const OurApproachSection = () => {
    const sectionRef = useRef(null)
    const [activeIndex, setActiveIndex] = useState(0)

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start center", "end center"],
    })

    const scaleY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    })

    useEffect(() => {
        const unsubscribe = scrollYProgress.onChange(v => {
            const index = Math.min(Math.floor(v * steps.length), steps.length - 1)
            setActiveIndex(Math.max(0, index))
        })
        return () => unsubscribe()
    }, [scrollYProgress])

    return (
        <section
            id="our-approach"
            ref={sectionRef}
            style={{
                backgroundColor: "var(--bg-primary)",
                padding: "clamp(56px, 10vw, 120px) 7vw",
                position: "relative",
                overflow: "hidden",
            }}
        >
            {/* Background Accent */}
            <div
                style={{
                    position: "absolute",
                    top: "20%",
                    right: "-10%",
                    width: "40vw",
                    height: "40vw",
                    background: "radial-gradient(circle, rgba(37, 99, 235, 0.03) 0%, transparent 70%)",
                    filter: "blur(60px)",
                    pointerEvents: "none",
                }}
            />

            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                style={{ marginBottom: "80px" }}
            >
                <p style={{
                    margin: "0 0 12px",
                    fontSize: "0.72rem",
                    fontWeight: 600,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "var(--accent-blue-light)",
                }}>
                    The Process
                </p>
                <h2 style={{
                    margin: 0,
                    fontSize: "clamp(2rem, 4vw, 3rem)",
                    fontWeight: 800,
                    letterSpacing: "-0.03em",
                    color: "var(--text-primary)",
                }}>
                    Our Engineering Approach
                </h2>
            </motion.div>

            {/* Steps Container */}
            <div className="approach-steps-container" style={{ position: "relative", maxWidth: "800px" }}>
                {/* Vertical Timeline Line */}
                <div
                    style={{
                        position: "absolute",
                        left: "clamp(-13px, -2vw, -20px)",
                        top: "20px",
                        bottom: "40px",
                        width: "1px",
                        backgroundColor: "rgba(255, 255, 255, 0.05)",
                    }}
                >
                    <motion.div
                        style={{
                            width: "100%",
                            height: "100%",
                            background: "linear-gradient(to bottom, var(--accent-blue-light), var(--accent-violet))",
                            scaleY,
                            originY: 0,
                            boxShadow: "0 0 10px var(--accent-blue-light)",
                        }}
                    />
                </div>

                {/* Steps Mapping */}
                {steps.map((step, i) => (
                    <StepRow
                        key={step.num}
                        num={step.num}
                        title={step.title}
                        desc={step.desc}
                        index={i}
                        isActive={i <= activeIndex}
                    />
                ))}
            </div>
        </section>
    )
}

export default OurApproachSection
