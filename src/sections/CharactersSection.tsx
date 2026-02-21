import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Heart, Star, Sparkles } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

gsap.registerPlugin(ScrollTrigger);

interface Character {
  id: number;
  name: string;
  image: string;
  color: string;
  bgColor: string;
  description: string;
  personality: string[];
  likes: string[];
  message: string;
}

const characters: Character[] = [
  {
    id: 1,
    name: 'Hello Kitty',
    image: '/hello-kitty.png',
    color: 'from-pink-400 to-rose-500',
    bgColor: 'bg-pink-100',
    description: 'La gatita más famosa del mundo, conocida por su lazo rojo y su corazón bondadoso.',
    personality: ['Amable', 'Optimista', 'Creativa', 'Leal'],
    likes: ['Hornear galletas', 'Viajar', 'Hacer nuevos amigos', 'La familia'],
    message: '¡Hola! Recuerda que cada día es una nueva oportunidad para sonreír y hacer felices a los demás. ¡Te quiero! 💕',
  },
  {
    id: 2,
    name: 'My Melody',
    image: '/my-melody.png',
    color: 'from-pink-300 to-pink-500',
    bgColor: 'bg-pink-50',
    description: 'Una dulce conejita que siempre lleva su capucha rosa favorita.',
    personality: ['Dulce', 'Inocente', 'Generosa', 'Soñadora'],
    likes: ['Recoger flores', 'Coser', 'Comer pastel de fresa', 'Su abuela'],
    message: '¡Hola amor! Eres tan dulce como un pastel de fresa recién horneado. ¡Nunca dejes de soñar! 🌸',
  },
  {
    id: 3,
    name: 'Cinnamoroll',
    image: '/cinnamoroll.png',
    color: 'from-blue-300 to-sky-400',
    bgColor: 'bg-blue-50',
    description: 'Un cachorro blanco con orejas largas que le permiten volar por el cielo.',
    personality: ['Tranquilo', 'Aventurero', 'Amigable', 'Curioso'],
    likes: ['Volar por el cielo', 'Canela en rollo', 'Nubes suaves', 'Su cafetería'],
    message: '¡Vamos a volar juntos por un cielo lleno de sueños! Eres mi nube favorita. ☁️💙',
  },
  {
    id: 4,
    name: 'Pompompurin',
    image: '/pompompurin.png',
    color: 'from-yellow-300 to-amber-400',
    bgColor: 'bg-yellow-50',
    description: 'Un perrito golden retriever con forma de pudín que ama dormir.',
    personality: ['Relajado', 'Leal', 'Amable', 'Glotón'],
    likes: ['Dormir', 'El pudín de mamá', 'Zapatos', 'Su beret marrón'],
    message: 'A veces lo mejor es simplemente relajarse y disfrutar los momentos juntos. ¡Eres mi lugar favorito! 🍮',
  },
  {
    id: 5,
    name: 'Kuromi',
    image: '/kuromi.png',
    color: 'from-purple-500 to-pink-500',
    bgColor: 'bg-purple-50',
    description: 'Una conejita traviesa con un lado dulce que esconde bajo su actitud punk.',
    personality: ['Traviesa', 'Segura', 'Leal', 'Divertida'],
    likes: ['Escribir en su diario', 'El rock', 'Los corazones', 'Su pandilla'],
    message: 'Puede que parezca dura por fuera, pero por dentro soy toda un corazón. ¡Y tú tienes el mío! 💜🖤',
  },
  {
    id: 6,
    name: 'Little Twin Stars',
    image: '/twin-stars.png',
    color: 'from-blue-300 to-pink-300',
    bgColor: 'bg-gradient-to-br from-blue-50 to-pink-50',
    description: 'Kiki y Lala, dos hermanos estrella que iluminan el cielo con su amor.',
    personality: ['Mágicos', 'Amorosos', 'Soñadores', 'Especiales'],
    likes: ['Brillar en el cielo', 'Ayudar a otros', 'Las estrellas', 'Estar juntos'],
    message: 'Como las estrellas en el cielo, nuestro amor brilla eternamente. ¡Eres mi estrella favorita! ⭐',
  },
];

const CharactersSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <section
      id="characters"
      ref={sectionRef}
      className="py-20 px-4 relative"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10"
          animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <Star className="w-16 h-16 text-sanrio-yellow/30 fill-sanrio-yellow" />
        </motion.div>
        <motion.div
          className="absolute bottom-40 right-10"
          animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
        >
          <Heart className="w-20 h-20 text-sanrio-pink/30 fill-sanrio-pink" />
        </motion.div>
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-sm rounded-full px-4 py-2 mb-4"
            whileHover={{ scale: 1.05 }}
          >
            <Sparkles className="w-5 h-5 text-sanrio-purple" />
            <span className="font-nunito text-sanrio-purple font-semibold">
              Conoce a la pandilla
            </span>
          </motion.div>
          
          <h2 className="font-fredoka text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Personajes <span className="text-gradient-pink">Sanrio</span>
          </h2>
          
          <p className="font-nunito text-lg text-gray-600 max-w-2xl mx-auto">
            Cada uno de estos adorables amigos tiene una personalidad única y un mensaje especial de amor para ti.
            ¡Haz clic en ellos para conocerlos mejor!
          </p>
        </motion.div>

        {/* Characters grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {characters.map((character) => (
            <motion.div
              key={character.id}
              variants={cardVariants}
              whileHover={{ y: -10, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedCharacter(character)}
              className="group cursor-pointer"
            >
              <div className={`relative ${character.bgColor} rounded-3xl p-6 shadow-sanrio hover:shadow-sanrio-lg transition-all duration-500 overflow-hidden`}>
                {/* Card background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${character.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                
                {/* Character image */}
                <div className="relative h-48 mb-4 flex items-center justify-center">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent rounded-2xl"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  />
                  <motion.img
                    src={character.image}
                    alt={character.name}
                    className="h-full w-auto object-contain drop-shadow-lg relative z-10"
                    whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                    transition={{ duration: 0.5 }}
                  />
                </div>

                {/* Character info */}
                <div className="text-center relative z-10">
                  <h3 className="font-fredoka text-2xl font-bold text-gray-800 mb-2 group-hover:text-sanrio-rose transition-colors">
                    {character.name}
                  </h3>
                  <p className="font-nunito text-sm text-gray-600 line-clamp-2">
                    {character.description}
                  </p>
                </div>

                {/* Hover indicator */}
                <motion.div
                  className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1.2 }}
                >
                  <Sparkles className="w-6 h-6 text-sanrio-rose" />
                </motion.div>

                {/* Decorative corner */}
                <div className={`absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br ${character.color} rounded-full opacity-20 blur-xl`} />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Character Detail Dialog */}
      <Dialog open={!!selectedCharacter} onOpenChange={() => setSelectedCharacter(null)}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto rounded-3xl border-4 border-sanrio-pink/30 p-0">
          <AnimatePresence>
            {selectedCharacter && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                {/* Header with gradient */}
                <div className={`bg-gradient-to-br ${selectedCharacter.color} p-6 relative overflow-hidden`}>
                  <DialogHeader>
                    <DialogTitle className="font-fredoka text-3xl text-white text-center relative z-10">
                      {selectedCharacter.name}
                    </DialogTitle>
                  </DialogHeader>
                  
                  {/* Character image in header */}
                  <motion.div
                    className="flex justify-center mt-4"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <img
                      src={selectedCharacter.image}
                      alt={selectedCharacter.name}
                      className="w-32 h-32 object-contain drop-shadow-2xl"
                    />
                  </motion.div>
                  
                  {/* Decorative elements */}
                  <Star className="absolute top-4 left-4 w-8 h-8 text-white/30" />
                  <Heart className="absolute bottom-4 right-4 w-8 h-8 text-white/30" />
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                  {/* Description */}
                  <div>
                    <h4 className="font-fredoka text-lg text-sanrio-rose mb-2 flex items-center gap-2">
                      <Sparkles className="w-5 h-5" />
                      Sobre mí
                    </h4>
                    <p className="font-nunito text-gray-600">
                      {selectedCharacter.description}
                    </p>
                  </div>

                  {/* Personality */}
                  <div>
                    <h4 className="font-fredoka text-lg text-sanrio-purple mb-2 flex items-center gap-2">
                      <Star className="w-5 h-5" />
                      Personalidad
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedCharacter.personality.map((trait, index) => (
                        <motion.span
                          key={trait}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1 }}
                          className="px-3 py-1 bg-sanrio-pink/20 text-sanrio-rose rounded-full text-sm font-nunito font-semibold"
                        >
                          {trait}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  {/* Likes */}
                  <div>
                    <h4 className="font-fredoka text-lg text-sanrio-blue mb-2 flex items-center gap-2">
                      <Heart className="w-5 h-5" />
                      Me encanta
                    </h4>
                    <ul className="space-y-1">
                      {selectedCharacter.likes.map((like, index) => (
                        <motion.li
                          key={like}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="font-nunito text-gray-600 flex items-center gap-2"
                        >
                          <span className="w-2 h-2 bg-sanrio-pink rounded-full" />
                          {like}
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  {/* Special message */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="bg-gradient-to-r from-sanrio-pink/20 to-sanrio-purple/20 rounded-2xl p-4 border-2 border-dashed border-sanrio-pink/40"
                  >
                    <h4 className="font-fredoka text-lg text-sanrio-rose mb-2 flex items-center gap-2">
                      <Heart className="w-5 h-5 fill-sanrio-rose" />
                      Mensaje especial para ti
                    </h4>
                    <p className="font-nunito text-gray-700 italic">
                      "{selectedCharacter.message}"
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default CharactersSection;
