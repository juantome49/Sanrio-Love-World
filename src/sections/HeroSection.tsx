import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 50, scale: 0.8 },
        { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: 'back.out(1.7)', delay: 0.3 }
      );

      // Subtitle animation
      gsap.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.6 }
      );

      // Buttons animation
      gsap.fromTo(
        buttonsRef.current?.children || [],
        { opacity: 0, y: 20, scale: 0.8 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.15, ease: 'back.out(1.7)', delay: 0.9 }
      );

      // Image animation
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, scale: 0.5, rotation: -10 },
        { opacity: 1, scale: 1, rotation: 0, duration: 1.5, ease: 'elastic.out(1, 0.5)', delay: 0.5 }
      );

      // Floating animation for image
      gsap.to(imageRef.current, {
        y: -15,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 py-20"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating stars */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            <Star
              className="text-sanrio-yellow"
              size={15 + Math.random() * 20}
              fill="#FFFACD"
            />
          </motion.div>
        ))}

        {/* Sparkles */}
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={`sparkle-${i}`}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              rotate: [0, 180, 360],
              scale: [0.5, 1, 0.5],
              opacity: [0.2, 1, 0.2],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          >
            <Sparkles
              className="text-sanrio-rose"
              size={10 + Math.random() * 15}
            />
          </motion.div>
        ))}
      </div>

      <div className="max-w-6xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-sm rounded-full px-4 py-2 mb-6"
            >
              <Heart className="w-4 h-4 text-sanrio-rose fill-sanrio-rose animate-heart-beat" />
              <span className="text-sm font-nunito text-sanrio-rose font-semibold">
                Para mi persona especial
              </span>
              <Heart className="w-4 h-4 text-sanrio-rose fill-sanrio-rose animate-heart-beat" />
            </motion.div>

            <h1
              ref={titleRef}
              className="font-fredoka text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
            >
              <span className="text-gradient-pink">Sanrio</span>
              <br />
              <span className="text-gray-800">Love World</span>
              <motion.span
                animate={{ rotate: [0, 20, -20, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="inline-block ml-2"
              >
                💕
              </motion.span>
            </h1>

            <p
              ref={subtitleRef}
              className="font-nunito text-lg md:text-xl text-gray-600 mb-8 max-w-lg mx-auto lg:mx-0"
            >
              Un mundo mágico lleno de ternura, donde cada personaje tiene un
              mensaje de amor especial para ti. ¡Descubre tu lado más kawaii!
            </p>

            <div ref={buttonsRef} className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <Button
                onClick={() => scrollToSection('#characters')}
                className="bg-gradient-to-r from-sanrio-rose to-sanrio-pink hover:from-sanrio-pink hover:to-sanrio-rose text-white font-fredoka text-lg px-8 py-6 rounded-full shadow-sanrio-lg hover:shadow-glow-pink transition-all duration-300 hover:scale-105"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Conocer Personajes
              </Button>
              <Button
                onClick={() => scrollToSection('#quiz')}
                variant="outline"
                className="border-2 border-sanrio-purple text-sanrio-purple hover:bg-sanrio-purple hover:text-white font-fredoka text-lg px-8 py-6 rounded-full transition-all duration-300 hover:scale-105"
              >
                <Heart className="w-5 h-5 mr-2" />
                Hacer Quiz
              </Button>
            </div>
          </div>

          {/* Right content - Hero Image */}
          <div className="order-1 lg:order-2 flex justify-center">
            <div ref={imageRef} className="relative">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-sanrio-pink via-sanrio-purple to-sanrio-blue rounded-full blur-3xl opacity-40 scale-110" />
              
              {/* Main image container */}
              <motion.div
                className="relative w-72 h-72 md:w-96 md:h-96"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <img
                  src="/hello-kitty.png"
                  alt="Hello Kitty"
                  className="w-full h-full object-contain drop-shadow-2xl"
                />
                
                {/* Orbiting hearts */}
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute"
                    style={{
                      top: '50%',
                      left: '50%',
                    }}
                    animate={{
                      x: Math.cos((i * 60 * Math.PI) / 180) * 180,
                      y: Math.sin((i * 60 * Math.PI) / 180) * 180,
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: 'linear',
                      delay: (i * 8) / 6,
                    }}
                  >
                    <Heart
                      className="text-sanrio-rose"
                      size={20}
                      fill="#FF69B4"
                    />
                  </motion.div>
                ))}
              </motion.div>

              {/* Decorative elements */}
              <motion.div
                className="absolute -top-8 -right-8"
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
              >
                <Star className="w-12 h-12 text-sanrio-yellow fill-sanrio-yellow" />
              </motion.div>
              
              <motion.div
                className="absolute -bottom-4 -left-8"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Sparkles className="w-10 h-10 text-sanrio-purple" />
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-sanrio-rose rounded-full flex justify-center pt-2">
          <motion.div
            className="w-1.5 h-3 bg-sanrio-rose rounded-full"
            animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
