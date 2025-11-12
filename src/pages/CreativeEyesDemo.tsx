import { CreativeEyes } from "@/components/ui/creative-eyes-hero-section-1"

export default function CreativeEyesDemo() {
  return (
    <div className="relative h-screen w-screen bg-background overflow-hidden">
      <CreativeEyes />
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Creative Eyes Demo</h1>
          <p className="text-white/80">3D Interactive Background</p>
        </div>
      </div>
    </div>
  )
}
