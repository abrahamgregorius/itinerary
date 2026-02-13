import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import HomePage from './components/HomePage'
import MemoryQuest from './components/MemoryQuest'
import LoveChallenge from './components/LoveChallenge'
import GiftReveal from './components/GiftReveal'

function App() {
  const [musicEnabled, setMusicEnabled] = useState(false)

  return (
    <Router>
      <div className="min-h-screen retro-bg crt flex items-center justify-center w-full">
        <div className="w-full">
          <Routes>
            <Route path="/" element={<HomePage musicEnabled={musicEnabled} setMusicEnabled={setMusicEnabled} />} />
            <Route path="/memory-quest" element={<MemoryQuest />} />
            <Route path="/love-challenge" element={<LoveChallenge />} />
            <Route path="/gift-reveal" element={<GiftReveal />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App
