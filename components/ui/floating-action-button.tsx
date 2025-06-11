"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Plus, X } from "lucide-react"

interface FloatingActionButtonProps {
  children?: React.ReactNode
  className?: string
  actions?: Array<{
    icon: React.ReactNode
    label: string
    onClick: () => void
    color?: string
  }>
}

export function FloatingActionButton({ children, className, actions = [] }: FloatingActionButtonProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Action Items */}
      {actions.length > 0 && (
        <div
          className={cn(
            "flex flex-col-reverse gap-3 mb-3 transition-all duration-300",
            isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none",
          )}
        >
          {actions.map((action, index) => (
            <div key={index} className="flex items-center gap-3 group" style={{ transitionDelay: `${index * 50}ms` }}>
              <span className="bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 px-3 py-1 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                {action.label}
              </span>
              <Button
                size="sm"
                className={cn(
                  "w-12 h-12 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110",
                  action.color || "bg-blue-600 hover:bg-blue-700",
                )}
                onClick={action.onClick}
              >
                {action.icon}
              </Button>
            </div>
          ))}
        </div>
      )}

      {/* Main FAB */}
      <Button
        className={cn(
          "w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 active:scale-95 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700",
          isOpen && "rotate-45",
          className,
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        {children || (
          <>
            <Plus className={cn("h-6 w-6 transition-all duration-300", isOpen && "opacity-0 rotate-90")} />
            <X className={cn("h-6 w-6 absolute transition-all duration-300", !isOpen && "opacity-0 -rotate-90")} />
          </>
        )}
      </Button>
    </div>
  )
}
