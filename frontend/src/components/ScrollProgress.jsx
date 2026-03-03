// ScrollProgress.jsx — Thin vertical scroll progress indicator
import { useScrollProgress } from "../hooks/useScrollProgress"

const ScrollProgress = () => {
    const progress = useScrollProgress()

    return (
        <div
            aria-hidden="true"
            style={{
                position: "fixed",
                right: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                width: "2px",
                height: "80px",
                backgroundColor: "rgba(255,255,255,0.06)",
                borderRadius: "2px",
                zIndex: 9999,
                overflow: "hidden",
                pointerEvents: "none",
            }}
        >
            <div
                style={{
                    width: "100%",
                    height: `${progress * 100}%`,
                    background: "linear-gradient(180deg, #2563eb, #60a5fa)",
                    borderRadius: "2px",
                    transition: "height 0.15s ease-out",
                    boxShadow: progress > 0.01 ? "0 0 6px rgba(37,99,235,0.3)" : "none",
                }}
            />
        </div>
    )
}

export default ScrollProgress
