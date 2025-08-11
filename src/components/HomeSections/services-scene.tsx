'use client'

import { useRef, useMemo, useEffect, useState, forwardRef, useImperativeHandle } from 'react'
import { Canvas, useThree, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import vertexShader from '@/shaders/grain-vertex.shader'
import fragmentShader from '@/shaders/grain-fragment.shader'
import { degToRad, lerp, randFloat } from 'three/src/math/MathUtils.js'
import { useGLTF } from '@react-three/drei'
import { Panel } from './sticky-sections'
import { CMSLink } from '@/components/Link'
import { useGSAP } from '@gsap/react'
import SplitType from 'split-type'
import { useWindowSize } from 'usehooks-ts'
import Link from 'next/link'

gsap.registerPlugin(ScrollTrigger, SplitType)

// Model configuration
const modelConfig = [
  {
    path: '/models/branding.glb',
    position: [-1.7, -1.5, 1.7],
    rotation: [0, degToRad(15), 0],
    scale: 1.5,
  },
  {
    path: '/models/marketing.glb',
    position: [-1.5, -1.5, 1.5],
    rotation: [0, degToRad(45), 0],
    scale: 1.6,
  },
  {
    path: '/models/multimedia.glb',
    position: [-1.3, -1.5, 1.3],
    rotation: [0, degToRad(66), 0],
    scale: 1.4,
  },
  {
    path: '/models/experience.glb',
    position: [-1.9, -1.5, 1.9],
    rotation: [0, degToRad(10), 0],
    scale: 1.3,
  },
  {
    path: '/models/events.glb',
    position: [-1.5, -1.3, 1.5],
    rotation: [0, degToRad(33), 0],
    scale: 1.5,
  },
  {
    path: '/models/team.glb',
    position: [-1.5, -2, 1.5],
    rotation: [0, degToRad(33), 0],
    scale: 1,
  },
]

// Preload all models
modelConfig.forEach((config) => useGLTF.preload(config.path))

interface SphereProps {
  material: THREE.ShaderMaterial
  scale: number
  position: [number, number, number]
  mouse: THREE.Vector2
}

function Sphere({ material, scale, position, mouse }: SphereProps) {
  const meshRef = useRef<THREE.Mesh>(null!)

  const [initY, initX, offsetY, invSpeed, coefX] = useMemo(() => {
    const initY = position[1]
    const initX = position[0]
    const offsetY = randFloat(0, 100)
    const invSpeed = randFloat(1000, 1500)
    const coefX = randFloat(0.5, 1)
    return [initY, initX, offsetY, invSpeed, coefX]
  }, [position])

  useFrame(({ clock }) => {
    if (!meshRef.current) return
    const now = clock.getElapsedTime() * 1000 // Convert to ms
    const y = initY + Math.sin(now / invSpeed + offsetY) * 0.5 + mouse.y * 0.2
    const x = initX + mouse.x * coefX
    meshRef.current.position.set(x, y, position[2])
  })

  return (
    <mesh ref={meshRef} position={position} scale={[scale, scale, scale]}>
      <sphereGeometry args={[1, 32, 32]} />
      <primitive object={material} attach="material" />
    </mesh>
  )
}

interface ModelWithAnimationProps {
  modelPath: string
  visible: boolean
  index: number
  material: THREE.ShaderMaterial
  mouse: THREE.Vector2
}

interface AnimationValues {
  x: number
  y: number
  z: number
  opacity: number
  rotation: number
}

function ModelWithAnimation({
  modelPath,
  visible,
  index,
  material,
  mouse,
}: ModelWithAnimationProps) {
  const modelRef = useRef<THREE.Group>(null)
  const { scene } = useGLTF(modelPath)
  const clonedScene = useMemo(() => scene.clone(), [scene])

  const animationRef = useRef<AnimationValues>({
    x: (modelConfig[index]?.position[0] || 0) + 10, // Start offscreen
    y: modelConfig[index]?.position[1] || 0,
    z: modelConfig[index]?.position[2] || 0,
    opacity: 0,
    rotation: modelConfig[index]?.rotation[1] || 0,
  })

  // Initial position offscreen with base Y and Z
  const [initY, offsetY, invSpeed] = useMemo(() => {
    const initY = modelConfig[index]?.position[1] || 0
    const offsetY = randFloat(0, 100)
    const invSpeed = randFloat(1000, 1500)
    return [initY, offsetY, invSpeed]
  }, [index])

  // Apply material to all meshes
  useEffect(() => {
    if (clonedScene && material) {
      clonedScene.traverse((child: any) => {
        if (child.isMesh) {
          child.material = material.clone()
          child.material.transparent = true
        }
      })
    }
  }, [clonedScene, material])

  // Setup animation based on visibility
  useEffect(() => {
    if (visible) {
      // Animate in
      gsap.to(animationRef.current, {
        x: modelConfig[index]?.position[0] || 0,
        opacity: 1,
        duration: 1,
        ease: 'power2.out',
      })
    } else {
      // Animate out
      gsap.to(animationRef.current, {
        x: (modelConfig[index]?.position[0] || 0) + 10,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.in',
      })
    }
  }, [visible, index])

  useFrame(({ clock }) => {
    if (!modelRef.current) return

    const now = clock.getElapsedTime() * 1000
    // Floating animation + mouse influence
    const y = initY + Math.sin(now / invSpeed + offsetY) * 0.2 + mouse.y * 0.2

    // Update position from animation values
    modelRef.current.position.x = animationRef.current.x + mouse.x * 0.3
    modelRef.current.position.y = y
    modelRef.current.position.z = animationRef.current.z

    // Update rotation with mouse influence
    modelRef.current.rotation.y = animationRef.current.rotation + mouse.x * 0.2

    // Update opacity for all meshes
    modelRef.current.traverse((child: any) => {
      if (child.isMesh && child.material) {
        child.material.opacity = animationRef.current.opacity
      }
    })
  })

  return (
    <primitive
      ref={modelRef}
      object={clonedScene}
      scale={[
        modelConfig[index]?.scale || 1,
        modelConfig[index]?.scale || 1,
        modelConfig[index]?.scale || 1,
      ]}
      rotation={modelConfig[index]?.rotation || [0, 0, 0]}
      position={[animationRef.current.x, animationRef.current.y, animationRef.current.z]}
    />
  )
}

interface SceneComponentRef {
  setActivePanel: (index: number) => void
}

// Scene component with exposed method to set active panel
const SceneComponent = forwardRef<SceneComponentRef, unknown>((_, ref) => {
  const [activePanel, setActivePanel] = useState(-1)
  const currentMouse = useRef(new THREE.Vector2(0, 0))
  const { pointer, scene } = useThree()
  const { width } = useWindowSize()

  // Expose method to parent component
  useImperativeHandle(ref, () => ({
    setActivePanel: (index) => {
      setActivePanel(index)
    },
  }))

  // Smooth mouse movement
  useFrame(() => {
    currentMouse.current.x = lerp(currentMouse.current.x, pointer.x, 0.1)
    currentMouse.current.y = lerp(currentMouse.current.y, pointer.y, 0.1)
  })

  // Create material
  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uLightPos: {
          value: [new THREE.Vector3(0, 3, 1), new THREE.Vector3(10, 3, 1)],
        },
        uLightColor: {
          value: [new THREE.Color(0x555555), new THREE.Color(0x555555)],
        },
        uLightIntensity: { value: 4.5 },
        uNoiseCoef: { value: 5.0 },
        uNoiseMin: { value: 0.76 },
        uNoiseMax: { value: 4 },
        uNoiseScale: { value: 0.8 },
        uColor: { value: new THREE.Color(0xb2ecff) },
      },
      transparent: true,
    })
  }, [])

  // Background setup
  useEffect(() => {
    // const texture = new THREE.TextureLoader().load('/models/grey-gradient.png')
    // scene.background = texture
  }, [scene])

  // Generate background spheres
  const spheres = useMemo(() => {
    const dist = 3
    let angle = 0
    const spheres: { position: [number, number, number]; scale: number }[] = []
    for (let i = 0; i < 5; i++) {
      const position: [number, number, number] = [
        Math.cos(angle) * dist,
        randFloat(-1, 1),
        Math.sin(angle) * dist,
      ]
      const scale = randFloat(0.15, 0.3)
      spheres.push({ position, scale })
      angle += degToRad(360 / 5)
    }
    return spheres
  }, [])

  return (
    <>
      {/* Models */}
      {width >= 1280 &&
        modelConfig.map((config, index) => (
          <ModelWithAnimation
            key={index}
            modelPath={config.path}
            visible={activePanel === index}
            index={index}
            material={material}
            mouse={currentMouse.current}
          />
        ))}

      {/* Background spheres */}
      {spheres.map((sph, i) => (
        <Sphere
          key={i}
          material={material}
          scale={sph.scale}
          position={sph.position}
          mouse={currentMouse.current}
        />
      ))}
    </>
  )
})

// Main exported component
export function ServicesScene({
  panels,
  panelRefs,
  ctaLink,
}: {
  panels: Panel[]
  panelRefs: HTMLDivElement[]
  ctaLink?: any
}) {
  const sceneRef = useRef<SceneComponentRef | null>(null)
  const [ctaText, setCtaText] = useState<string>('')

  const wordsToSplitRef = useRef<HTMLParagraphElement | null>(null)

  useGSAP(
    () => {
      if (!wordsToSplitRef.current) return

      const splitText = new SplitType(wordsToSplitRef.current, {
        types: 'chars',
        tagName: 'span',
      })

      gsap.fromTo(
        splitText.chars,
        {
          filter: 'blur(4px)',
          ease: 'power3.inOut',
          opacity: 0.2,
          y: -10,
        },
        {
          filter: 'blur(0px)',
          ease: 'power3.inOut',
          opacity: 1,
          stagger: 0.03,
          y: 0,
        },
      )

      return () => {
        splitText.revert()
      }
    },
    { dependencies: [ctaText, panelRefs] },
  )

  // Setup scroll triggers to detect active panel using refs
  useEffect(() => {
    if (!panelRefs || !panelRefs.length) return

    const triggers = panelRefs
      .map((ref, index) => {
        if (!ref) return null

        const setActivePanel = (index: number) => {
          sceneRef.current?.setActivePanel(index)
          setCtaText(panels[index]?.cta || '')
        }

        return ScrollTrigger.create({
          trigger: ref,
          start: 'center center',
          end: 'bottom top',
          markers: false,
          onEnter: () => setActivePanel(index),
          onEnterBack: () => setActivePanel(index),
          onLeave: () => {
            if (index === panelRefs.length - 1) {
              setActivePanel(-1)
              setCtaText('')
            }
          },
          onLeaveBack: () => {
            if (index === 0) {
              setActivePanel(-1)
            }
            setActivePanel(index - 1)
          },
        })
      })
      .filter(Boolean)

    return () => {
      triggers.forEach((trigger) => trigger?.kill())
    }
  }, [panelRefs])

  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex flex-col items-center justify-center">
      <Canvas camera={{ position: [4, 1.5, 5.5], fov: 50 }} className="w-full h-full">
        <SceneComponent ref={sceneRef} />
      </Canvas>

      {ctaText && ctaLink && (
        <Link href={'/contanct'} className="group fixed bottom-0 left-0 text-primary p-5 md:p-10">
          <span className="text-2" ref={wordsToSplitRef} key={ctaText}>
            {ctaText}{' '}
            <span className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-all">
              &#8599;
            </span>
          </span>
        </Link>
      )}
    </div>
  )
}

// Add display name to avoid ESLint warning
SceneComponent.displayName = 'SceneComponent'
