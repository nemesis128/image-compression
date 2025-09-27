import { useState, useCallback } from 'react';
import './App.css';
import { convertImageToWebP } from './utils/convertToWebP';
import ImageDropzone from './components/ImageDropzone';
import ImageGrid from './components/ImageGrid';
import CompressionControls from './components/CompressionControls';
import { Container, Row, Col } from 'react-bootstrap';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

function App() {
  const [files, setFiles] = useState([]);
  const [convertedImages, setConvertedImages] = useState([]);
  const [compressionQuality, setCompressionQuality] = useState(0.8);
  const [processing, setProcessing] = useState(false);
  const [processCompleted, setProcessCompleted] = useState(false);
  const [processingStatus, setProcessingStatus] = useState({});
  const [sizeEstimates, setSizeEstimates] = useState({});

  const handleFilesAccepted = useCallback((acceptedFiles) => {
    setFiles(acceptedFiles);
    setConvertedImages([]);
    setProcessCompleted(false);
    setProcessingStatus({});
    setSizeEstimates({});
  }, []);

  const handleRemoveFile = useCallback((fileName) => {
    setFiles(prev => prev.filter(file => file.name !== fileName));
    setSizeEstimates(prev => {
      const newEstimates = { ...prev };
      delete newEstimates[fileName];
      return newEstimates;
    });
  }, []);

  const handleEstimateReady = useCallback((fileName, estimatedSize) => {
    setSizeEstimates(prev => ({
      ...prev,
      [fileName]: estimatedSize
    }));
  }, []);

  const handleConvert = async () => {
    setProcessing(true);
    const results = [];

    // Procesar imágenes una por una para mostrar progreso individual
    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      // Actualizar estado: iniciando procesamiento
      setProcessingStatus(prev => ({
        ...prev,
        [file.name]: { isProcessing: true, progress: 0, isCompleted: false }
      }));

      try {
        // Simular progreso durante la conversión
        setProcessingStatus(prev => ({
          ...prev,
          [file.name]: { ...prev[file.name], progress: 50 }
        }));

        const blob = await convertImageToWebP(file, compressionQuality);

        // Completar progreso
        setProcessingStatus(prev => ({
          ...prev,
          [file.name]: { isProcessing: false, progress: 100, isCompleted: true }
        }));

        results.push({
          blob,
          converted: URL.createObjectURL(blob),
          name: file.name,
        });

        // Pequeña pausa para mejor UX
        await new Promise(resolve => setTimeout(resolve, 300));

      } catch (error) {
        console.error('Error al convertir:', error);
        setProcessingStatus(prev => ({
          ...prev,
          [file.name]: { isProcessing: false, progress: 0, isCompleted: false }
        }));
      }
    }

    setConvertedImages(results);
    setProcessing(false);
    setProcessCompleted(true);
  };

  const handleDownloadZip = async () => {
    const zip = new JSZip();
    convertedImages.forEach((img) => {
      const fileNameWithoutExtension = img.name.replace(/\.[^/.]+$/, "");
      zip.file(`${fileNameWithoutExtension}.webp`, img.blob);
    });
    const zipBlob = await zip.generateAsync({ type: 'blob' });
    saveAs(zipBlob, 'imagenes_comprimidas_webp.zip');
  };

  const handleRestart = () => {
    setFiles([]);
    setConvertedImages([]);
    setProcessCompleted(false);
    setProcessing(false);
    setProcessingStatus({});
    setSizeEstimates({});
  };

  // Calcular totales
  const totalOriginalSize = files.reduce((sum, file) => sum + file.size, 0);
  const totalEstimatedSize = Object.values(sizeEstimates).reduce((sum, size) => sum + size, 0);
  const canStartCompression = files.length > 0 && !processing;
  const hasEstimates = Object.keys(sizeEstimates).length === files.length && files.length > 0;

  return (
    <>
      {/* Hero Section */}
      <div className="hero-section">
        <Container>
          <div className="hero-content">
            <h1 className="hero-title">WebP Converter</h1>
            <p className="hero-subtitle">
              🚀 Convierte y optimiza tus imágenes al formato WebP de nueva generación.
              Reduce hasta 80% el tamaño sin perder calidad.
            </p>
          </div>
        </Container>
      </div>

      <Container className="py-4">

        <Row className="mb-5">
          <Col>
            <div className="animate-slide-up">
              <ImageDropzone onFilesAccepted={handleFilesAccepted} />
            </div>
          </Col>
        </Row>

        {files.length > 0 && (
          <div className="animate-slide-up">
            <CompressionControls
              compressionQuality={compressionQuality}
              onQualityChange={setCompressionQuality}
              onStartCompression={handleConvert}
              onDownloadZip={handleDownloadZip}
              onReset={handleRestart}
              filesCount={files.length}
              totalOriginalSize={totalOriginalSize}
              totalEstimatedSize={hasEstimates ? totalEstimatedSize : 0}
              isProcessing={processing}
              isCompleted={processCompleted}
              canStartCompression={canStartCompression}
            />

            <Row className="image-grid">
              <Col>
                <ImageGrid
                  files={files}
                  compressionQuality={compressionQuality}
                  processingStatus={processingStatus}
                  onRemoveFile={handleRemoveFile}
                  onEstimateReady={handleEstimateReady}
                />
              </Col>
            </Row>
          </div>
        )}
      </Container>
    </>
  );
}

export default App;