import React, { Component, ErrorInfo, ReactNode, Suspense, lazy } from "react"
import { ArrowRight, Sparkle } from "@p
import { ArrowRight, Sparkle } from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"
  import("@/components/ui/shader-animation").then(module => ({ default:


const LazyShaderAnimation = lazy(() => 
    super(props)
 

  }
  componentDidCatch(error:
  { hasError: boolean }
  r
      return null
    return this.
}
exp

    hidden: { opacity: 0 },
    return { hasError: true }
   

  }
  const itemVariants: Variants = {
   

        dura
    if (this.state.hasError) {
  }
  con
  }
  r
 

        }}
      />

          <Suspense fallback={null}>
          </Suspense>
      )}
      <motion.div
      transition: {
        variants={container
        <motion.div variants=
       
    }
  }

        >
          <span className="bg-gradient-to-r from-prim
          </sp
          <span c
          <

          className="m
        >
       
     
   

  const handleExplore = () => {
              target="_blank" 
  }

  return (
          <Button
          
            className="w-full rounded-full font-medium sm:w-au
            Expl
        </motion.div>
    </sect
}





















        </motion.div>

        <motion.h1


        >













        >

        </motion.p>






          >





            >




          <Button





            Explore Solutions

        </motion.div>

    </section>

}
