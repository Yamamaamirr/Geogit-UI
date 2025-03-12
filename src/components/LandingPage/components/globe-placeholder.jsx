"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

export default function InteractiveGlobe() {
  const mountRef = useRef(null)

  useEffect(() => {
    if (!mountRef.current) return

    // Scene setup
    const width = mountRef.current.clientWidth
    const height = mountRef.current.clientHeight
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(width, height)
    mountRef.current.appendChild(renderer.domElement)

    // Add lighting (brighten the scene)
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5) // Increased intensity
    scene.add(ambientLight)
    const pointLight = new THREE.PointLight(0xffffff, 3) // Increased intensity
    pointLight.position.set(15, 15, 15)
    scene.add(pointLight)

    // Create the globe (larger size)
    const globeGeometry = new THREE.SphereGeometry(10, 64, 64) // Increased radius
    const globeMaterial = new THREE.MeshPhongMaterial({
      color: 0x1a73e8,
      specular: 0xffffff,
      shininess: 100, // Increased shininess for a brighter look
      transparent: true,
      opacity: 0.9,
    })
    const globe = new THREE.Mesh(globeGeometry, globeMaterial)
    scene.add(globe)

    // Add colorful texture for the globe
    const loader = new THREE.TextureLoader()
    loader.load("https://unpkg.com/three-globe@2.24.0/example/img/earth-blue-marble.jpg", (texture) => {
      globeMaterial.map = texture
      globeMaterial.needsUpdate = true
    })

    // Add glowing atmosphere (more vibrant and colorful)
    const atmosphereGeometry = new THREE.SphereGeometry(7.2, 64, 64) // Slightly larger than the globe
    const atmosphereMaterial = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vVertexWorldPosition;
        void main() {
          vVertexWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vVertexWorldPosition;
        uniform vec3 glowColor;
        uniform float cameraDistance;
        void main() {
          float intensity = 1.5 - distance(vVertexWorldPosition, cameraPosition) / cameraDistance;
          intensity = pow(intensity, 3.0); // Increased glow intensity
          vec3 color = mix(glowColor, vec3(0.0, 0.8, 1.0), intensity); // Colorful gradient
          gl_FragColor = vec4(color, intensity * 0.8); // Increased opacity
        }
      `,
      uniforms: {
        glowColor: { value: new THREE.Color(0x1a73e8) },
        cameraDistance: { value: 25 },
      },
      transparent: true,
      side: THREE.BackSide,
    })
    const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial)
    scene.add(atmosphere)

    // Add interactive rotation
    let isDragging = false
    let previousMousePosition = { x: 0, y: 0 }
    mountRef.current.addEventListener("mousedown", () => (isDragging = true))
    mountRef.current.addEventListener("mouseup", () => (isDragging = false))
    mountRef.current.addEventListener("mousemove", (event) => {
      if (isDragging) {
        const deltaX = event.clientX - previousMousePosition.x
        const deltaY = event.clientY - previousMousePosition.y
        globe.rotation.y += deltaX * 0.01
        globe.rotation.x += deltaY * 0.01
      }
      previousMousePosition = { x: event.clientX, y: event.clientY }
    })

    // Fix camera position on scroll
    let targetCameraZ = 20 // Increased initial camera distance
    const handleScroll = () => {
      const scrollY = window.scrollY
      targetCameraZ = 20 + scrollY * 0.1 // Adjust the multiplier for sensitivity
      camera.position.z = Math.min(Math.max(targetCameraZ, 15), 30) // Increased range
    }
    window.addEventListener("scroll", handleScroll)

    // Camera position
    camera.position.z = 20

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate)
      if (!isDragging) {
        globe.rotation.y += 0.001
      }
      renderer.render(scene, camera)
    }
    animate()

    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll)
      mountRef.current?.removeChild(renderer.domElement)
    }
  }, [])

  return (
    <section
      id="globe"
      className="w-full py-12 md:py-24 lg:py-32 bg-muted/30 dark:bg-muted/10 relative overflow-hidden"
    >
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="inline-flex items-center rounded-full border border-border/40 bg-background/80 backdrop-blur-sm px-3 py-1 text-sm font-medium text-muted-foreground">
            <span className="flex h-2 w-2 rounded-full bg-primary mr-2"></span>
            Interactive Globe
          </div>
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Explore the World</h2>
            <p className="max-w-[900px] text-muted-foreground dark:text-foreground/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Visualize global data patterns and spatial relationships with our immersive 3D globe.
            </p>
          </div>
        </div>
        <div className="mt-12 flex justify-center">
          <div ref={mountRef} className="w-full h-[700px]"></div> {/* Increased height */}
        </div>
      </div>
    </section>
  )
}