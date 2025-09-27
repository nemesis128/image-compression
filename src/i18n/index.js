import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Traducciones
const resources = {
  en: {
    translation: {
      // Header/Hero
      appTitle: "WebP Converter",
      appSubtitle: "🚀 Convert and optimize your images to next-generation WebP format. Reduce up to 80% file size without losing quality.",

      // Dropzone
      dropzoneTitle: "Drag your images here",
      dropzoneSubtitle: "Or click to select up to {{count}} images",
      dropzoneFormats: "Supported formats: JPG, PNG, GIF, WEBP (max. 5MB each)",
      dropzoneActive: "Drop them here 🎉",
      dropzoneActiveSubtitle: "Preparing to process your images...",
      selectImagesBtn: "🖼️ Select Images",

      // Compression Controls
      compressionConfig: "⚙️ Compression Settings",
      compressionLevel: "🎯 Compression Level",
      quality: "Quality: {{percent}}%",
      qualityHigh: "High quality",
      qualityMedium: "Medium quality",
      qualityLow: "High compression",
      maxCompression: "0.1 (Maximum compression)",
      maxQuality: "1.0 (Maximum quality)",

      // Stats
      statsOriginal: "📊 Original",
      statsWebp: "📋 WebP",
      statsSavings: "💰 Savings",

      // Buttons
      startCompression: "🚀 Start Compression",
      downloadZip: "📦 Download ZIP",
      newProcess: "🔄 New Process",

      // Image Cards
      original: "📏 Original: {{size}}",
      estimating: "⏳ Estimating size...",
      webpEstimate: "🎯 WebP: {{size}}",
      savingsEstimate: "💰 Savings: ~{{percent}}%",
      processing: "📷 Processing image...",
      conversionCompleted: "✓ Conversion completed!",

      // Status Messages
      processingImages: "Compressing images... 🎨 Please wait.",
      processCompleted: "🎉 Process completed! All images have been converted to WebP.",

      // File count
      imagesSelected: "{{count}} image selected",
      imagesSelected_other: "{{count}} images selected",

      // Language Switcher
      language: "Language",
      spanish: "Español",
      english: "English"
    }
  },
  es: {
    translation: {
      // Header/Hero
      appTitle: "Conversor WebP",
      appSubtitle: "🚀 Convierte y optimiza tus imágenes al formato WebP de nueva generación. Reduce hasta 80% el tamaño sin perder calidad.",

      // Dropzone
      dropzoneTitle: "Arrastra tus imágenes aquí",
      dropzoneSubtitle: "O haz clic para seleccionar hasta {{count}} imágenes",
      dropzoneFormats: "Formatos soportados: JPG, PNG, GIF, WEBP (máx. 5MB c/u)",
      dropzoneActive: "Suéltalas aquí 🎉",
      dropzoneActiveSubtitle: "Preparando para procesar tus imágenes...",
      selectImagesBtn: "🖼️ Seleccionar Imágenes",

      // Compression Controls
      compressionConfig: "⚙️ Configuración de Compresión",
      compressionLevel: "🎯 Nivel de Compresión",
      quality: "Calidad: {{percent}}%",
      qualityHigh: "Alta calidad",
      qualityMedium: "Calidad media",
      qualityLow: "Alta compresión",
      maxCompression: "0.1 (Máxima compresión)",
      maxQuality: "1.0 (Máxima calidad)",

      // Stats
      statsOriginal: "📊 Original",
      statsWebp: "📋 WebP",
      statsSavings: "💰 Ahorro",

      // Buttons
      startCompression: "🚀 Iniciar Compresión",
      downloadZip: "📦 Descargar ZIP",
      newProcess: "🔄 Nuevo Proceso",

      // Image Cards
      original: "📏 Original: {{size}}",
      estimating: "⏳ Estimando tamaño...",
      webpEstimate: "🎯 WebP: {{size}}",
      savingsEstimate: "💰 Ahorro: ~{{percent}}%",
      processing: "📷 Procesando imagen...",
      conversionCompleted: "✓ ¡Conversión completada!",

      // Status Messages
      processingImages: "Comprimiendo imágenes... 🎨 Por favor espera.",
      processCompleted: "🎉 ¡Proceso completado! Todas las imágenes han sido convertidas a WebP.",

      // File count
      imagesSelected: "{{count}} imagen seleccionada",
      imagesSelected_other: "{{count}} imágenes seleccionadas",

      // Language Switcher
      language: "Idioma",
      spanish: "Español",
      english: "English"
    }
  }
};

i18n
  // Detectar idioma del navegador
  .use(LanguageDetector)
  // Integrar con React
  .use(initReactI18next)
  // Inicializar
  .init({
    resources,
    fallbackLng: 'en', // Idioma por defecto si no se detecta
    debug: false, // Cambiar a true para debugging

    // Configuración del detector de idioma
    detection: {
      order: ['navigator', 'localStorage', 'sessionStorage'],
      lookupLocalStorage: 'i18nextLng',
      lookupSessionStorage: 'i18nextLng',
      caches: ['localStorage', 'sessionStorage'],
    },

    interpolation: {
      escapeValue: false, // React ya escapa por defecto
    },

    // Configuración para plurales
    pluralSeparator: '_',
    contextSeparator: '_',
  });

export default i18n;