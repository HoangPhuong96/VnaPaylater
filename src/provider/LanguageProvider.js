import { useState,  createContext } from 'react';

import { dictionaryList, languageOptions } from '../languages';
import { KEY_CACHE } from '../constants';
// create the language context with default selected language
export const LanguageContext = createContext({
  userLanguage: 'en',
  dictionary: dictionaryList.en
});

export const LanguageProvider = ({ children }) => {
    // const defaultLanguage = window.localStorage.getItem(KEY_CACHE.LANGUAGE);
    const [userLanguage, setUserLanguage] = useState('vi');
  
    const provider = {
      userLanguage,
      dictionary: dictionaryList[userLanguage],
      userLanguageChange: selected => {
        const newLanguage = languageOptions[selected] ? selected : 'vi'
        setUserLanguage(newLanguage);
        window.localStorage.setItem(KEY_CACHE.LANGUAGE, newLanguage);
      }
    };
  
    return (
      <LanguageContext.Provider value={provider}>
        {children}
      </LanguageContext.Provider>
    );
  };