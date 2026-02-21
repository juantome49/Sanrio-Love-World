import { motion } from 'framer-motion';
import { Heart, Sparkles, Star } from 'lucide-react';

const FooterSection = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-16 px-4 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-sanrio-pink/30 via-sanrio-lavender/20 to-transparent" />

      {/* Floating decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              bottom: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.7, 0.3],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            {i % 3 === 0 ? (
              <Heart
                size={15 + Math.random() * 20}
                className="text-sanrio-rose"
                fill="#FF69B4"
              />
            ) : i % 3 === 1 ? (
              <Star
                size={15 + Math.random() * 20}
                className="text-sanrio-yellow"
                fill="#FFFACD"
              />
            ) : (
              <Sparkles
                size={15 + Math.random() * 20}
                className="text-sanrio-purple"
              />
            )}
          </motion.div>
        ))}
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Main footer content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          {/* Love message */}
          <motion.div
            className="mb-8"
            whileHover={{ scale: 1.02 }}
          >
            <div className="inline-flex items-center gap-3 bg-white/70 backdrop-blur-sm rounded-full px-6 py-3 shadow-sanrio mb-6">
              <motion.div
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <Heart className="w-6 h-6 text-sanrio-rose fill-sanrio-rose" />
              </motion.div>
              <span className="font-fredoka text-xl text-sanrio-rose">
                Hecho con amor
              </span>
              <motion.div
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 1, repeat: Infinity, delay: 0.5 }}
              >
                <Heart className="w-6 h-6 text-sanrio-rose fill-sanrio-rose" />
              </motion.div>
            </div>
          </motion.div>

          {/* Main quote */}
          <motion.blockquote
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="font-fredoka text-2xl md:text-3xl text-gray-700 mb-8 leading-relaxed"
          >
            "Eres mi personaje favorito en esta historia llamada vida."
            <br />
            <span className="text-gradient-pink">¡Te quiero mucho!</span>
          </motion.blockquote>

          {/* Decorative line */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex items-center justify-center gap-4 mb-8"
          >
            <div className="h-0.5 w-20 bg-gradient-to-r from-transparent to-sanrio-pink" />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            >
              <Sparkles className="w-8 h-8 text-sanrio-purple" />
            </motion.div>
            <div className="h-0.5 w-20 bg-gradient-to-l from-transparent to-sanrio-pink" />
          </motion.div>

          {/* Sanrio characters tribute */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7 }}
            className="font-nunito text-gray-500 mb-8"
          >
            Con cariño de todos los personajes Sanrio
          </motion.p>

          {/* Character icons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.9 }}
            className="flex justify-center gap-4 mb-8"
          >
            {['💕', '🌸', '☁️', '🍮', '💜', '⭐'].map((emoji, index) => (
              <motion.span
                key={index}
                className="text-3xl"
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: index * 0.2,
                }}
              >
                {emoji}
              </motion.span>
            ))}
          </motion.div>

          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1.1 }}
            className="pt-8 border-t border-sanrio-pink/30"
          >
            <p className="font-nunito text-sm text-gray-400">
              {currentYear} Sanrio Love World • Creado con {' '}
              <Heart className="w-4 h-4 inline text-sanrio-rose fill-sanrio-rose animate-heart-beat" />
              {' '}para mi novia
            </p>
            <p className="font-nunito text-xs text-gray-300 mt-2">
              Sanrio y todos los personajes son propiedad de Sanrio Co., Ltd.
              <br />
              Esta página es un tributo de fans hecho con amor.
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom wave decoration */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="w-full h-16 text-sanrio-pink/20"
        >
          <motion.path
            d="M0,60 C300,120 600,0 900,60 C1200,120 1200,60 1200,60 L1200,120 L0,120 Z"
            fill="currentColor"
            animate={{
              d: [
                'M0,60 C300,120 600,0 900,60 C1200,120 1200,60 1200,60 L1200,120 L0,120 Z',
                'M0,60 C300,0 600,120 900,60 C1200,0 1200,60 1200,60 L1200,120 L0,120 Z',
                'M0,60 C300,120 600,0 900,60 C1200,120 1200,60 1200,60 L1200,120 L0,120 Z',
              ],
            }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </svg>
      </div>
    </footer>
  );
};

export default FooterSection;
