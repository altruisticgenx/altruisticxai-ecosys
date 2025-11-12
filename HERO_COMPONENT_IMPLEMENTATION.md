# Hero Component Implementation Notes

## What Was Done

Created a production-ready Hero component (`/src/components/Hero.tsx`) adapted for the Vite/React Spark environment with the following improvements:

### ✅ Implemented Features

1. **Error Boundaries for WebGL**
   - `WebGLErrorBoundary` class component catches WebGL/Three.js failures
   - Graceful fallback to CSS gradient animation
   - Development-only error logging (no console noise in production)

2. **Lazy Loading**
   - `ShaderAnimation` component loaded with React.lazy()
   - Suspense fallback prevents blank screens during load
   - Reduces initial bundle size

3. **Accessibility Improvements**
   - Proper ARIA labels (`aria-labelledby`, `aria-label`, `role`)
   - `aria-hidden` on decorative elements
   - Semantic HTML structure
   - Keyboard-accessible buttons

4. **Reduced Motion Support**
   - Checks `useReducedMotion()` hook
   - Disables heavy animations for users who prefer reduced motion
   - Falls back to static gradient

5. **Performance Optimizations**
   - Lazy-loaded heavy WebGL components
   - Suspense boundaries prevent blocking render
   - Error boundaries prevent cascade failures
   - Analytics hooks via `data-analytics-event` attributes

6. **Safe External Links**
   - Uses `rel="noopener noreferrer"` for security
   - Opens booking link in new tab safely

## What's Different From The Provided Code

The task included Next.js-specific code that won't work in this Vite environment:

### ❌ Not Applicable (Next.js Only)
- `"use client"` directive (Vite doesn't use this)
- `dynamic()` from `next/dynamic` (used React.lazy instead)
- `@repo/ui` imports (this is a single-app Spark template, not a monorepo)

### ✅ Vite Equivalents Used
- React `lazy()` for code splitting
- `import.meta.env.DEV` instead of `process.env.NODE_ENV`
- `@/components/ui/*` imports (existing project structure)
- Standard React Suspense

## Integration Options

### Option 1: Replace Inline Hero in HomePage

Replace lines ~144-181 in `/src/pages/HomePage.tsx` with:

\`\`\`tsx
import Hero from "@/components/Hero"

// ... in the component
return (
  <LayoutShell>
    <Hero />
    {/* rest of the page */}
  </LayoutShell>
)
\`\`\`

### Option 2: Keep Current Implementation

The current HomePage already has a well-structured hero section. The new component might be overkill unless:
- You want to reuse the hero across multiple pages
- You want the WebGL shader background (currently uses CSS gradients)
- You need the extra error handling for WebGL

## Monorepo Migration (Future)

The task references moving to `@repo/ui` shared packages. If you decide to do this:

1. **Create monorepo structure:**
   \`\`\`
   packages/
     ui/          # Shared UI components
     lib/         # Shared utilities/types
   apps/
     govxai/      # Current Spark app
   \`\`\`

2. **Update imports:**
   - Replace `@/components/ui/*` → `@repo/ui/*`
   - This requires workspace configuration in package.json
   - Spark templates are single-app by default

3. **Consider trade-offs:**
   - Monorepos add complexity
   - Spark templates optimize for single-app speed
   - Only migrate if you're building multiple related apps

## Recommendations

**For This Spark Template:**
- ✅ Use the new Hero component if you want reusability
- ✅ Keep current inline hero if you prefer simplicity
- ✅ The ShaderAnimation is already lazy-loaded in shader-animation.tsx

**For Monorepo Setup:**
- ⚠️ Not recommended for Spark templates
- ⚠️ Requires significant restructuring
- ⚠️ Better suited for traditional Next.js/Turborepo projects

## Next Steps

Choose one:

1. **Integrate new Hero component** → Update HomePage.tsx to import and use it
2. **Enhance current hero** → Add error boundaries and lazy loading to existing code
3. **Keep as-is** → Current implementation already works well

The new Hero component is ready to use if needed, but integration is optional based on your requirements.
