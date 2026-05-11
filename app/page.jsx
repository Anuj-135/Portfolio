'use client'

import { useState, useEffect } from 'react'
import Navbar from './components/sections/Navbar'
import Hero from './components/sections/Hero'
import About from './components/sections/About'

export default function Home() {
  const [darkMode, setDarkMode] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    if (!mounted) return
    document.body.style.backgroundColor = darkMode ? '#0d0d1a' : '#f0f0f8'
    document.body.style.color = darkMode ? '#f0ede8' : '#0d0d1a'
    document.body.style.transition = 'background-color 0.4s ease, color 0.4s ease'
  }, [darkMode, mounted])

  if (!mounted) return null

  return (
    <main>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <Hero darkMode={darkMode} />
      <About darkMode={darkMode} />

      <section id="skills" className="min-h-screen" />
      <section id="projects" className="min-h-screen" />
      <section id="experience" className="min-h-screen" />
      <section id="contact" className="min-h-screen" />
    </main>
  )
}