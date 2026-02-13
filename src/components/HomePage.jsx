import { motion } from 'framer-motion'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const HomePage = ({ musicEnabled, setMusicEnabled }) => {
  const [secretCode, setSecretCode] = useState('')
  const [showSecret, setShowSecret] = useState(false)
  const navigate = useNavigate()

  const handleStart = () => {
    navigate('/memory-quest')
  }

  const handleSecretSubmit = (e) => {
    e.preventDefault()
    if (secretCode === '1111' || secretCode === '11/11') {
      navigate('/gift-reveal')
    } else {
      alert('💕 Not quite right, my love! Try our special date 💕')
    }
  }

  const floatingHearts = Array.from({ length: 12 }, (_, i) => (
    <motion.div
      key={i}
      className="absolute text-[#e94560] text-3xl pixel-flicker"
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{
        scale: [0, 1, 0],
        opacity: [0, 0.6, 0],
        rotate: [0, 360]
      }}
      transition={{
        duration: Math.random() * 8 + 6,
        repeat: Infinity,
        delay: Math.random() * 3
      }}
    >
      {['💖', '💕', '💗', '💓', '💘'][Math.floor(Math.random() * 5)]}
    </motion.div>
  ))

  const floatingFlowers = Array.from({ length: 8 }, (_, i) => (
    <motion.div
      key={`flower-${i}`}
      className="absolute text-[#f39c12] text-2xl"
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{
        scale: [0, 1, 0],
        opacity: [0, 0.4, 0],
        y: [0, -30, 0]
      }}
      transition={{
        duration: Math.random() * 10 + 8,
        repeat: Infinity,
        delay: Math.random() * 4
      }}
    >
      {['🌸', '🌹', '🌷', '🌺', '🌼'][Math.floor(Math.random() * 5)]}
    </motion.div>
  ))

  return (
    <div className="flex flex-col items-center justify-center px-4 py-8 min-h-screen relative overflow-hidden w-full">
      {floatingHearts}
      {/* {floatingFlowers} */}

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="text-center z-10 w-full px-4"
      >
        <motion.div
          className="pixel-card mb-8"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
        >
          {/* <motion.div
            className="text-6xl mb-6"
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            💕
          </motion.div> */}

          <motion.h1
            className="text-lg sm:text-xl font-bold text-[#1a1a2e] pixel-glow mb-6"
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
          >
            HI JESSICA, THIS IS FOR YOU ♥
          </motion.h1>

          <motion.p
            className="text-sm text-[#e94560] mb-8 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            I've created a special Valentine's adventure just for you...
            <br />
            A journey through our memories and surprises 💖
          </motion.p>

          <motion.button
            onClick={handleStart}
            className="pixel-button mb-6"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            START THE ADVENTURE
          </motion.button>

          {/* <motion.button
            onClick={() => setMusicEnabled(!musicEnabled)}
            className="pixel-button mb-4 text-xs"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {musicEnabled ? '♪ MUSIC ON ♪' : '🔇 MUSIC OFF'}
          </motion.button> */}
        </motion.div>

        {/* <motion.button
          onClick={() => setShowSecret(!showSecret)}
          className="pixel-button text-xs"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          SECRET ACCESS
        </motion.button> */}

        {showSecret && (
          <motion.form
            onSubmit={handleSecretSubmit}
            className="mt-6 pixel-card max-w-sm"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className="text-center mb-4">
              <span className="text-2xl pixel-flicker">🔒</span>
              <p className="text-xs text-[#e94560] mt-2">
                Enter our special date to unlock a surprise
              </p>
            </div>

            <input
              type="text"
              value={secretCode}
              onChange={(e) => setSecretCode(e.target.value)}
              placeholder="MM/DD or MMDD"
              className="w-full bg-white text-[#1a1a2e] border-4 border-[#e94560] p-3 mb-4 text-center font-mono text-xs focus:outline-none focus:border-[#f39c12] rounded"
            />
            <button
              type="submit"
              className="pixel-button"
            >
              UNLOCK MY HEART 💖
            </button>
          </motion.form>
        )}
      </motion.div>
    </div>
  )
}

export default HomePage