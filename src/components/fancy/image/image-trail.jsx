// author: Khoa Phan <https://www.pldkhoa.dev>
import React, { useEffect, useMemo } from "react";
import { useAnimate } from "motion/react"

import { cn } from "@/lib/utils"

/**
 * Helper functions
 */
const MathUtils = {
  // linear interpolation
  lerp: (a, b, n) => (1 - n) * a + n * b,
  // distance between two points
  distance: (x1, y1, x2, y2) =>
    Math.hypot(x2 - x1, y2 - y1),
}

const ImageTrail = ({
  className,
  as = "div",
  children,
  threshold = 100,
  intensity = 0.3,
  keyframes,
  keyframesOptions,
  repeatChildren = 3,

  trailElementAnimationKeyframes = {
    x: { duration: 1, type: "tween", ease: "easeOut" },
    y: { duration: 1, type: "tween", ease: "easeOut" },
  },

  baseZIndex = 0,
  zIndexDirection = "new-on-top",
  ...props
}) => {
  const allImages = React.useRef(undefined)
  const currentId = React.useRef(0)
  const lastMousePos = React.useRef({ x: 0, y: 0 })
  const cachedMousePos = React.useRef({ x: 0, y: 0 })
  const [containerRef, animate] = useAnimate()
  const zIndices = React.useRef([])

  const clampedIntensity = useMemo(() => Math.max(0.0001, Math.min(1, intensity)), [intensity])

  useEffect(() => {
    allImages.current = containerRef?.current?.querySelectorAll(".image-trail-item")

    zIndices.current = Array.from({ length: allImages.current.length }, (_, index) => index)
  }, [containerRef, allImages])

  const handleMouseMove = (e) => {
    const containerRect = containerRef?.current?.getBoundingClientRect()
    const mousePos = {
      x: e.clientX - (containerRect?.left || 0),
      y: e.clientY - (containerRect?.top || 0),
    }

    cachedMousePos.current.x = MathUtils.lerp(cachedMousePos.current.x || mousePos.x, mousePos.x, clampedIntensity)

    cachedMousePos.current.y = MathUtils.lerp(cachedMousePos.current.y || mousePos.y, mousePos.y, clampedIntensity)

    const distance = MathUtils.distance(mousePos.x, mousePos.y, lastMousePos.current.x, lastMousePos.current.y)

    if (distance > threshold && allImages?.current) {
      const N = allImages.current.length
      const current = currentId.current

      if (zIndexDirection === "new-on-top") {
        // Shift others down, put current on top
        for (let i = 0; i < N; i++) {
          if (i !== current) {
            zIndices.current[i] -= 1
          }
        }
        zIndices.current[current] = N - 1
      } else {
        // Shift others up, put current at bottom
        for (let i = 0; i < N; i++) {
          if (i !== current) {
            zIndices.current[i] += 1
          }
        }
        zIndices.current[current] = 0
      }

      allImages.current[current].style.display = "block"
      allImages.current.forEach((img, index) => {
        img.style.zIndex = String(zIndices.current[index] + baseZIndex)
      })

      animate(allImages.current[currentId.current], {
        x: [
          cachedMousePos.current.x -
            allImages.current[currentId.current].offsetWidth / 2,
          mousePos.x - allImages.current[currentId.current].offsetWidth / 2,
        ],
        y: [
          cachedMousePos.current.y -
            allImages.current[currentId.current].offsetHeight / 2,
          mousePos.y -
            allImages.current?.[currentId.current].offsetHeight / 2,
        ],
        ...keyframes,
      }, {
        ...trailElementAnimationKeyframes.x,
        ...trailElementAnimationKeyframes.y,
        ...keyframesOptions,
      })
      currentId.current = (current + 1) % N
      lastMousePos.current = { x: mousePos.x, y: mousePos.y }
    }
  }

  const ElementTag = as ?? "div"

  return (
    <ElementTag
      className={cn("h-full w-full relative", className)}
      onMouseMove={handleMouseMove}
      ref={containerRef}
      {...props}>
      {Array.from({ length: repeatChildren }).map(() => (
        <>{children}</>
      ))}
    </ElementTag>
  );
}

export const ImageTrailItem = ({
  className,
  children,
  as = "div",
  ...props
}) => {
  const ElementTag = as ?? "div"
  return (
    <ElementTag
      {...props}
      className={cn(
        "absolute top-0 left-0 will-change-transform hidden",
        className,
        "image-trail-item"
      )}>
      {children}
    </ElementTag>
  );
}

export default ImageTrail
