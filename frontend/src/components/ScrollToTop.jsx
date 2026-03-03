// ScrollToTop.jsx — Floating button that appears after scrolling past the hero section
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const ScrollToTop = () => {
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        let rafId = null
        const onScroll = () => {
            if (rafId) return
            rafId = requestAnimationFrame(() => {
                // Show after scrolling past the viewport height (hero section)
                setVisible(window.scrollY > window.innerHeight * 0.8)
                rafId = null
            })
        }
        window.addEventListener("scroll", onScroll, { passive: true })
        return () => {
            window.removeEventListener("scroll", onScroll)
            if (rafId) cancelAnimationFrame(rafId)
        }
    }, [])

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" })
    }

    return (
        <AnimatePresence>
            {visible && (
                <motion.button
                    key="scroll-to-top"
                    onClick={scrollToTop}
                    aria-label="Scroll to top"
                    initial={{ opacity: 0, scale: 0.7, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.7, y: 20 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    whileHover={{ scale: 1.12, y: -3 }}
                    whileTap={{ scale: 0.92 }}
                    style={{
                        position: "fixed",
                        bottom: "32px",
                        right: "32px",
                        zIndex: 9999,
                        width: "50px",
                        height: "50px",
                        borderRadius: "50%",
                        border: "1px solid rgba(59,130,246,0.35)",
                        background: "linear-gradient(135deg, rgba(37,99,235,0.85), rgba(99,102,241,0.85))",
                        backdropFilter: "blur(12px)",
                        WebkitBackdropFilter: "blur(12px)",
                        boxShadow: "0 8px 32px -6px rgba(37,99,235,0.45), 0 0 0 1px rgba(255,255,255,0.06) inset",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#fff",
                        outline: "none",
                    }}
                >
                    {/* Up arrow SVG */}
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                    >
                        <path
                            d="M10 15V5M10 5L5.5 9.5M10 5L14.5 9.5"
                            stroke="white"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </motion.button>
            )}
        </AnimatePresence>
    )
}

export default ScrollToTop
