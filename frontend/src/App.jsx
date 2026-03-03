import './index.css'
import HeroSection from './components/HeroSection'
import RecognitionSection from './components/RecognitionSection'
import WhatWeBuildSection from './components/WhatWeBuildSection'
import FeaturedProjectsSection from './components/FeaturedProjectsSection'
import TechStackSection from './components/TechStackSection'
import TeamSection from './components/TeamSection'
import Footer from './components/Footer'

function App() {
  return (
    <main>
      <HeroSection />
      <RecognitionSection />
      <WhatWeBuildSection />
      <FeaturedProjectsSection />
      <TechStackSection />
      <TeamSection />
      <Footer />
    </main>
  )
}

export default App
