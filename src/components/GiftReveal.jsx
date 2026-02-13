import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const GiftReveal = () => {
  const navigate = useNavigate()
  const [envelopeOpened, setEnvelopeOpened] = useState(false)
  const [showLetter, setShowLetter] = useState(false)
  const [showVideo, setShowVideo] = useState(false)

  const handleOpenEnvelope = () => {
    setEnvelopeOpened(true)
    setTimeout(() => setShowLetter(true), 1000)
  }

  const handleShowVideo = () => {
    setShowVideo(true)
  }

  const loveLetter = `
    MY DEAREST LOVE,

    AS I SIT HERE THINKING ABOUT YOU, MY HEART FILLS WITH SO MUCH JOY AND GRATITUDE. FROM THE MOMENT WE MET, I KNEW THERE WAS SOMETHING SPECIAL ABOUT YOU – THAT SPARK, THAT CONNECTION THAT MADE EVERYTHING ELSE FADE AWAY.

    YOU'VE BROUGHT SO MUCH LIGHT INTO MY LIFE. YOUR SMILE LIGHTS UP MY DARKEST DAYS, YOUR LAUGH IS MY FAVORITE MELODY, AND YOUR LOVE IS MY GREATEST TREASURE. EVERY MOMENT WITH YOU FEELS LIKE A BEAUTIFUL ADVENTURE, AND I CAN'T WAIT TO CREATE MORE MEMORIES TOGETHER.

    YOU ARE MY EVERYTHING – MY BEST FRIEND, MY CONFIDANT, MY PARTNER IN CRIME, AND THE LOVE OF MY LIFE. I PROMISE TO ALWAYS CHERISH YOU, SUPPORT YOU, AND LOVE YOU WITH ALL THAT I AM.

    HAPPY VALENTINE'S DAY, MY LOVE. HERE'S TO MANY MORE BEAUTIFUL MOMENTS TOGETHER.

    FOREVER YOURS,
    YOUR VALENTINE ♥
  `

  return (
    <div className="flex flex-col items-center justify-center px-4 py-8 min-h-screen w-full">
      <motion.div
        className="pixel-border pixel-card p-6 mb-8 mx-4 text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-lg font-bold text-[#1a1a2e] pixel-glow text-center">
          YOUR GIFT REVEAL 🎁
        </h1>
      </motion.div>

      <AnimatePresence>
        {!envelopeOpened ? (
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="text-5xl mb-4 cursor-pointer pixel-flicker"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleOpenEnvelope}
              animate={{
                rotate: [0, -2, 2, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              💌
            </motion.div>
            <motion.p
              className="text-xs text-[#e94560] font-bold pixel-glow"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              TAP TO OPEN YOUR SPECIAL MESSAGE
            </motion.p>
          </motion.div>
        ) : (
          <motion.div
            className="w-full max-w-sm"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <AnimatePresence>
              {showLetter && !showVideo && (
                <motion.div
                  className="pixel-card p-6 mb-8"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                >
                  <div className="text-center mb-6">
                    <span className="text-3xl pixel-flicker">💌</span>
                  </div>

                  <div className="whitespace-pre-line text-[#1a1a2e] leading-relaxed font-bold text-center text-xs max-h-80 overflow-y-auto">
                    {loveLetter}
                  </div>

                  <motion.button
                    onClick={handleShowVideo}
                    className="pixel-button py-3 px-6 text-xs mt-6 block mx-auto"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    WATCH MY VIDEO MESSAGE 🎥
                  </motion.button>
                </motion.div>
              )}

              {showVideo && (
                <motion.div
                  className="pixel-card p-6 mb-8"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                >
                  <div className="text-center mb-6">
                    <span className="text-3xl pixel-flicker">🎥</span>
                    <h3 className="text-sm font-bold text-[#1a1a2e] pixel-glow mt-2">A SPECIAL MESSAGE FOR YOU</h3>
                  </div>

                  <div className="pixel-border bg-[#e94560] p-6 text-center mb-6">
                    <p className="text-[#f39c12] mb-3 text-xs">VIDEO PLACEHOLDER - IN A REAL APP, EMBED YOUR VIDEO HERE</p>
                    <div className="w-full h-40 pixel-border bg-gradient-to-br from-[#e94560] to-[#f39c12] flex items-center justify-center">
                      <span className="text-3xl pixel-flicker">🎬</span>
                    </div>
                  </div>

                  <div className="text-center space-y-4">
                    <div className="pixel-border pixel-card p-4">
                      <h4 className="font-bold text-[#1a1a2e] mb-2 text-xs">🎟️ YOUR DIGITAL VOUCHER</h4>
                      <p className="text-[#e94560] text-xs">A SPECIAL DINNER DATE TONIGHT AT 7 PM! CAN'T WAIT TO SEE YOU! 🕖</p>
                    </div>

                    <div className="pixel-border pixel-card p-4">
                      <h4 className="font-bold text-[#1a1a2e] mb-2 text-xs">⏰ COUNTDOWN TO OUR DATE</h4>
                      <div className="text-xs font-mono text-[#e94560] pixel-glow">
                        {/* In a real app, implement actual countdown */}
                        5 HOURS 23 MINUTES 45 SECONDS
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex flex-col gap-4 justify-center">
              <motion.button
                onClick={() => navigate('/')}
                className="pixel-button py-3 px-6 text-xs"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                REPLAY THE ADVENTURE 🔄
              </motion.button>

              <motion.button
                onClick={() => alert('DOWNLOAD FEATURE WOULD BE IMPLEMENTED HERE! 💾')}
                className="pixel-button py-3 px-6 text-xs"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                DOWNLOAD KEEPSAKE 📥
              </motion.button>

              <motion.button
                onClick={() => alert('SHARE FEATURE WOULD BE IMPLEMENTED HERE! 📤')}
                className="pixel-button py-3 px-6 text-xs"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                SHARE OUR LOVE ♥
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default GiftReveal