// SectionDivider.jsx — Reusable gradient line divider between sections
const SectionDivider = ({ color = "#2563eb", opacity = 0.4 }) => (
    <div
        aria-hidden="true"
        style={{
            width: "100%",
            height: "1px",
            background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
            opacity,
        }}
    />
)

export default SectionDivider
