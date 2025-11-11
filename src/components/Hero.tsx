import React, { Component, ErrorInfo, ReactNode, Suspense, lazy } from "react"
import { Link } from "react-router-dom"
import { ArrowRight, Sparkle } from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { motion, useReducedMotion } from "framer-motion"

const LazyShaderAnimation = lazy(() => 
    .then(module => ({
    }))
      import("react"
      }))
)
c

  constructor(props: { children: ReactNode;
  { children: ReactNode; fallback: ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode; fallback: ReactNode }) {
    super(props)
    this.state = { hasError: false }


  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    if (import.meta.env.DEV) {
      console.warn("WebGL component error:", error, errorInfo)
    }
  }


  <div
    style={{
     
      animation: "gradient-shi
   
)


    hi
      opacity: 1,
        stag
      },
  }
  const itemVariants = {
    visible: {
      
    },

 

  return (
      className="relative flex min-h-[65v

      <WebGLErrorBoundary fal
          <Suspense fallbac
          </Su
        {reduceMo

        <motion.div
          animate="visible"
        
      
   

            >
              <span>Ethical AI Strategy — Built for G
          </mo
          <motion
           
          >
      
   

            </span>
              into Impact
          </motion.h1>
   

          
          </
          <motion.div
            variants={itemVariants}
            <Button
     
              aria-label="Book an Ecosystem Intro Call"
            >
                href="https://scheduler.zoom.us/altr
                rel="noopener noref
                Book 
          

              onClick={hand

              aria-label="Explore our solutions"
            >
            </Button>
        </motion.div>

        @keyframes gradient-shi
         
      `}</style>
  )


















































































