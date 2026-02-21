import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, Star, ArrowRight, RotateCcw, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface Question {
  id: number;
  question: string;
  options: {
    text: string;
    character: string;
    emoji: string;
  }[];
}

interface Result {
  character: string;
  image: string;
  description: string;
  traits: string[];
  message: string;
}

const questions: Question[] = [
  {
    id: 1,
    question: '¿Cuál es tu plan perfecto para un día libre?',
    options: [
      { text: 'Hornear algo delicioso para mi familia', character: 'hellokitty', emoji: '🍪' },
      { text: 'Recoger flores en el jardín', character: 'mymelody', emoji: '🌸' },
      { text: 'Volar por el cielo y ver las nubes', character: 'cinnamoroll', emoji: '☁️' },
      { text: 'Dormir y relajarme todo el día', character: 'pompompurin', emoji: '💤' },
      { text: 'Escribir en mi diario secreto', character: 'kuromi', emoji: '📓' },
      { text: 'Brillar en el cielo con mi hermano/a', character: 'twinstars', emoji: '⭐' },
    ],
  },
  {
    id: 2,
    question: '¿Qué cualidad te describe mejor?',
    options: [
      { text: 'Creativa y cariñosa', character: 'hellokitty', emoji: '💖' },
      { text: 'Dulce y generosa', character: 'mymelody', emoji: '🍓' },
      { text: 'Tranquila y aventurera', character: 'cinnamoroll', emoji: '🌤️' },
      { text: 'Relajada y leal', character: 'pompompurin', emoji: '🍮' },
      { text: 'Segura y divertida', character: 'kuromi', emoji: '💜' },
      { text: 'Mágica y especial', character: 'twinstars', emoji: '✨' },
    ],
  },
  {
    id: 3,
    question: '¿Cuál es tu postre favorito?',
    options: [
      { text: 'Galletas recién horneadas', character: 'hellokitty', emoji: '🍪' },
      { text: 'Pastel de fresa', character: 'mymelody', emoji: '🍰' },
      { text: 'Canela en rollo', character: 'cinnamoroll', emoji: '🌀' },
      { text: 'Pudín de vainilla', character: 'pompompurin', emoji: '🍮' },
      { text: 'Algo con chocolate oscuro', character: 'kuromi', emoji: '🍫' },
      { text: 'Dulces brillantes como estrellas', character: 'twinstars', emoji: '🍬' },
    ],
  },
  {
    id: 4,
    question: '¿Cómo expresas tu amor?',
    options: [
      { text: 'Con pequeños detalles y regalos', character: 'hellokitty', emoji: '🎁' },
      { text: 'Con palabras dulces y abrazos', character: 'mymelody', emoji: '🤗' },
      { text: 'Acompañando en aventuras', character: 'cinnamoroll', emoji: '🌈' },
      { text: 'Estando siempre presente', character: 'pompompurin', emoji: '💛' },
      { text: 'De forma única y especial', character: 'kuromi', emoji: '🖤' },
      { text: 'Con luz y magia', character: 'twinstars', emoji: '💫' },
    ],
  },
  {
    id: 5,
    question: '¿Qué te hace más feliz?',
    options: [
      { text: 'Ver sonreír a mis seres queridos', character: 'hellokitty', emoji: '😊' },
      { text: 'Los momentos tranquilos en casa', character: 'mymelody', emoji: '🏠' },
      { text: 'Descubrir lugares nuevos', character: 'cinnamoroll', emoji: '🗺️' },
      { text: 'Una buena siesta con mi mascota', character: 'pompompurin', emoji: '🐾' },
      { text: 'Expresar mi verdadero yo', character: 'kuromi', emoji: '🎸' },
      { text: 'Compartir momentos especiales', character: 'twinstars', emoji: '👫' },
    ],
  },
];

const results: Record<string, Result> = {
  hellokitty: {
    character: 'Hello Kitty',
    image: '/hello-kitty.png',
    description: 'Eres una persona cariñosa, creativa y siempre piensas en los demás. Tu corazón bondadoso ilumina la vida de quienes te rodean.',
    traits: ['Creativa', 'Cariñosa', 'Optimista', 'Detallista'],
    message: '¡Eres pura ternura! Tu capacidad de hacer felices a los demás con pequeños gestos te hace única. ¡Nunca cambies! 💕',
  },
  mymelody: {
    character: 'My Melody',
    image: '/my-melody.png',
    description: 'Eres dulce, inocente y siempre ves lo mejor en los demás. Tu generosidad y bondad son contagiosas.',
    traits: ['Dulce', 'Generosa', 'Inocente', 'Soñadora'],
    message: 'Tu dulzura es tu superpoder. El mundo necesita más personas como tú que esparcen amor dondequiera que van. 🌸',
  },
  cinnamoroll: {
    character: 'Cinnamoroll',
    image: '/cinnamoroll.png',
    description: 'Eres tranquila, aventurera y siempre estás lista para nuevas experiencias. Tu espíritu libre te lleva a lugares maravillosos.',
    traits: ['Aventurera', 'Tranquila', 'Curiosa', 'Libre'],
    message: '¡Vuela alto y nunca dejes de soñar! Tu espíritu aventurero te llevará a grandes lugares. ☁️',
  },
  pompompurin: {
    character: 'Pompompurin',
    image: '/pompompurin.png',
    description: 'Eres relajada, leal y valoras los momentos de paz. Tu presencia calmada es un refugio para quienes te aman.',
    traits: ['Relajada', 'Leal', 'Pacífica', 'Amable'],
    message: 'A veces lo mejor es simplemente estar presente. Tu calma y lealtad hacen del mundo un lugar mejor. 🍮',
  },
  kuromi: {
    character: 'Kuromi',
    image: '/kuromi.png',
    description: 'Eres única, segura de ti misma y no tienes miedo de ser diferente. Tu autenticidad es tu mayor fortaleza.',
    traits: ['Única', 'Segura', 'Auténtica', 'Divertida'],
    message: '¡Nunca dejes de ser tú! Tu estilo único y tu actitud segura te hacen increíblemente especial. 💜🖤',
  },
  twinstars: {
    character: 'Little Twin Stars',
    image: '/twin-stars.png',
    description: 'Eres mágica, soñadora y compartes una conexión especial con las personas que amas. Tu luz brilla intensamente.',
    traits: ['Mágica', 'Soñadora', 'Especial', 'Brillante'],
    message: 'Eres una estrella que ilumina el cielo de quienes te rodean. ¡Sigue brillando con tu luz única! ⭐',
  },
};

const QuizSection = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleAnswer = (character: string) => {
    setIsAnimating(true);
    const newAnswers = [...answers, character];
    setAnswers(newAnswers);

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setIsAnimating(false);
      } else {
        setShowResult(true);
        setIsAnimating(false);
      }
    }, 500);
  };

  const calculateResult = (): Result => {
    const counts: Record<string, number> = {};
    answers.forEach((answer) => {
      counts[answer] = (counts[answer] || 0) + 1;
    });
    
    const winner = Object.entries(counts).reduce((a, b) =>
      counts[a[0]] > counts[b[0]] ? a : b
    )[0];
    
    return results[winner] || results.hellokitty;
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResult(false);
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const result = showResult ? calculateResult() : null;

  return (
    <section
      id="quiz"
      className="py-20 px-4 relative overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-20 left-10"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        >
          <Sparkles className="w-24 h-24 text-sanrio-yellow/20" />
        </motion.div>
        <motion.div
          className="absolute bottom-20 right-10"
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        >
          <Star className="w-32 h-32 text-sanrio-pink/20" />
        </motion.div>
      </div>

      <div className="max-w-3xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <motion.div
            className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-sm rounded-full px-4 py-2 mb-4"
            whileHover={{ scale: 1.05 }}
          >
            <Gift className="w-5 h-5 text-sanrio-purple" />
            <span className="font-nunito text-sanrio-purple font-semibold">
              Descubre tu personaje
            </span>
          </motion.div>
          
          <h2 className="font-fredoka text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            ¿Qué personaje <span className="text-gradient-pink">Sanrio</span> eres?
          </h2>
          
          <p className="font-nunito text-lg text-gray-600 max-w-2xl mx-auto">
            Responde estas preguntas y descubre qué adorable personaje de Sanrio refleja mejor tu personalidad.
          </p>
        </motion.div>

        {/* Quiz container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass-card rounded-3xl p-8 shadow-sanrio-lg"
        >
          <AnimatePresence mode="wait">
            {!showResult ? (
              <motion.div
                key="question"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                {/* Progress */}
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-nunito text-sm text-gray-500">
                      Pregunta {currentQuestion + 1} de {questions.length}
                    </span>
                    <span className="font-fredoka text-sanrio-rose">
                      {Math.round(progress)}%
                    </span>
                  </div>
                  <Progress
                    value={progress}
                    className="h-3 bg-sanrio-pink/20"
                  />
                </div>

                {/* Question */}
                <motion.h3
                  key={currentQuestion}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="font-fredoka text-2xl md:text-3xl text-gray-800 mb-8 text-center"
                >
                  {questions[currentQuestion].question}
                </motion.h3>

                {/* Options */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {questions[currentQuestion].options.map((option, index) => (
                    <motion.button
                      key={option.text}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.03, y: -3 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleAnswer(option.character)}
                      disabled={isAnimating}
                      className="group relative bg-white border-2 border-sanrio-pink/30 hover:border-sanrio-rose rounded-2xl p-4 text-left transition-all duration-300 hover:shadow-sanrio disabled:opacity-50"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{option.emoji}</span>
                        <span className="font-nunito text-gray-700 group-hover:text-sanrio-rose transition-colors">
                          {option.text}
                        </span>
                        <ArrowRight className="w-5 h-5 text-sanrio-pink opacity-0 group-hover:opacity-100 ml-auto transition-opacity" />
                      </div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, type: 'spring' }}
                className="text-center"
              >
                {result && (
                  <>
                    {/* Result header */}
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="mb-6"
                    >
                      <Sparkles className="w-12 h-12 text-sanrio-yellow mx-auto mb-4 animate-sparkle" />
                      <h3 className="font-fredoka text-2xl text-gray-600 mb-2">
                        ¡Eres...
                      </h3>
                      <h2 className="font-fredoka text-4xl md:text-5xl text-gradient-pink">
                        {result.character}!
                      </h2>
                    </motion.div>

                    {/* Result image */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4, type: 'spring' }}
                      className="relative w-48 h-48 mx-auto mb-6"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-sanrio-pink to-sanrio-purple rounded-full blur-2xl opacity-30" />
                      <motion.img
                        src={result.image}
                        alt={result.character}
                        className="w-full h-full object-contain relative z-10"
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    </motion.div>

                    {/* Result description */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                      className="space-y-4 mb-8"
                    >
                      <p className="font-nunito text-lg text-gray-600">
                        {result.description}
                      </p>

                      {/* Traits */}
                      <div className="flex flex-wrap justify-center gap-2">
                        {result.traits.map((trait, index) => (
                          <motion.span
                            key={trait}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.8 + index * 0.1 }}
                            className="px-4 py-2 bg-sanrio-pink/20 text-sanrio-rose rounded-full font-nunito font-semibold"
                          >
                            {trait}
                          </motion.span>
                        ))}
                      </div>

                      {/* Special message */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.2 }}
                        className="bg-gradient-to-r from-sanrio-pink/20 to-sanrio-purple/20 rounded-2xl p-4 border-2 border-dashed border-sanrio-pink/40"
                      >
                        <Heart className="w-6 h-6 text-sanrio-rose mx-auto mb-2 fill-sanrio-rose animate-heart-beat" />
                        <p className="font-nunito text-gray-700 italic">
                          "{result.message}"
                        </p>
                      </motion.div>
                    </motion.div>

                    {/* Reset button */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.4 }}
                    >
                      <Button
                        onClick={resetQuiz}
                        className="bg-gradient-to-r from-sanrio-purple to-sanrio-pink hover:from-sanrio-pink hover:to-sanrio-purple text-white font-fredoka px-8 py-6 rounded-full shadow-sanrio hover:shadow-glow-purple transition-all duration-300 hover:scale-105"
                      >
                        <RotateCcw className="w-5 h-5 mr-2" />
                        Volver a jugar
                      </Button>
                    </motion.div>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default QuizSection;
