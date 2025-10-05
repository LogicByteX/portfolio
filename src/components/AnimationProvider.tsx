import React, { createContext, useContext, useState, useEffect } from 'react';

interface AnimationContextType {
  isAnimationsEnabled: boolean;
  toggleAnimations: () => void;
}

const AnimationContext = createContext<AnimationContextType | undefined>(undefined);

export const useAnimations = () => {
  const context = useContext(AnimationContext);
  if (!context) {
    throw new Error('useAnimations must be used within AnimationProvider');
  }
  return context;
};

interface AnimationProviderProps {
  children: React.ReactNode;
}

export const AnimationProvider: React.FC<AnimationProviderProps> = ({ children }) => {
  // Check for user's motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  const [isAnimationsEnabled, setIsAnimationsEnabled] = useState(!prefersReducedMotion);

  // Load preferences from localStorage
  useEffect(() => {
    const savedAnimations = localStorage.getItem('animations-enabled');
    
    if (savedAnimations !== null) {
      setIsAnimationsEnabled(JSON.parse(savedAnimations));
    }
  }, []);

  const toggleAnimations = () => {
    const newValue = !isAnimationsEnabled;
    setIsAnimationsEnabled(newValue);
    localStorage.setItem('animations-enabled', JSON.stringify(newValue));
  };

  return (
    <AnimationContext.Provider
      value={{
        isAnimationsEnabled,
        toggleAnimations,
      }}
    >
      {children}
    </AnimationContext.Provider>
  );
};
