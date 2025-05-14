
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type LanguageContextType = {
  language: string;
  setLanguage: (language: string) => void;
  isRTL: boolean;
};

const defaultLanguage = 'en';

const LanguageContext = createContext<LanguageContextType>({
  language: defaultLanguage,
  setLanguage: () => {},
  isRTL: false,
});

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState(defaultLanguage);
  const [isRTL, setIsRTL] = useState(false);

  useEffect(() => {
    const storedLanguage = localStorage.getItem('language') || defaultLanguage;
    setLanguageState(storedLanguage);
    setIsRTL(storedLanguage === 'he');
  }, []);

  const setLanguage = (newLanguage: string) => {
    localStorage.setItem('language', newLanguage);
    setLanguageState(newLanguage);
    setIsRTL(newLanguage === 'he');
    
    // Set the dir attribute on the html element
    document.documentElement.dir = newLanguage === 'he' ? 'rtl' : 'ltr';
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
