'use client'

import React, { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'
import * as THREE from 'three'

// --- Shaders remain the same ---
const vertexShader = `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    // When using InstancedMesh, modelMatrix is implicitly applied by the instanceMatrix
    gl_Position = projectionMatrix * modelViewMatrix * instanceMatrix * vec4(position, 1.0);
  }
`

const fragmentShader = `
  uniform sampler2D map;
  uniform vec3 fogColor;
  uniform float fogNear;
  uniform float fogFar;

  varying vec2 vUv;

  void main() {
    // Calculate depth in world/view space before projection
    // This might require passing depth from vertex shader or using different fog technique
    // For simplicity, let's stick with gl_FragCoord for now, but be aware it might behave
    // slightly differently with instancing scaling if not careful.
    float depth = gl_FragCoord.z / gl_FragCoord.w;
    float fogFactor = smoothstep(fogNear, fogFar, depth);

    gl_FragColor = texture2D(map, vUv);
    // Consider optimizing this pow function if still slow
    gl_FragColor.w *= pow(gl_FragCoord.z, 20.0);
    gl_FragColor = mix(gl_FragColor, vec4(fogColor, gl_FragColor.w), fogFactor);
  }
`
// --- End Shaders ---

// Instanced Cloud Meshes component
const InstancedCloudMeshes = () => {
  const startTime = useRef(Date.now())
  const mousePosition = useRef({ x: 0, y: 0 })
  const { camera } = useThree()
  const instancedMeshRef = useRef<THREE.InstancedMesh>(null!)
  const dummy = useMemo(() => new THREE.Object3D(), []) // Used for matrix calculations

  const cloudTexture = useTexture('./cloud.png') // Ensure this is power-of-two size

  // Texture settings
  cloudTexture.minFilter = THREE.LinearMipmapLinearFilter
  cloudTexture.magFilter = THREE.LinearFilter

  // Fog setup (could potentially use scene.fog if not using custom shader logic)
  const fog = useMemo(() => new THREE.Fog(0xffffff, -100, 3000), []) // White fog

  const shaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        map: { value: cloudTexture },
        fogColor: { value: fog.color },
        fogNear: { value: fog.near },
        fogFar: { value: fog.far },
      },
      vertexShader,
      fragmentShader,
      depthWrite: false,
      depthTest: false, // Usually true is safer unless you know you don't need it
      transparent: true,
    })
  }, [cloudTexture, fog])

  // Geometry for a SINGLE plane
  const planeGeometry = useMemo(() => new THREE.PlaneGeometry(64, 64), [])

  // Setup Instances
  const COUNT = 50 // START WITH A LOWER COUNT! Test performance. 8000 might still be too many.
  const Z_RANGE = 4000 // How far the clouds spread along Z

  useEffect(() => {
    if (!instancedMeshRef.current) return

    for (let i = 0; i < COUNT; i++) {
      const x = Math.random() * 1000 - 500
      // Adjust Y distribution if needed
      const y = -Math.random() * Math.random() * 200 - 15
      // Spread instances over the Z_RANGE
      const z = Math.random() * Z_RANGE // Position within the range

      const rotation = Math.random() * Math.PI
      const scale = Math.random() * Math.random() * 4.5 + 3.5

      dummy.position.set(x, y, z)
      dummy.rotation.set(0, 0, rotation) // Rotate around Z axis for 2D plane
      dummy.scale.set(scale, scale, scale)
      dummy.updateMatrix()

      instancedMeshRef.current.setMatrixAt(i, dummy.matrix)
    }
    // Important: Update the instance matrix buffer
    instancedMeshRef.current.instanceMatrix.needsUpdate = true
  }, [COUNT, Z_RANGE, dummy]) // Re-run if COUNT/Z_RANGE changes

  // Handle mouse movement (no changes needed)
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mousePosition.current = {
        x: (event.clientX - window.innerWidth / 2) * 0.25,
        y: (event.clientY - window.innerHeight / 2) * 0.15,
      }
    }
    document.addEventListener('mousemove', handleMouseMove)
    return () => document.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Animation loop
  useFrame((state, delta) => {
    // Calculate camera's target Z position for looping effect
    const timeElapsed = Date.now() - startTime.current
    const cycleDuration = Z_RANGE / (0.03 * 1000) // Time to travel Z_RANGE at speed 0.03 units/ms
    const positionInCycle = (timeElapsed * 0.03) % Z_RANGE

    // Move camera opposite to cloud direction
    const targetCameraZ = Z_RANGE - positionInCycle

    camera.position.x += (mousePosition.current.x - camera.position.x) * 0.01
    camera.position.y += (-mousePosition.current.y - camera.position.y) * 0.01
    // Smoothly move camera Z towards the target position
    camera.position.z += (targetCameraZ - camera.position.z) * 0.1 // Adjust 0.1 for desired smoothness

    // Optional: Update instance matrices for looping (more complex)
    // If you need clouds to wrap around infinitely, you'd check instance positions
    // here and move those that go past one end of Z_RANGE to the other end.
    // This is more involved than just moving the camera.
  })

  return (
    // Render the InstancedMesh ONCE
    <instancedMesh
      ref={instancedMeshRef}
      args={[planeGeometry, shaderMaterial, COUNT]} // Pass geometry, material, count
    />
  )
}

// Main component (Canvas setup)
const Clouds: React.FC = () => {
  return (
    <div className="absolute top-0 size-full">
      <Canvas
        camera={{
          // Adjust camera Z start position based on Z_RANGE if needed
          position: [0, 0, 8000], // Start at the far end
          fov: 30,
          near: 1,
          // Adjust far plane to encompass the Z_RANGE
          far: 11000, // Should be camera.z + Z_RANGE or more
        }}
        gl={{
          antialias: false,
          powerPreference: 'high-performance',
          precision: 'lowp', // Lower precision for better performance
          alpha: true,
          stencil: false, // Disable unused features
          depth: true,
        }}
        dpr={[0.75, 1]} // Scale resolution based on device capability
        performance={{ min: 0.5 }}
      >
        <InstancedCloudMeshes />
        {/* Add background/other elements here if needed */}
      </Canvas>
    </div>
  )
}

export default Clouds
