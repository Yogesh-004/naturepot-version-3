import React from 'react'
import Header from '../components/Layout/Header'
import Footer from '../components/Layout/Footer'
import HeroSection from '../components/Home/HeroSection'
import SamplePots from '../components/Home/SamplePots'
import CTAButton from '../components/Home/CTAButton'

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-green-gradient">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <SamplePots />
        <CTAButton />
      </main>
      <Footer />
    </div>
  )
}

export default HomePage