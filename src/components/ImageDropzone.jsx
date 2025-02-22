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
    <div {...getRootProps()} className="p-4 border border-primary rounded text-center">
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Suelta las imágenes aquí...</p>
      ) : (
        <>
          <p>
            Arrastra y suelta hasta 10 imágenes (máx. 5 MB cada una)
          </p>
          <Button variant="outline-primary" onClick={open}>
            Seleccionar imágenes
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
