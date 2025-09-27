import { Dropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  const getCurrentLanguageFlag = () => {
    return i18n.language.startsWith('es') ? '🇪🇸' : '🇺🇸';
  };

  const getCurrentLanguageName = () => {
    return i18n.language.startsWith('es') ? 'Español' : 'English';
  };

  return (
    <Dropdown>
      <Dropdown.Toggle
        variant="outline-light"
        id="language-dropdown"
        className="d-flex align-items-center gap-2"
        style={{
          border: '2px solid rgba(255, 255, 255, 0.3)',
          borderRadius: '25px',
          padding: '0.5rem 1rem',
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          color: 'white',
          fontWeight: '500'
        }}
      >
        <span>{getCurrentLanguageFlag()}</span>
        <span>{getCurrentLanguageName()}</span>
      </Dropdown.Toggle>

      <Dropdown.Menu
        style={{
          borderRadius: '15px',
          border: 'none',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
          overflow: 'hidden'
        }}
      >
        <Dropdown.Item
          onClick={() => changeLanguage('es')}
          className={`d-flex align-items-center gap-2 py-2 px-3 ${
            i18n.language.startsWith('es') ? 'bg-light' : ''
          }`}
          style={{
            fontWeight: i18n.language.startsWith('es') ? 'bold' : 'normal'
          }}
        >
          <span>🇪🇸</span>
          <span>{t('spanish')}</span>
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => changeLanguage('en')}
          className={`d-flex align-items-center gap-2 py-2 px-3 ${
            i18n.language.startsWith('en') ? 'bg-light' : ''
          }`}
          style={{
            fontWeight: i18n.language.startsWith('en') ? 'bold' : 'normal'
          }}
        >
          <span>🇺🇸</span>
          <span>{t('english')}</span>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default LanguageSwitcher;