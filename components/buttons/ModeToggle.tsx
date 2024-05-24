"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export function ModeToggle() {
    const { theme, setTheme } = useTheme()

    const toggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark")
    }

    return (
        <button
            className="flex items-center p-2 rounded-full hover:bg-secondary focus:outline-none"
            onClick={toggleTheme}
            aria-label="Toggle theme"
        >
            {theme === "dark" ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />} 
        </button>
    )
}
