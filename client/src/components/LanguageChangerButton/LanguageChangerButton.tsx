import Button from '@mui/material/Button';
import { observer } from 'mobx-react';
import React, { useState } from 'react';
import i18n from '../../locales/config';

export const LanguageChangerButton = observer(() => {
  const [language, setLanguage] = useState<'en' | 'ru'>('ru');

  const handleChange = () => {
    let lang: 'en' | 'ru' = language === 'en' ? 'ru' : 'en';
    setLanguage(lang);
    i18n.changeLanguage(language);
  };

  return (
    <Button className="langSwitcher" variant="contained" color="info" value={language} onClick={() => handleChange()}>
      {language.toUpperCase()}
    </Button>
  );
});

export default LanguageChangerButton;
