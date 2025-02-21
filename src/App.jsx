import { useState } from 'react'
import './App.css'
import { convertImageToWebP } from './utils/convertToWebP';
import ImageDropzone from './components/ImageDropzone';
import { Container, Row, Col, Form, Button, ProgressBar } from 'react-bootstrap';

function App() {
  const [files, setFiles] = useState([]);
  const [convertedImages, setConvertedImages] = useState([]);
  const [compressionQuality, setCompressionQuality] = useState(0.8);
  const [processing, setProcessing] = useState(false);

  const handleFilesAccepted = (acceptedFiles) => {
    setFiles(acceptedFiles);
    setConvertedImages([]); // Reiniciar imágenes convertidas
  };

  const handleConvert = async () => {
    setProcessing(true);
    const results = await Promise.all(
      files.map(async (file) => {
        try {
          const blob = await convertImageToWebP(file, compressionQuality);
          return {
            original: URL.createObjectURL(file),
            converted: URL.createObjectURL(blob),
          };
        } catch (error) {
          console.error('Error al convertir:', error);
          return null;
        }
      })
    );
    setConvertedImages(results.filter((result) => result !== null));
    setProcessing(false);
  };

  return (
    <>
      <Container className="my-5">
      <Row>
        <Col>
          <h1 className="mb-4">Conversor y Compresor a WebP</h1>
          <p>
            Esta aplicación te permite subir imágenes, convertirlas a formato WebP y comprimir su tamaño.
            Selecciona el nivel de compresión deseado. Recuerda que una mayor compresión puede afectar la calidad.
          </p>
        </Col>
      </Row>
      <Row className="my-4">
        <Col>
          <ImageDropzone onFilesAccepted={handleFilesAccepted} />
        </Col>
      </Row>
      {files.length > 0 && (
        <Row className="my-4">
          <Col md={6}>
            <Form.Group controlId="compressionQuality">
              <Form.Label>
                Nivel de compresión (calidad WebP): {compressionQuality}
              </Form.Label>
              <Form.Range
                min={0.1}
                max={1}
                step={0.1}
                value={compressionQuality}
                onChange={(e) => setCompressionQuality(parseFloat(e.target.value))}
              />
              <small className="text-muted">
                A menor calidad, mayor compresión y mayor riesgo de pérdida en la calidad.
              </small>
            </Form.Group>
          </Col>
          <Col md={6} className="d-flex align-items-end">
            <Button variant="primary" onClick={handleConvert} disabled={processing}>
              {processing ? 'Procesando...' : 'Convertir a WebP'}
            </Button>
          </Col>
        </Row>
      )}
      {processing && (
        <Row className="my-3">
          <Col>
            <ProgressBar animated now={100} label="Procesando..." />
          </Col>
        </Row>
      )}
      {convertedImages.length > 0 && (
        <Row className="mt-4">
          <Col>
            <h2>Previsualización: Antes y Después</h2>
          </Col>
          {convertedImages.map((img, idx) => (
            <Col key={idx} md={6} className="my-3">
              <h5>Imagen {idx + 1}</h5>
              <Row>
                <Col>
                  <p>Original</p>
                  <img src={img.original} alt={`Original ${idx + 1}`} className="img-fluid" />
                </Col>
                <Col>
                  <p>Convertida</p>
                  <img src={img.converted} alt={`Convertida ${idx + 1}`} className="img-fluid" />
                </Col>
              </Row>
              <a href={img.converted} download={`imagen-${idx + 1}.webp`} className="btn btn-success mt-2">
                Descargar WebP
              </a>
            </Col>
          ))}
        </Row>
      )}
    </Container>
    </>
  )
}

export default App
