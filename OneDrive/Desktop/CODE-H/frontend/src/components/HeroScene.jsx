import { useRef, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, MeshTransmissionMaterial, Environment } from '@react-three/drei'
import * as THREE from 'three'

// The actual rotating cube mesh
function Cube({ mouse }) {
    const meshRef = useRef()
    const groupRef = useRef()

    useFrame((state, delta) => {
        if (!meshRef.current || !groupRef.current) return

        // Slow base rotation
        meshRef.current.rotation.y += delta * 0.18
        meshRef.current.rotation.x += delta * 0.06

        // Mouse parallax tilt on the group
        const targetX = (mouse.current.y * -0.25)
        const targetY = (mouse.current.x * 0.25)
        groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * 0.05
        groupRef.current.rotation.y += (targetY - groupRef.current.rotation.y) * 0.05
    })

    return (
        <group ref={groupRef}>
            <mesh ref={meshRef} castShadow>
                {/* Slightly bevelled box via subdivisions */}
                <boxGeometry args={[2, 2, 2]} />
                <meshStandardMaterial
                    color="#1a1a1f"
                    metalness={0.95}
                    roughness={0.15}
                    envMapIntensity={1.2}
                />
            </mesh>

            {/* Inner wireframe overlay for engineering feel */}
            <mesh ref={null}>
                <boxGeometry args={[2.01, 2.01, 2.01]} />
                <meshBasicMaterial
                    color="#1e40af"
                    wireframe
                    transparent
                    opacity={0.08}
                />
            </mesh>
        </group>
    )
}

// Lights setup — no neon, just a clean blue rim and soft key light
function Lights() {
    return (
        <>
            {/* Ambient — very dim so the metallic material reads well */}
            <ambientLight intensity={0.15} />

            {/* Top-left soft key light (cool white) */}
            <directionalLight
                position={[-3, 4, 3]}
                intensity={0.8}
                color="#c8d8f0"
            />

            {/* Blue rim light from the right-back */}
            <pointLight
                position={[4, 1, -3]}
                intensity={8}
                color="#2563eb"
                distance={12}
                decay={2}
            />

            {/* Very subtle warm fill from front-bottom */}
            <pointLight
                position={[0, -3, 3]}
                intensity={1.5}
                color="#a0b4cc"
                distance={10}
                decay={2}
            />
        </>
    )
}

export default function HeroScene() {
    const mouse = useRef({ x: 0, y: 0 })

    useEffect(() => {
        const handleMouseMove = (e) => {
            // Normalise to -1 … +1
            mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1
            mouse.current.y = (e.clientY / window.innerHeight) * 2 - 1
        }
        window.addEventListener('mousemove', handleMouseMove)
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [])

    return (
        <Canvas
            camera={{ position: [0, 0, 5.5], fov: 42 }}
            gl={{ antialias: true, alpha: true }}
            style={{ background: 'transparent' }}
            dpr={[1, 2]}
        >
            <Lights />
            <Cube mouse={mouse} />
        </Canvas>
    )
}
