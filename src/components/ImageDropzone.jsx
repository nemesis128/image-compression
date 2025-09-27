import { useDropzone } from 'react-dropzone';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

const MAX_SIZE = 5 * 1024 * 1024; // 5 MB

const ImageDropzone = ({ onFilesAccepted }) => {
  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    accept: 'image/*',
    maxSize: MAX_SIZE,
    multiple: true,
    onDrop: (acceptedFiles) => {
      // Limitar a un máximo de 10 archivos
      const files = acceptedFiles.slice(0, 10);
      onFilesAccepted(files);
    },
    noClick: true, // Deshabilitamos el click por defecto para usar nuestro botón personalizado
  });

  return (
    <div
      {...getRootProps()}
      className={`modern-dropzone ${isDragActive ? 'drag-active' : ''}`}
    >
      <input {...getInputProps()} />
      <div className="dropzone-icon">
        📷
      </div>
      {isDragActive ? (
        <>
          <h4 className="mb-2" style={{ color: '#667eea' }}>Suéltalas aquí 🎉</h4>
          <p className="text-muted mb-0">Preparando para procesar tus imágenes...</p>
        </>
      ) : (
        <>
          <h4 className="mb-3" style={{ color: '#2d3748' }}>Arrastra tus imágenes aquí</h4>
          <p className="text-muted mb-4">
            O haz clic para seleccionar hasta <strong>10 imágenes</strong><br/>
            <small>Formatos soportados: JPG, PNG, GIF, WEBP (máx. 5MB c/u)</small>
          </p>
          <Button className="btn-modern" onClick={open}>
            🖼️ Seleccionar Imágenes
          </Button>
        </>
      )}
    </div>
  );
};

ImageDropzone.propTypes = {
  onFilesAccepted: PropTypes.func.isRequired,
};

export default ImageDropzone;
