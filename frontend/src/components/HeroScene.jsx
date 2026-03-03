import { useRef, useEffect, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Edges } from '@react-three/drei'
import * as THREE from 'three'

// Hollow wireframe cube — edges only, interactive
function Cube({ mouse, dragging, dragDelta }) {
    const groupRef = useRef()
    const innerRef = useRef()
    const baseRotation = useRef({ x: 0.4, y: 0.4 })

    useFrame((state, delta) => {
        if (!groupRef.current) return

        // Continuous slow spin for outer group
        baseRotation.current.y += delta * 0.25
        baseRotation.current.x += delta * 0.08

        if (dragging.current) {
            baseRotation.current.x += dragDelta.current.y * 0.008
            baseRotation.current.y += dragDelta.current.x * 0.008
            dragDelta.current.x = 0
            dragDelta.current.y = 0
        }

        // Mouse parallax
        const parallaxX = mouse.current.y * -0.6
        const parallaxY = mouse.current.x * 0.6
        const targetX = baseRotation.current.x + parallaxX
        const targetY = baseRotation.current.y + parallaxY

        groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * 0.08
        groupRef.current.rotation.y += (targetY - groupRef.current.rotation.y) * 0.08

        // Inner cube — spins independently (opposite + faster)
        if (innerRef.current) {
            innerRef.current.rotation.y -= delta * 0.5
            innerRef.current.rotation.x += delta * 0.3
        }
    })

    return (
        <group ref={groupRef}>
            {/* Outer cube */}
            <mesh>
                <boxGeometry args={[2, 2, 2]} />
                <meshBasicMaterial transparent opacity={0} />
                <Edges
                    threshold={15}
                    lineWidth={1.5}
                    color="#94a3b8"
                />
            </mesh>

            {/* Inner cube — rotates independently */}
            <mesh ref={innerRef}>
                <boxGeometry args={[1.3, 1.3, 1.3]} />
                <meshBasicMaterial transparent opacity={0} />
                <Edges
                    threshold={15}
                    lineWidth={1}
                    color="#64748b"
                />
            </mesh>
        </group>
    )
}

// Minimal lighting — just enough for edge visibility
function Lights() {
    return (
        <>
            <ambientLight intensity={0.5} />
            <directionalLight position={[-3, 4, 3]} intensity={0.4} color="#e2e8f0" />
        </>
    )
}

export default function HeroScene() {
    const mouse = useRef({ x: 0, y: 0 })
    const dragging = useRef(false)
    const dragDelta = useRef({ x: 0, y: 0 })
    const lastMouse = useRef({ x: 0, y: 0 })

    useEffect(() => {
        const handleMouseMove = (e) => {
            mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1
            mouse.current.y = (e.clientY / window.innerHeight) * 2 - 1

            if (dragging.current) {
                dragDelta.current.x = e.clientX - lastMouse.current.x
                dragDelta.current.y = e.clientY - lastMouse.current.y
                lastMouse.current.x = e.clientX
                lastMouse.current.y = e.clientY
            }
        }
        const handleMouseDown = (e) => {
            dragging.current = true
            lastMouse.current.x = e.clientX
            lastMouse.current.y = e.clientY
        }
        const handleMouseUp = () => {
            dragging.current = false
        }

        window.addEventListener('mousemove', handleMouseMove)
        window.addEventListener('mousedown', handleMouseDown)
        window.addEventListener('mouseup', handleMouseUp)
        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
            window.removeEventListener('mousedown', handleMouseDown)
            window.removeEventListener('mouseup', handleMouseUp)
        }
    }, [])

    return (
        <Canvas
            camera={{ position: [0, 0, 5.5], fov: 42 }}
            gl={{ antialias: true, alpha: true }}
            style={{ background: 'transparent', cursor: 'grab' }}
            dpr={[1, 2]}
        >
            <Lights />
            <Cube mouse={mouse} dragging={dragging} dragDelta={dragDelta} />
        </Canvas>
    )
}
