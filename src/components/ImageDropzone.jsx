// src/components/ImageDropzone.jsx
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import PropTypes from 'prop-types';

const MAX_SIZE = 5 * 1024 * 1024; // 5 MB

const ImageDropzone = ({ onFilesAccepted }) => {
  const onDrop = useCallback((acceptedFiles) => {
    // Limitar a un máximo de 10 archivos
    const files = acceptedFiles.slice(0, 10);
    onFilesAccepted(files);
  }, [onFilesAccepted]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: 'image/*',
    maxSize: MAX_SIZE,
    multiple: true,
    onDrop,
  });

  return (
    <div {...getRootProps()} className="p-4 border border-primary rounded text-center">
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Suelta las imágenes aquí...</p>
      ) : (
        <p>
          Arrastra y suelta hasta 10 imágenes (máx. 5 MB cada una) o haz clic para seleccionarlas.
        </p>
      )}
    </div>
  );
};

ImageDropzone.propTypes = {
  onFilesAccepted: PropTypes.func.isRequired,
};

export default ImageDropzone;
