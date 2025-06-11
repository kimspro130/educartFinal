"use client"

import * as React from "react"
import { Moon, Sun, Monitor } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="h-9 w-9">
        <Sun className="h-4 w-4" />
      </Button>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-all duration-300 hover:scale-110 relative overflow-hidden group"
        >
          <div className="relative">
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all duration-500 dark:-rotate-90 dark:scale-0 text-amber-600 dark:text-amber-400" />
            <Moon className="absolute top-0 left-0 h-4 w-4 rotate-90 scale-0 transition-all duration-500 dark:rotate-0 dark:scale-100 text-amber-600 dark:text-amber-400" />
          </div>
          <span className="sr-only">Toggle theme</span>

          {/* Animated background */}
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-amber-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md"></div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem
          onClick={() => setTheme("light")}
          className="cursor-pointer"
        >
          <Sun className="mr-2 h-4 w-4" />
          <span>Light</span>
          {theme === "light" && <div className="ml-auto w-2 h-2 bg-amber-500 rounded-full"></div>}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("dark")}
          className="cursor-pointer"
        >
          <Moon className="mr-2 h-4 w-4" />
          <span>Dark</span>
          {theme === "dark" && <div className="ml-auto w-2 h-2 bg-amber-500 rounded-full"></div>}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("system")}
          className="cursor-pointer"
        >
          <Monitor className="mr-2 h-4 w-4" />
          <span>System</span>
          {theme === "system" && <div className="ml-auto w-2 h-2 bg-amber-500 rounded-full"></div>}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

// Simple toggle version for mobile or compact spaces
export function SimpleThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="h-9 w-9">
        <Sun className="h-4 w-4" />
      </Button>
    )
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="h-9 w-9 hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-all duration-300 hover:scale-110 relative overflow-hidden group"
    >
      <div className="relative">
        <Sun className="h-4 w-4 rotate-0 scale-100 transition-all duration-500 dark:-rotate-90 dark:scale-0 text-amber-600 dark:text-amber-400" />
        <Moon className="absolute top-0 left-0 h-4 w-4 rotate-90 scale-0 transition-all duration-500 dark:rotate-0 dark:scale-100 text-amber-600 dark:text-amber-400" />
      </div>
      <span className="sr-only">Toggle theme</span>

      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-amber-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md"></div>
    </Button>
  )
}
