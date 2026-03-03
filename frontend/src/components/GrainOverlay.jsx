// GrainOverlay.jsx — Subtle film grain texture overlay for premium feel
const GrainOverlay = () => (
    <div
        aria-hidden="true"
        style={{
            position: "fixed",
            inset: 0,
            zIndex: 9998,
            pointerEvents: "none",
            opacity: 0.035,
            mixBlendMode: "overlay",
        }}
    >
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <filter id="grain-filter">
                <feTurbulence
                    type="fractalNoise"
                    baseFrequency="0.65"
                    numOctaves="3"
                    stitchTiles="stitch"
                />
                <feColorMatrix type="saturate" values="0" />
            </filter>
            <rect width="100%" height="100%" filter="url(#grain-filter)" />
        </svg>
    </div>
)

export default GrainOverlay
