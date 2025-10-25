'use client'

export function BackgroundGradient() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Monochrome gradient orbs */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-graphite-900/5 blur-3xl animate-float" />
      <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-graphite-800/5 blur-3xl animate-float" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-0 left-1/3 w-[550px] h-[550px] bg-graphite-700/5 blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      
      {/* Mesh gradient overlay */}
      <div className="absolute inset-0 bg-mesh opacity-50" />
      
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-grid opacity-[0.02]" />
    </div>
  )
}
