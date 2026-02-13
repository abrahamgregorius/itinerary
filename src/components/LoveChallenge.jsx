import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const LoveChallenge = () => {
  const navigate = useNavigate()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [showFeedback, setShowFeedback] = useState(false)
  const [feedbackMessage, setFeedbackMessage] = useState('')
  const [isCorrect, setIsCorrect] = useState(false)

  const questions = [
    {
      question: "WHERE WAS OUR FIRST DATE?",
      options: ["THAT COZY CAFE DOWNTOWN", "THE MOVIE THEATER", "A PICNIC IN THE PARK", "BOWLING ALLEY"],
      correct: 0,
      correctMessage: "YES! THAT RAINY EVENING AT THE CAFE WAS PERFECT! ☕♥",
      wrongMessage: "CLOSE, BUT IT WAS THAT COZY CAFE! TRY AGAIN! 😘"
    },
    {
      question: "WHAT'S MY FAVORITE COLOR ON YOU?",
      options: ["RED", "BLUE", "PINK", "GREEN"],
      correct: 2,
      correctMessage: "PINK MAKES YOU LOOK ABSOLUTELY STUNNING! 💖",
      wrongMessage: "ACTUALLY, I LOVE YOU IN PINK! BUT YOU LOOK GREAT IN EVERYTHING! 😍"
    },
    {
      question: "WHAT'S OUR SONG?",
      options: ["PERFECT BY ED SHEERAN", "ALL OF ME BY JOHN LEGEND", "THINKING OUT LOUD", "AT LAST BY ETTA JAMES"],
      correct: 1,
      correctMessage: "YES! 'ALL OF ME' DESCRIBES HOW I FEEL ABOUT YOU! 🎵♥",
      wrongMessage: "OUR SONG IS 'ALL OF ME' - IT FITS US PERFECTLY! 🎶"
    },
    {
      question: "WHAT'S MY FAVORITE THING ABOUT YOU?",
      options: ["YOUR SMILE", "YOUR LAUGH", "YOUR KINDNESS", "ALL OF THE ABOVE"],
      correct: 3,
      correctMessage: "EVERYTHING! YOUR SMILE, LAUGH, AND INCREDIBLE KINDNESS! 💯",
      wrongMessage: "ACTUALLY, ALL OF THE ABOVE! YOU'RE PERFECT! ✨"
    }
  ]

  const handleAnswer = (selectedIndex) => {
    const correct = selectedIndex === questions[currentQuestion].correct
    setIsCorrect(correct)
    setFeedbackMessage(correct ? questions[currentQuestion].correctMessage : questions[currentQuestion].wrongMessage)
    setShowFeedback(true)

    if (correct) {
      setScore(prev => prev + 1)
    }

    setTimeout(() => {
      setShowFeedback(false)
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(prev => prev + 1)
      } else {
        // Quiz completed
        setTimeout(() => navigate('/gift-reveal'), 2000)
      }
    }, 2000)
  }

  const progress = ((currentQuestion + (showFeedback ? 1 : 0)) / questions.length) * 100

  return (
    <div className="flex flex-col items-center justify-center px-4 py-8 min-h-screen w-full">
      <motion.div
        className="pixel-border pixel-card p-6 mb-8 mx-4 text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-lg font-bold text-[#1a1a2e] pixel-glow mb-4 text-center">
          LOVE CHALLENGE ♥
        </h1>

        <div className="w-full max-w-xs mb-6 mx-auto">
          <div className="pixel-border bg-[#e94560] h-5 mb-3">
            <motion.div
              className="bg-[#f39c12] h-5"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <p className="text-center text-xs text-[#e94560]">
            QUESTION {currentQuestion + 1} OF {questions.length}
          </p>
        </div>
      </motion.div>

      <AnimatePresence mode="wait">
        {!showFeedback ? (
          <motion.div
            key="question"
            className="pixel-card p-6 w-full max-w-sm mb-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
          >
            <h2 className="text-sm font-bold text-center mb-6 text-[#1a1a2e] pixel-glow">
              {questions[currentQuestion].question}
            </h2>

            <div className="space-y-3">
              {questions[currentQuestion].options.map((option, index) => (
                <motion.button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  className="w-full pixel-button py-3 px-4 text-xs"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {option}
                </motion.button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="feedback"
            className="pixel-card p-6 w-full max-w-sm text-center mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <motion.div
              className="text-3xl mb-4 pixel-flicker"
              animate={isCorrect ? {
                scale: [1, 1.3, 1],
                rotate: [0, 10, -10, 0]
              } : {
                x: [-10, 10, -10, 10, 0]
              }}
              transition={{ duration: 0.5 }}
            >
              {isCorrect ? '♥' : '💔'}
            </motion.div>

            <motion.p
              className="text-sm font-bold text-[#1a1a2e] leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {feedbackMessage}
            </motion.p>

            {isCorrect && (
              <motion.div
                className="mt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <span className="text-sm pixel-glow text-[#e94560]">SCORE: {score}/{questions.length}</span>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {currentQuestion === questions.length - 1 && showFeedback && (
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <p className="text-sm font-bold text-[#e94560] pixel-glow mb-4">
            YOU'VE UNLOCKED SOMETHING SPECIAL...
          </p>
          <div className="flex justify-center space-x-1">
            {Array.from({ length: score }, (_, i) => (
              <motion.span
                key={i}
                className="text-xl pixel-flicker"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.1 }}
              >
                ♥
              </motion.span>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default LoveChallenge