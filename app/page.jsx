'use client'

import { useState, useEffect } from 'react'
import Navbar from './components/sections/Navbar'
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Skills from './components/sections/Skills'
import Projects from './components/sections/Projects'
import Experience from './components/sections/Experience'
import Contact from "./components/sections/Contact"
import Footer from "./components/sections/Footer"

export default function Home() {
  const [darkMode, setDarkMode] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    if (!mounted) return
    document.body.style.backgroundColor = darkMode ? '#0d0d1a' : '#e8e8f0'
    document.body.style.color = darkMode ? '#f0ede8' : '#0d0d1a'
    document.body.style.transition = 'background-color 0.4s ease, color 0.4s ease'
  }, [darkMode, mounted])

  if (!mounted) return null

  return (
    <main>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <Hero darkMode={darkMode} />
      <About darkMode={darkMode} />
      <Skills darkMode={darkMode} />
      <Projects darkMode={darkMode} />
      <Experience darkMode={darkMode} />
      <Contact darkMode={darkMode} />
      <Footer darkMode={darkMode} />
    </main>
  )
}