import './index.css'
import HeroSection from './components/HeroSection'
import WhatWeBuildSection from './components/WhatWeBuildSection'
import FeaturedProjectsSection from './components/FeaturedProjectsSection'
import TechStackSection from './components/TechStackSection'
import TeamSection from './components/TeamSection'
import Footer from './components/Footer'

function App() {
  return (
    <main>
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
