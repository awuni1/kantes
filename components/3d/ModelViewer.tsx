'use client'

import { Suspense, useRef, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF, PerspectiveCamera, Environment } from '@react-three/drei'
import * as THREE from 'three'

interface ModelProps {
  modelPath: string
}

function Model({ modelPath }: ModelProps) {
  const { scene } = useGLTF(modelPath)
  const modelRef = useRef<THREE.Group>(null)

  // Apply fallback material for missing textures and center the model
  useEffect(() => {
    if (!scene) return

    // Apply fallback materials for any meshes with missing textures
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        // Create a fallback material if textures are missing
        const fallbackMaterial = new THREE.MeshStandardMaterial({
          color: 0xa0a0a0, // Light gray
          metalness: 0.3,
          roughness: 0.7,
        })
        child.material = fallbackMaterial
      }
    })
  }, [scene])

  // Center and scale the model
  if (modelRef.current) {
    const box = new THREE.Box3().setFromObject(modelRef.current)
    const center = box.getCenter(new THREE.Vector3())
    const size = box.getSize(new THREE.Vector3())

    const maxDim = Math.max(size.x, size.y, size.z)
    const scale = 2 / maxDim

    modelRef.current.scale.setScalar(scale)
    modelRef.current.position.sub(center.multiplyScalar(scale))
  }

  return <primitive ref={modelRef} object={scene} />
}

function LoadingFallback() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#333" wireframe />
    </mesh>
  )
}

interface ModelViewerProps {
  modelPath: string
}

export default function ModelViewer({ modelPath }: ModelViewerProps) {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} />

        {/* Camera */}
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />

        {/* Environment for reflections */}
        <Environment preset="studio" />

        {/* Model */}
        <Suspense fallback={<LoadingFallback />}>
          <Model modelPath={modelPath} />
        </Suspense>

        {/* Controls */}
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={2}
          maxDistance={10}
          autoRotate={false}
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  )
}

// Preload the model
useGLTF.preload('/models/text-to-bim.glb')
