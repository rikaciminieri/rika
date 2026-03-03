import { createContext, useContext, useState, useCallback } from 'react';
import { i18n } from '../content/i18n';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('en');

  const t = useCallback((key) => {
    const resolve = (obj, path) => path.split('.').reduce((o, k) => o?.[k], obj);
    return resolve(i18n[lang], key) ?? resolve(i18n.en, key) ?? key;
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within a LanguageProvider');
  return ctx;
}
