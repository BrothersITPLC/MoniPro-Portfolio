import type { RefObject } from "react"

/**
 * Creates and manages particle animations for a component
 * @param containerRef - Reference to the container element
 * @param options - Optional configuration for the animation
 * @returns Cleanup function to remove particles and clear interval
 */
export const createParticleAnimation = (
  containerRef: RefObject<HTMLDivElement>,
  options = {
    interval: 300,
    minSize: 5,
    maxSize: 25,
    minDuration: 10,
    maxDuration: 20,
    hueRange1: [200, 260], // Blue range
    hueRange2: [240, 300], // Blue to light blue/purple range
  },
) => {
  if (!containerRef.current) return () => {}

  const createParticle = () => {
    if (!containerRef.current) return

    const particle = document.createElement("div")
    particle.classList.add("particle")

    // Random position, size and color
    const size = Math.random() * (options.maxSize - options.minSize) + options.minSize
    const posX = Math.random() * containerRef.current.offsetWidth
    const posY = Math.random() * containerRef.current.offsetHeight
    const delay = Math.random() * 5
    const duration = Math.random() * (options.maxDuration - options.minDuration) + options.minDuration

    particle.style.width = `${size}px`
    particle.style.height = `${size}px`
    particle.style.left = `${posX}px`
    particle.style.top = `${posY}px`
    particle.style.animationDelay = `${delay}s`
    particle.style.animationDuration = `${duration}s`

    // Random gradient colors
    const hue1 = Math.floor(Math.random() * (options.hueRange1[1] - options.hueRange1[0])) + options.hueRange1[0]
    const hue2 = Math.floor(Math.random() * (options.hueRange2[1] - options.hueRange2[0])) + options.hueRange2[0]
    particle.style.background = `linear-gradient(135deg, hsl(${hue1}, 80%, 60%), hsl(${hue2}, 80%, 60%))`

    containerRef.current.appendChild(particle)

    // Remove particle after animation completes
    setTimeout(
      () => {
        if (containerRef.current && containerRef.current.contains(particle)) {
          containerRef.current.removeChild(particle)
        }
      },
      duration * 1000 + delay * 1000,
    )
  }

  // Create particles at intervals
  const interval = setInterval(createParticle, options.interval)

  // Return cleanup function
  return () => {
    clearInterval(interval)
    if (containerRef.current) {
      const particles = containerRef.current.querySelectorAll(".particle")
      particles.forEach((particle) => {
        containerRef.current?.removeChild(particle)
      })
    }
  }
}
