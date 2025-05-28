import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

const BackToTop = () => {
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollButton(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return showScrollButton ? (
    <button
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 flex items-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-full shadow-lg hover:bg-green-700 transition-colors"
    >
      <ArrowUp className="h-5 w-5" />
      <span>Na vrh</span>
    </button>
  ) : null;
};

export default BackToTop;