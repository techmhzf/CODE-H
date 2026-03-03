import './index.css'
import Navbar from './components/Navbar'
import GrainOverlay from './components/GrainOverlay'
import HeroSection from './components/HeroSection'
import WhatWeBuildSection from './components/WhatWeBuildSection'
import OurApproachSection from './components/OurApproachSection'
import FeaturedProjectsSection from './components/FeaturedProjectsSection'
import TechStackSection from './components/TechStackSection'
import AchievementsSection from './components/AchievementsSection'
import StartupSection from './components/StartupSection'
import TeamSection from './components/TeamSection'
import Footer from './components/Footer'
import ScrollProgress from './components/ScrollProgress'
import SectionDivider from './components/SectionDivider'
import ScrollToTop from './components/ScrollToTop'

function App() {
  return (
    <main>
      <Navbar />
      <GrainOverlay />
      <ScrollProgress />
      <ScrollToTop />
      <HeroSection />
      <SectionDivider color="#3b82f6" opacity={0.25} />
      <AchievementsSection />
      <SectionDivider color="#f59e0b" opacity={0.2} />
      <StartupSection />
      <SectionDivider color="#8b5cf6" opacity={0.2} />
      <WhatWeBuildSection />
      <SectionDivider color="#3b82f6" opacity={0.2} />
      <OurApproachSection />
      <SectionDivider color="#2563eb" opacity={0.25} />
      <FeaturedProjectsSection />
      <SectionDivider color="#3b82f6" opacity={0.2} />
      <TechStackSection />
      <SectionDivider color="#2563eb" opacity={0.15} />
      <TeamSection />
      <Footer />
    </main>
  )
}

export default App
