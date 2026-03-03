// useScrollProgress.js — Tracks normalized scroll position (0–1)
import { useEffect, useState, useCallback } from "react"

/**
 * Returns a value from 0 (top) to 1 (bottom) representing scroll progress.
 * Throttled with requestAnimationFrame for 60fps performance.
 */
export function useScrollProgress() {
    const [progress, setProgress] = useState(0)

    const handleScroll = useCallback(() => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop
        const docHeight = document.documentElement.scrollHeight - window.innerHeight
        if (docHeight <= 0) return
        setProgress(Math.min(scrollTop / docHeight, 1))
    }, [])

    useEffect(() => {
        let rafId = null
        const onScroll = () => {
            if (rafId) return
            rafId = requestAnimationFrame(() => {
                handleScroll()
                rafId = null
            })
        }

        window.addEventListener("scroll", onScroll, { passive: true })
        handleScroll() // initial
        return () => {
            window.removeEventListener("scroll", onScroll)
            if (rafId) cancelAnimationFrame(rafId)
        }
    }, [handleScroll])

    return progress
}
