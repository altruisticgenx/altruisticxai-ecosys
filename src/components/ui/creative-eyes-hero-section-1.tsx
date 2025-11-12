import { useEffect, useRef } from "react"

export function CreativeEyes() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let mouseX = window.innerWidth / 2
    let mouseY = window.innerHeight / 2

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()

    const eyes: Array<{
      x: number
      y: number
      radius: number
      pupilRadius: number
      pupilX: number
      pupilY: number
    }> = []

    for (let i = 0; i < 15; i++) {
      const radius = 30 + Math.random() * 40
      eyes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius,
        pupilRadius: radius * 0.3,
        pupilX: 0,
        pupilY: 0,
      })
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    const animate = () => {
      if (!ctx || !canvas) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      eyes.forEach((eye) => {
        const dx = mouseX - eye.x
        const dy = mouseY - eye.y
        const angle = Math.atan2(dy, dx)
        const distance = Math.min(eye.radius * 0.4, Math.sqrt(dx * dx + dy * dy))

        eye.pupilX = Math.cos(angle) * (distance * 0.3)
        eye.pupilY = Math.sin(angle) * (distance * 0.3)

        ctx.fillStyle = "rgba(255, 255, 255, 0.05)"
        ctx.beginPath()
        ctx.arc(eye.x, eye.y, eye.radius, 0, Math.PI * 2)
        ctx.fill()

        ctx.fillStyle = "rgba(255, 255, 255, 0.8)"
        ctx.beginPath()
        ctx.arc(eye.x + eye.pupilX, eye.y + eye.pupilY, eye.pupilRadius, 0, Math.PI * 2)
        ctx.fill()

        ctx.fillStyle = "rgba(255, 255, 255, 1)"
        ctx.beginPath()
        ctx.arc(
          eye.x + eye.pupilX + eye.pupilRadius * 0.3,
          eye.y + eye.pupilY - eye.pupilRadius * 0.3,
          eye.pupilRadius * 0.3,
          0,
          Math.PI * 2
        )
        ctx.fill()
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("resize", resize)
    animate()

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("resize", resize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ mixBlendMode: "screen" }}
    />
  )
}
