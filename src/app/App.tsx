import { useEffect } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { FloatingCursor } from '../components/animations/FloatingCursor'
import { Footer } from '../components/layout/Footer'
import { Header } from '../components/layout/Header'
import { HomePage } from './pages/HomePage'
import { OurStoryPage } from './pages/OurStoryPage'
import { OwnPaceAcademyPage } from './pages/OwnPaceAcademyPage'

/** Returns the router to the top of the document whenever the route changes. */
function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

/**
 * The Studytainment app shell: fixed header + footer shared across pages,
 * routed content between them and ambient overlays.
 */
export default function App() {
  return (
    <BrowserRouter>
      <FloatingCursor />
      <Header />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/own-pace-academy" element={<OwnPaceAcademyPage />} />
        <Route path="/our-story" element={<OurStoryPage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}
