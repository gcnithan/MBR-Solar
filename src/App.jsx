import { useState, useCallback } from 'react'
import CustomCursor from './components/CustomCursor'
import ScrollProgress from './components/ScrollProgress'
import SectionSpotlight from './components/SectionSpotlight'
import SectionDivider from './components/SectionDivider'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import About from './components/About'
import FounderJourney from './components/FounderJourney'
import Achievements from './components/Achievements'
import WhyChooseUs from './components/WhyChooseUs'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import Footer from './components/Footer'
import { useSectionTransitions } from './hooks/useSectionTransitions'
import { useGlobalSection3D } from './hooks/useGlobalSection3D'

function App() {
  const [activeSection, setActiveSection] = useState(0)

  const handleSectionChange = useCallback((index) => {
    setActiveSection(index)
  }, [])

  useSectionTransitions(handleSectionChange)
  useGlobalSection3D()

  return (
    <div
      className="relative min-h-screen w-full min-w-0 overflow-x-hidden app-3d-root"
      style={{ background: 'var(--bg-page)' }}
    >
      <CustomCursor />
      <ScrollProgress />
      <SectionSpotlight activeIndex={activeSection} />
      <Navbar />
      <main>
        <Hero />
        <SectionDivider />
        <Services />
        <SectionDivider />
        <About />
        <SectionDivider />
        <FounderJourney />
        <SectionDivider />
        <Achievements />
        <SectionDivider />
        <WhyChooseUs />
        <SectionDivider />
        <Testimonials />
        <SectionDivider />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
