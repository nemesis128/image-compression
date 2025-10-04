import { useDropzone } from 'react-dropzone';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const MAX_SIZE = 50 * 1024 * 1024; // 50 MB

const ImageDropzone = ({ onFilesAccepted }) => {
  const { t } = useTranslation();
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
          <h4 className="mb-2" style={{ color: '#667eea' }}>{t('dropzoneActive')}</h4>
          <p className="text-muted mb-0">{t('dropzoneActiveSubtitle')}</p>
        </>
      ) : (
        <>
          <h4 className="mb-3" style={{ color: '#2d3748' }}>{t('dropzoneTitle')}</h4>
          <p className="text-muted mb-4">
            {t('dropzoneSubtitle', { count: 10 })}<br/>
            <small>{t('dropzoneFormats')}</small>
          </p>
          <Button className="btn-modern" onClick={open}>
            {t('selectImagesBtn')}
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
