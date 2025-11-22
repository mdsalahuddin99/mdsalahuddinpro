 
import { Hero } from "./sections/Hero"
import { Education } from "./sections/Education"
import { TechStack } from "./sections/TechStack"
import { Projects } from "./sections/Projects"
import { Contact } from "./sections/Contact"
import { Footer } from "./sections/Footer"
import { Navbar } from "./components/Navbar"
import { AboutMeSimple } from "./sections/about"
 

function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <Hero />
      <AboutMeSimple />
      <Education />
      <TechStack />
      <Projects />
      <Contact />
      <Footer />
    </div>
  )
}

export default App
