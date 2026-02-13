import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const MemoryQuest = () => {
  const navigate = useNavigate()
  const [currentCard, setCurrentCard] = useState(0)
  const [revealedCards, setRevealedCards] = useState(new Set())

  const memories = [
    {
      id: 1,
      photo: '☕',
      message: "Our first date at that cozy café... remember how the rain made everything so romantic? Every moment with you feels like coming home. 💕",
      emoji: '💖'
    },
    {
      id: 2,
      photo: '🏖️',
      message: "That magical beach sunset where we watched the waves dance together. Your smile lit up brighter than the horizon. 🌅",
      emoji: '💕'
    },
    {
      id: 3,
      photo: '🎂',
      message: "Your birthday surprise! Seeing your eyes light up made my heart skip a beat. You're my greatest joy. 🎉",
      emoji: '💗'
    },
    {
      id: 4,
      photo: '💃',
      message: "Dancing under the stars at the festival... you move with such grace, my love. That night was pure magic. ✨",
      emoji: '💓'
    },
    {
      id: 5,
      photo: '🏠',
      message: "Our first home together. Every corner holds a memory of us, every wall echoes with our laughter and love. 🏡",
      emoji: '💘'
    }
  ]

  const handleSwipe = (direction) => {
    if (direction === 'right' && currentCard < memories.length - 1) {
      setRevealedCards(prev => new Set([...prev, currentCard]))
      setCurrentCard(prev => prev + 1)
    } else if (direction === 'left' && currentCard > 0) {
      setCurrentCard(prev => prev - 1)
    }
  }

  const handleCardClick = () => {
    setRevealedCards(prev => new Set([...prev, currentCard]))
  }

  const allRevealed = revealedCards.size === memories.length

  return (
    <div className="flex flex-col items-center justify-center px-4 py-8 min-h-screen w-full">
      <motion.div
        className="pixel-border pixel-card mb-8 text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <motion.div
          className="text-4xl mb-4"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, -5, 5, 0]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          💕
        </motion.div>

        <h1 className="text-lg font-bold text-[#1a1a2e] pixel-glow mb-4">
          MEMORY QUEST ♥
        </h1>

        <div className="mb-6">
          <p className="text-xs text-[#e94560] mb-3">SWIPE RIGHT TO UNLOCK OUR MEMORIES</p>
          <p className="text-xs text-[#1a1a2e]">CARD {currentCard + 1} OF {memories.length}</p>
        </div>
      </motion.div>

      <div className="relative w-full max-w-sm h-96 mb-8 flex items-center justify-center">
        <AnimatePresence>
          {memories.map((memory, index) => (
            index === currentCard && (
              <motion.div
                key={memory.id}
                className="absolute inset-0 elegant-card flex flex-col items-center justify-center cursor-pointer"
                initial={{ scale: 0.8, opacity: 0, rotateY: -90 }}
                animate={{
                  scale: 1,
                  opacity: 1,
                  rotateY: 0,
                  zIndex: 10
                }}
                exit={{ scale: 0.8, opacity: 0, rotateY: 90 }}
                transition={{ type: "spring", stiffness: 200, damping: 25 }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={(event, info) => {
                  if (info.offset.x > 100) {
                    handleSwipe('right')
                  } else if (info.offset.x < -100) {
                    handleSwipe('left')
                  }
                }}
                onClick={handleCardClick}
                whileHover={{ scale: 1.02 }}
              >
                <motion.div
                  className="text-5xl mb-6 pixel-flicker"
                  animate={revealedCards.has(index) ? {
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0]
                  } : {}}
                  transition={{ duration: 0.6 }}
                >
                  {memory.photo}
                </motion.div>

                <AnimatePresence>
                  {revealedCards.has(index) && (
                    <motion.div
                      className="text-center px-4"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -30 }}
                      transition={{ duration: 0.8 }}
                    >
                      <p className="text-[#1a1a2e] font-bold text-xs leading-relaxed mb-3">
                        {memory.message}
                      </p>
                      <div className="text-2xl pixel-glow">
                        {memory.emoji}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {!revealedCards.has(index) && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-[#e94560] to-[#f39c12] rounded-2xl flex flex-col items-center justify-center pixel-border"
                    animate={{ opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                  >
                    <span className="text-3xl mb-2">🔒</span>
                    <span className="text-xs pixel-glow text-white">
                      TAP TO UNLOCK
                    </span>
                  </motion.div>
                )}
              </motion.div>
            )
          ))}
        </AnimatePresence>
      </div>

      {allRevealed && (
        <motion.button
          onClick={() => navigate('/love-challenge')}
          className="pixel-button"
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 150 }}
        >
          UNLOCK THE NEXT SURPRISE ♥
        </motion.button>
      )}
    </div>
  )
}

export default MemoryQuest