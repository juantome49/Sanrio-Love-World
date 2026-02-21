import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, MessageCircle, Sparkles, Send, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Message {
  id: number;
  text: string;
  author: string;
  color: string;
}

const defaultMessages: Message[] = [
  {
    id: 1,
    text: 'Eres la persona más especial de mi vida. Cada día a tu lado es un regalo.',
    author: 'Sanrio Love',
    color: 'from-pink-400 to-rose-500',
  },
  {
    id: 2,
    text: 'Tu sonrisa ilumina mi mundo más que mil estrellas.',
    author: 'Hello Kitty',
    color: 'from-red-400 to-pink-500',
  },
  {
    id: 3,
    text: 'Contigo, cada momento se convierte en un dulce recuerdo.',
    author: 'My Melody',
    color: 'from-pink-300 to-pink-500',
  },
  {
    id: 4,
    text: 'Volaría por todo el cielo solo para verte sonreír.',
    author: 'Cinnamoroll',
    color: 'from-blue-300 to-sky-400',
  },
  {
    id: 5,
    text: 'Eres mi lugar favorito para descansar y ser feliz.',
    author: 'Pompompurin',
    color: 'from-yellow-300 to-amber-400',
  },
  {
    id: 6,
    text: 'Puede que sea traviesa, pero mi corazón es todo tuyo.',
    author: 'Kuromi',
    color: 'from-purple-500 to-pink-500',
  },
];

const LoveMessagesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Message[]>(defaultMessages);
  const [newMessage, setNewMessage] = useState('');
  const [showHearts, setShowHearts] = useState(false);

  const handleAddMessage = () => {
    if (newMessage.trim()) {
      const colors = [
        'from-pink-400 to-rose-500',
        'from-purple-400 to-pink-500',
        'from-blue-400 to-purple-500',
        'from-yellow-400 to-orange-500',
      ];
      
      const message: Message = {
        id: Date.now(),
        text: newMessage,
        author: 'Para mi amor',
        color: colors[Math.floor(Math.random() * colors.length)],
      };
      
      setMessages([message, ...messages]);
      setNewMessage('');
      setShowHearts(true);
      
      setTimeout(() => setShowHearts(false), 2000);
    }
  };

  return (
    <section
      id="messages"
      ref={sectionRef}
      className="py-20 px-4 relative overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            <Heart
              size={10 + Math.random() * 15}
              className="text-sanrio-pink"
              fill="#FFB7C5"
            />
          </motion.div>
        ))}
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
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
            <Heart className="w-5 h-5 text-sanrio-rose fill-sanrio-rose" />
            <span className="font-nunito text-sanrio-rose font-semibold">
              Mensajes de amor
            </span>
          </motion.div>
          
          <h2 className="font-fredoka text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Palabras desde el <span className="text-gradient-pink">corazón</span>
          </h2>
          
          <p className="font-nunito text-lg text-gray-600 max-w-2xl mx-auto">
            Cada personaje tiene un mensaje especial para ti. También puedes dejar tu propio mensaje de amor.
          </p>
        </motion.div>

        {/* Add message input */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="glass-card rounded-3xl p-6 shadow-sanrio max-w-2xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddMessage()}
                  placeholder="Escribe un mensaje de amor..."
                  className="w-full h-14 pl-5 pr-4 rounded-full border-2 border-sanrio-pink/30 focus:border-sanrio-rose bg-white/80 font-nunito text-gray-700 placeholder:text-gray-400"
                />
                <Sparkles className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-sanrio-pink" />
              </div>
              <Button
                onClick={handleAddMessage}
                className="bg-gradient-to-r from-sanrio-rose to-sanrio-pink hover:from-sanrio-pink hover:to-sanrio-rose text-white font-fredoka h-14 px-8 rounded-full shadow-sanrio hover:shadow-glow-pink transition-all duration-300 hover:scale-105"
              >
                <Send className="w-5 h-5 mr-2" />
                Enviar
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Messages grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {messages.map((message, index) => (
              <motion.div
                key={message.id}
                layout
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group"
              >
                <div className="relative bg-white rounded-3xl p-6 shadow-sanrio hover:shadow-sanrio-lg transition-all duration-500 overflow-hidden">
                  {/* Gradient border effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${message.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-3xl`} />
                  
                  {/* Quote icon */}
                  <div className={`absolute -top-3 -left-2 w-10 h-10 bg-gradient-to-br ${message.color} rounded-full flex items-center justify-center shadow-lg`}>
                    <MessageCircle className="w-5 h-5 text-white" />
                  </div>
                  
                  {/* Message content */}
                  <div className="pt-4">
                    <p className="font-nunito text-gray-700 text-lg leading-relaxed mb-4">
                      "{message.text}"
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          <Heart className="w-4 h-4 text-sanrio-rose fill-sanrio-rose" />
                        </motion.div>
                        <span className={`font-fredoka text-sm bg-gradient-to-r ${message.color} bg-clip-text text-transparent font-semibold`}>
                          — {message.author}
                        </span>
                      </div>
                      
                      <motion.div
                        whileHover={{ rotate: 180 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Star className="w-5 h-5 text-sanrio-yellow fill-sanrio-yellow" />
                      </motion.div>
                    </div>
                  </div>
                  
                  {/* Decorative corner */}
                  <div className={`absolute -bottom-4 -right-4 w-20 h-20 bg-gradient-to-br ${message.color} rounded-full opacity-10 blur-xl`} />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Floating hearts animation */}
        <AnimatePresence>
          {showHearts && (
            <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
              {[...Array(15)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ 
                    opacity: 1, 
                    scale: 0,
                    x: 0,
                    y: 0,
                  }}
                  animate={{ 
                    opacity: 0,
                    scale: 1.5,
                    x: (Math.random() - 0.5) * 400,
                    y: (Math.random() - 0.5) * 400 - 200,
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 2, ease: 'easeOut' }}
                  className="absolute"
                >
                  <Heart
                    size={30 + Math.random() * 40}
                    className="text-sanrio-rose"
                    fill="#FF69B4"
                  />
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default LoveMessagesSection;
