import { useState, useEffect } from 'react';
import { rotatingTextItems, rotationInterval } from './rotatingTextData';

// =============================================================================
// CUSTOM HOOK FOR ROTATING TEXT
// =============================================================================

export const useRotatingText = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);

      // Small delay to allow fade out animation
      setTimeout(() => {
        setCurrentIndex(prevIndex =>
          prevIndex === rotatingTextItems.length - 1 ? 0 : prevIndex + 1
        );
        setIsTransitioning(false);
      }, 150); // Half of the transition duration
    }, rotationInterval);

    return () => clearInterval(interval);
  }, []);

  return {
    currentText: rotatingTextItems[currentIndex],
    isTransitioning,
  };
};
