// Footer.jsx — Fade-in on scroll
import { useScrollReveal } from "../hooks/useScrollReveal"

const EASE = "cubic-bezier(0.16, 1, 0.3, 1)"

const Footer = () => {
    const { ref, isVisible: visible } = useScrollReveal({ threshold: 0.2 })

    return (
        <footer
            ref={ref}
            className="bg-[#0a0a0f] text-zinc-500 py-12 px-6 border-t border-white/[0.03]"
            style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(16px)",
                transition: `opacity 0.9s ${EASE}, transform 0.9s ${EASE}`,
            }}
        >
            <div className="max-w-4xl mx-auto flex flex-col items-center text-center space-y-6">

                {/* Brand */}
                <div className="space-y-1">
                    <h2 className="text-zinc-200 text-sm font-semibold tracking-widest uppercase">CODE-H</h2>
                    <p className="text-[10px] leading-relaxed tracking-wider opacity-60">
                        Engineering scalable digital systems.
                    </p>
                </div>

                {/* Links */}
                <div className="flex items-center space-x-4 text-[10px] tracking-wide">
                    <a
                        href="https://github.com/techmhzf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue-500 transition-colors duration-200"
                    >
                        GitHub
                    </a>
                    <span className="w-1 h-1 bg-white/[0.1] rounded-full"></span>
                    <a
                        href="mailto:contact@codeh.com"
                        className="hover:text-blue-500 transition-colors duration-200"
                    >
                        Email
                    </a>
                </div>

                {/* Copyright */}
                <div className="pt-4">
                    <p className="text-[9px] uppercase tracking-[0.2em] opacity-30 text-zinc-600">
                        &copy; {new Date().getFullYear()} CODE-H. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
