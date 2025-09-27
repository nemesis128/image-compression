import { useState, useEffect, useCallback } from 'react';
import { Card, Badge, ProgressBar, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

const ImagePreviewCard = ({
  file,
  compressionQuality,
  onEstimateReady,
  isProcessing,
  processingProgress,
  isCompleted,
  onRemove
}) => {
  const [preview, setPreview] = useState(null);
  const [originalSize, setOriginalSize] = useState(0);
  const [estimatedSize, setEstimatedSize] = useState(0);
  const [estimating, setEstimating] = useState(false);

  const estimateCompressedSize = useCallback(async () => {
    if (!preview) return;

    setEstimating(true);
    try {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = Math.min(img.width, 400); // Estimación con imagen más pequeña
        canvas.height = Math.min(img.height, 400);
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        canvas.toBlob((blob) => {
          if (blob) {
            // Estimar tamaño basado en la muestra
            const ratio = (img.width * img.height) / (canvas.width * canvas.height);
            const estimated = blob.size * ratio;
            setEstimatedSize(estimated);
            onEstimateReady && onEstimateReady(file.name, estimated);
          }
          setEstimating(false);
        }, 'image/webp', compressionQuality);
      };
      img.src = preview;
    } catch (error) {
      console.error('Error estimating size:', error);
      setEstimating(false);
    }
  }, [preview, compressionQuality, onEstimateReady, file.name]);

  useEffect(() => {
    // Crear preview de la imagen
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target.result);
    reader.readAsDataURL(file);
    setOriginalSize(file.size);
  }, [file]);

  useEffect(() => {
    // Estimar tamaño comprimido cuando cambie la calidad
    if (preview && compressionQuality) {
      estimateCompressedSize();
    }
  }, [preview, compressionQuality, estimateCompressedSize]);

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const getCompressionRatio = () => {
    if (originalSize && estimatedSize) {
      return Math.round(((originalSize - estimatedSize) / originalSize) * 100);
    }
    return 0;
  };

  const getCardClass = () => {
    let baseClass = 'image-card h-100';
    if (isCompleted) return `${baseClass} completed`;
    if (isProcessing) return `${baseClass} processing`;
    return baseClass;
  };

  return (
    <Card className={getCardClass()}>
      <div className="position-relative">
        {preview && (
          <Card.Img
            variant="top"
            src={preview}
            className="image-preview"
            alt={file.name}
          />
        )}
        {!isProcessing && !isCompleted && (
          <Button
            variant="outline-danger"
            size="sm"
            className="position-absolute top-0 end-0 m-2"
            onClick={() => onRemove(file.name)}
            style={{
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(10px)'
            }}
          >
            ×
          </Button>
        )}
        {isCompleted && (
          <div className="position-absolute top-0 end-0 m-2">
            <Badge style={{
              background: 'var(--success-gradient)',
              border: 'none',
              borderRadius: '20px',
              padding: '0.5rem 1rem',
              fontSize: '0.8rem'
            }}>
              ✓ Completado
            </Badge>
          </div>
        )}
      </div>

      <Card.Body className="d-flex flex-column">
        <Card.Title className="fs-6 text-truncate" title={file.name}>
          {file.name}
        </Card.Title>

        <div className="mb-2 p-2" style={{
          background: 'linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%)',
          borderRadius: '8px'
        }}>
          <small className="text-muted">
            📏 Original: <strong style={{ color: '#667eea' }}>{formatFileSize(originalSize)}</strong>
          </small>
        </div>

        {estimating ? (
          <div className="mb-2 p-2" style={{
            background: 'linear-gradient(135deg, #fef5e7 0%, #fed7aa 100%)',
            borderRadius: '8px'
          }}>
            <small className="text-muted animate-pulse">
              ⏳ Estimando tamaño...
            </small>
          </div>
        ) : estimatedSize > 0 ? (
          <div className="mb-2 p-2" style={{
            background: 'linear-gradient(135deg, #f0fff4 0%, #c6f6d5 100%)',
            borderRadius: '8px'
          }}>
            <small className="d-block">
              🎯 WebP: <strong style={{ color: '#48bb78' }}>{formatFileSize(estimatedSize)}</strong>
            </small>
            <small className="text-success d-block mt-1">
              💰 Ahorro: <strong>~{getCompressionRatio()}%</strong>
            </small>
          </div>
        ) : null}

        {isProcessing && (
          <div className="mt-auto">
            <small className="text-muted mb-2 d-block">
              📷 Procesando imagen...
            </small>
            <ProgressBar
              now={processingProgress}
              style={{ height: '8px', borderRadius: '10px' }}
              className="mb-2"
            />
          </div>
        )}

        {isCompleted && (
          <div className="mt-auto">
            <div className="w-100 text-center p-2" style={{
              background: 'var(--success-gradient)',
              borderRadius: '10px',
              color: 'white',
              fontSize: '0.9rem',
              fontWeight: 'bold'
            }}>
              ✓ ¡Conversión completada!
            </div>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

ImagePreviewCard.propTypes = {
  file: PropTypes.object.isRequired,
  compressionQuality: PropTypes.number.isRequired,
  onEstimateReady: PropTypes.func,
  isProcessing: PropTypes.bool,
  processingProgress: PropTypes.number,
  isCompleted: PropTypes.bool,
  onRemove: PropTypes.func.isRequired,
};

ImagePreviewCard.defaultProps = {
  isProcessing: false,
  processingProgress: 0,
  isCompleted: false,
};

export default ImagePreviewCard;