"use client"

import React, { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { ButtonProps } from "@/components/ui/button"

interface AnimatedButtonProps extends ButtonProps {
  variant?: "default" | "ripple" | "magnetic" | "glow" | "particle" | "morph" | "pulse" | "gradient" | "journey"
  children: React.ReactNode
}

export function AnimatedButton({ variant = "default", className, children, onClick, asChild, ...props }: AnimatedButtonProps) {
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([])
  const [isHovered, setIsHovered] = useState(false)
  const [isPressed, setIsPressed] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const rippleId = useRef(0)

  const createRipple = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return

    const button = buttonRef.current
    const rect = button.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top

    const newRipple = {
      id: rippleId.current++,
      x,
      y,
    }

    setRipples((prev) => [...prev, newRipple])

    // Remove ripple after animation
    setTimeout(() => {
      setRipples((prev) => prev.filter((ripple) => ripple.id !== newRipple.id))
    }, 600)

    // Call original onClick
    onClick?.(event)
  }

  const handleMouseMove = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (variant === "magnetic" && buttonRef.current) {
      const button = buttonRef.current
      const rect = button.getBoundingClientRect()
      const x = event.clientX - rect.left - rect.width / 2
      const y = event.clientY - rect.top - rect.height / 2

      button.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px) scale(1.05)`
    }
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    if (variant === "magnetic" && buttonRef.current) {
      buttonRef.current.style.transform = "translate(0px, 0px) scale(1)"
    }
  }

  const getVariantClasses = () => {
    switch (variant) {
      case "ripple":
        return "relative overflow-hidden transition-all duration-300 hover:shadow-lg active:scale-95"
      case "magnetic":
        return "transition-all duration-300 ease-out hover:shadow-xl"
      case "glow":
        return "relative transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/25 animate-glow"
      case "particle":
        return "relative overflow-hidden transition-all duration-300 hover:scale-105 animate-particle"
      case "morph":
        return "transition-all duration-500 ease-out hover:rounded-full hover:px-8 hover:shadow-xl"
      case "pulse":
        return "animate-pulse-slow hover:animate-none transition-all duration-300 hover:scale-105 hover:shadow-lg"
      case "gradient":
        return "bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-size-200 bg-pos-0 hover:bg-pos-100 transition-all duration-500 hover:scale-105 hover:shadow-xl animate-gradient"
      case "journey":
        return "relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white transition-all duration-500 hover:scale-110 hover:shadow-2xl hover:shadow-purple-500/25 animate-pulse-slow hover:animate-none group"
      default:
        return "transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95"
    }
  }

  // When asChild is true, we need to clone the child and add our props to it
  if (asChild) {
    const child = React.Children.only(children) as React.ReactElement
    return React.cloneElement(child, {
      ref: buttonRef,
      className: cn(getVariantClasses(), className, child.props.className),
      onClick: (event: React.MouseEvent<HTMLButtonElement>) => {
        if (variant === "ripple") {
          createRipple(event)
        } else {
          onClick?.(event)
        }
        child.props.onClick?.(event)
      },
      onMouseEnter: (event: React.MouseEvent<HTMLButtonElement>) => {
        setIsHovered(true)
        child.props.onMouseEnter?.(event)
      },
      onMouseLeave: (event: React.MouseEvent<HTMLButtonElement>) => {
        handleMouseLeave()
        child.props.onMouseLeave?.(event)
      },
      onMouseMove: (event: React.MouseEvent<HTMLButtonElement>) => {
        handleMouseMove(event)
        child.props.onMouseMove?.(event)
      },
      onMouseDown: (event: React.MouseEvent<HTMLButtonElement>) => {
        setIsPressed(true)
        child.props.onMouseDown?.(event)
      },
      onMouseUp: (event: React.MouseEvent<HTMLButtonElement>) => {
        setIsPressed(false)
        child.props.onMouseUp?.(event)
      },
      children: (
        <>
          {/* Ripple Effect */}
          {variant === "ripple" && (
            <div className="absolute inset-0 overflow-hidden rounded-inherit">
              {ripples.map((ripple) => (
                <span
                  key={ripple.id}
                  className="absolute bg-white/30 rounded-full animate-ripple pointer-events-none"
                  style={{
                    left: ripple.x - 10,
                    top: ripple.y - 10,
                    width: 20,
                    height: 20,
                  }}
                />
              ))}
            </div>
          )}

          {/* Glow Effect */}
          {variant === "glow" && (
            <div className="absolute inset-0 rounded-inherit bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 opacity-0 hover:opacity-20 transition-opacity duration-300 blur-sm" />
          )}

          {/* Particle Effect */}
          {variant === "particle" && isHovered && (
            <div className="absolute inset-0 overflow-hidden rounded-inherit">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-white rounded-full animate-particle-float"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${i * 0.1}s`,
                  }}
                />
              ))}
            </div>
          )}

          {/* Original child content */}
          <span className="relative z-10 flex items-center justify-center gap-2">{child.props.children}</span>

          {/* Shine Effect */}
          {(variant === "glow" || variant === "gradient") && (
            <div className="absolute inset-0 rounded-inherit bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-700" />
          )}
        </>
      ),
    })
  }

  return (
    <Button
      ref={buttonRef}
      className={cn(getVariantClasses(), className)}
      onClick={variant === "ripple" ? createRipple : onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      asChild={false}
      {...props}
    >
      {/* Ripple Effect */}
      {variant === "ripple" && (
        <div className="absolute inset-0 overflow-hidden rounded-inherit">
          {ripples.map((ripple) => (
            <span
              key={ripple.id}
              className="absolute bg-white/30 rounded-full animate-ripple pointer-events-none"
              style={{
                left: ripple.x - 10,
                top: ripple.y - 10,
                width: 20,
                height: 20,
              }}
            />
          ))}
        </div>
      )}

      {/* Glow Effect */}
      {variant === "glow" && (
        <div className="absolute inset-0 rounded-inherit bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 opacity-0 hover:opacity-20 transition-opacity duration-300 blur-sm" />
      )}

      {/* Particle Effect */}
      {variant === "particle" && isHovered && (
        <div className="absolute inset-0 overflow-hidden rounded-inherit">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-particle-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.1}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* Button Content */}
      <span className="relative z-10 flex items-center justify-center gap-2">{children}</span>

      {/* Shine Effect */}
      {(variant === "glow" || variant === "gradient") && (
        <div className="absolute inset-0 rounded-inherit bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-700" />
      )}
    </Button>
  )
}
