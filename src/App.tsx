import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HeroSection from './sections/HeroSection';
import CharactersSection from './sections/CharactersSection';
import LoveMessagesSection from './sections/LoveMessagesSection';
import QuizSection from './sections/QuizSection';
import FooterSection from './sections/FooterSection';
import FloatingHearts from './components/FloatingHearts';
import Navigation from './components/Navigation';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Smooth scroll behavior
    const sections = document.querySelectorAll('.animate-section');
    
    sections.forEach((section) => {
      gsap.fromTo(
        section,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'top 50%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div ref={mainRef} className="relative min-h-screen bg-gradient-sanrio overflow-hidden">
      <FloatingHearts />
      <Navigation />
      
      <main className="relative z-10">
        <HeroSection />
        <CharactersSection />
        <LoveMessagesSection />
        <QuizSection />
        <FooterSection />
      </main>
    </div>
  );
}

export default App;
