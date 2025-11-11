# Font and Shader Animation Integration

## Summary

This document outlines the changes made to fix fonts in the hero/title sections and integrate the Three.js shader animation component.

## Changes Made

### 1. Font Updates

**Fonts Replaced:**
- **Before:** Oswald, Roboto Slab, Space Mono
- **After:** Inter, Playfair Display, JetBrains Mono

**Rationale:**
- **Inter**: Modern, clean sans-serif font with excellent readability. Better complements the vibrant color scheme (warm oranges `oklch(0.65 0.30 45)`, purples `oklch(0.85 0.25 280)`, and greens `oklch(0.75 0.28 120)`)
- **Playfair Display**: Elegant serif font for decorative elements if needed
- **JetBrains Mono**: Professional monospace font for code snippets

**Files Modified:**
- `/workspaces/spark-template/index.html` - Updated Google Fonts link
- `/workspaces/spark-template/src/index.css` - Updated CSS custom properties for fonts and improved heading weights

**Typography Improvements:**
- Increased heading font weights (700 for h2-h6, 800 for h1)
- Improved letter spacing from -0.01em to -0.025em for better visual hierarchy
- Fonts now harmonize better with the vibrant color palette

### 2. Three.js Shader Animation Integration

**Component Added:**
- `/workspaces/spark-template/src/components/ui/shader-animation.tsx`

**Features:**
- WebGL-based shader animation using Three.js
- Responsive sizing that adapts to container
- Animated colorful concentric ring patterns
- Proper cleanup to prevent memory leaks
- Optimized rendering with requestAnimationFrame

**Demo Component:**
- `/workspaces/spark-template/src/components/ShaderDemo.tsx` - Ready-to-use demo showcasing the shader animation

**Technical Details:**
- Uses fragment shader with mathematical patterns
- Implements proper Three.js lifecycle management
- Handles window resize events
- Disposes of resources on unmount

### 3. Code Cleanup

**Files Modified:**
- `/workspaces/spark-template/src/components/AnimatedHero.tsx` - Removed deprecated shader usage
- `/workspaces/spark-template/src/pages/ConsultingPage.tsx` - Removed shader animation from background
- `/workspaces/spark-template/src/pages/LabsPage.tsx` - Removed shader animation from background
- `/workspaces/spark-template/src/pages/PolicyPage.tsx` - Removed shader animation from background

The old canvas-based shader was replaced with a cleaner Three.js implementation. Background shader animations were removed from individual pages to reduce visual clutter, but the component is available for use anywhere in the app.

## How to Use the Shader Animation

### Basic Usage

```tsx
import { ShaderAnimation } from "@/components/ui/shader-animation"

export default function MyComponent() {
  return (
    <div className="relative h-[500px]">
      <ShaderAnimation />
      <div className="relative z-10">
        {/* Your content here */}
      </div>
    </div>
  )
}
```

### Demo Usage

```tsx
import ShaderDemo from "@/components/ShaderDemo"

export default function MyPage() {
  return <ShaderDemo />
}
```

## Dependencies

- **three** (already installed in project) - 3D graphics library for WebGL rendering

## Design Notes

The new fonts create a more refined, professional aesthetic that better suits the modern, tech-forward nature of AltruisticXAI. Inter's clean lines and excellent readability at all sizes make it perfect for the data-heavy interface, while maintaining visual harmony with the colorful, vibrant design system.

The shader animation provides an eye-catching visual element that can be used for hero sections, loading states, or decorative backgrounds while maintaining good performance through hardware-accelerated WebGL rendering.
