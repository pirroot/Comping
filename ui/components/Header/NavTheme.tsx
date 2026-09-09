'use client'

import { Moon, Sun } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function NavTheme() {
  // const [isDark, setIsDark] = useState<boolean>(false)

  // useEffect(() => {
  //   const stored = localStorage.getItem('theme')
  //   const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  //   setIsDark(stored === 'dark' || (!stored && prefersDark))
  // }, [])

  // const toggleTheme = () => {
  //   const newIsDark = !isDark
  //   setIsDark(newIsDark)

  //   const newTheme = newIsDark ? 'dark' : 'light'
  //   localStorage.setItem('theme', newTheme)
  //   document.documentElement.classList.toggle('dark', newIsDark)
  // }

  return (
    <button
      onClick={toggleTheme}
      className="rounded-2xl bg-neutral_normal p-3 transition hover:bg-neutral_light"
    >
      {isDark ? <Moon /> : <Sun />}
    </button>
  )
}
