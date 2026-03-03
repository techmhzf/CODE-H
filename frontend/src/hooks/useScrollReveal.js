// useScrollReveal.js — Reusable IntersectionObserver hook for fade-up reveals
import { useEffect, useRef, useState } from "react"

/**
 * @param {Object} options
 * @param {number} [options.threshold=0.15] - Visibility threshold (0–1)
 * @param {string} [options.rootMargin="0px 0px -40px 0px"] - Root margin
 * @returns {{ ref: React.RefObject, isVisible: boolean }}
 */
export function useScrollReveal({ threshold = 0.15, rootMargin = "0px 0px -40px 0px" } = {}) {
    const ref = useRef(null)
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const el = ref.current
        if (!el) return

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true)
                    observer.disconnect()
                }
            },
            { threshold, rootMargin }
        )

        observer.observe(el)
        return () => observer.disconnect()
    }, [threshold, rootMargin])

    return { ref, isVisible }
}
