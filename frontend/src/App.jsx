import './index.css'
import HeroSection from './components/HeroSection'
import WhatWeBuildSection from './components/WhatWeBuildSection'
import FeaturedProjectsSection from './components/FeaturedProjectsSection'
import TechStackSection from './components/TechStackSection'
import TeamSection from './components/TeamSection'
import Footer from './components/Footer'
import ScrollProgress from './components/ScrollProgress'

function App() {
  return (
    <main>
      <ScrollProgress />
      <HeroSection />
      <WhatWeBuildSection />
      <FeaturedProjectsSection />
      <TechStackSection />
      <TeamSection />

      <Footer />
    </main>
  )
}

export default App
