import { Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

const CompressionControls = ({
  compressionQuality,
  onQualityChange,
  onStartCompression,
  onDownloadZip,
  onReset,
  filesCount,
  totalOriginalSize,
  totalEstimatedSize,
  isProcessing,
  isCompleted,
  canStartCompression
}) => {
  const { t } = useTranslation();

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const getTotalSavings = () => {
    if (totalOriginalSize && totalEstimatedSize) {
      return Math.round(((totalOriginalSize - totalEstimatedSize) / totalOriginalSize) * 100);
    }
    return 0;
  };

  const getQualityLabel = (quality) => {
    if (quality >= 0.8) return { text: t('qualityHigh'), variant: 'success' };
    if (quality >= 0.6) return { text: t('qualityMedium'), variant: 'warning' };
    return { text: t('qualityLow'), variant: 'danger' };
  };

  const qualityLabel = getQualityLabel(compressionQuality);

  return (
    <Card className="modern-card mb-5">
      <Card.Header>
        <h5 className="mb-0">
          {t('compressionConfig')}
        </h5>
      </Card.Header>
      <Card.Body>
        <Row className="align-items-center">
          <Col md={6}>
            <div className="quality-slider">
              <Form.Group controlId="compressionQuality">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <Form.Label className="mb-0 fw-bold">
                    {t('compressionLevel')}
                  </Form.Label>
                  <span className={`badge bg-${qualityLabel.variant} px-3 py-2`}>
                    {qualityLabel.text}
                  </span>
                </div>
                <Form.Range
                  min={0.1}
                  max={1}
                  step={0.1}
                  value={compressionQuality}
                  onChange={(e) => onQualityChange(parseFloat(e.target.value))}
                  disabled={isProcessing}
                  className="mb-3"
                />
                <div className="d-flex justify-content-between mb-2">
                  <small className="text-muted">{t('maxCompression')}</small>
                  <small className="text-muted">{t('maxQuality')}</small>
                </div>
                <div className="text-center">
                  <span className="fs-5 fw-bold" style={{ color: '#667eea' }}>
                    {t('quality', { percent: Math.round(compressionQuality * 100) })}
                  </span>
                </div>
              </Form.Group>
            </div>
          </Col>

          <Col md={6}>
            {filesCount > 0 && (
              <>
                {/* Stats Cards */}
                <Row className="mb-4 g-3">
                  <Col md={4}>
                    <div className="stats-card original">
                      <div className="fs-6 text-muted mb-1">{t('statsOriginal')}</div>
                      <div className="fw-bold">{formatFileSize(totalOriginalSize)}</div>
                    </div>
                  </Col>
                  <Col md={4}>
                    <div className="stats-card compressed">
                      <div className="fs-6 text-muted mb-1">{t('statsWebp')}</div>
                      <div className="fw-bold">
                        {totalEstimatedSize > 0 ? formatFileSize(totalEstimatedSize) : '--'}
                      </div>
                    </div>
                  </Col>
                  <Col md={4}>
                    <div className="stats-card savings">
                      <div className="fs-6 text-muted mb-1">{t('statsSavings')}</div>
                      <div className="fw-bold text-success">
                        {getTotalSavings() > 0 ? `~${getTotalSavings()}%` : '--'}
                      </div>
                    </div>
                  </Col>
                </Row>

                <div className="text-center">
                  <div className="mb-3">
                    <span className="badge" style={{ background: 'var(--primary-gradient)', fontSize: '0.9rem', padding: '0.5rem 1rem' }}>
                      {t('imagesSelected', { count: filesCount })}
                    </span>
                  </div>

                  <div className="d-grid gap-2 d-md-flex justify-content-md-center">
                    {!isCompleted && !isProcessing && (
                      <Button
                        className="btn-modern"
                        onClick={onStartCompression}
                        disabled={!canStartCompression}
                      >
                        {t('startCompression')}
                      </Button>
                    )}

                    {isCompleted && (
                      <>
                        <Button className="btn-success-modern" onClick={onDownloadZip}>
                          {t('downloadZip')}
                        </Button>
                        <Button className="btn-outline-modern" onClick={onReset}>
                          {t('newProcess')}
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </>
            )}
          </Col>
        </Row>

        {isProcessing && (
          <Alert variant="info" className="mt-4 mb-0" style={{
            background: 'linear-gradient(135deg, #ebf8ff 0%, #bee3f8 100%)',
            border: 'none',
            borderRadius: 'var(--border-radius)'
          }}>
            <div className="d-flex align-items-center">
              <div className="spinner-border spinner-border-sm me-3" role="status" style={{ color: '#667eea' }}>
                <span className="visually-hidden">Procesando...</span>
              </div>
              <span className="fw-bold">{t('processingImages')}</span>
            </div>
          </Alert>
        )}

        {isCompleted && (
          <Alert variant="success" className="mt-4 mb-0" style={{
            background: 'linear-gradient(135deg, #f0fff4 0%, #c6f6d5 100%)',
            border: 'none',
            borderRadius: 'var(--border-radius)'
          }}>
            <div className="text-center">
              <span className="fs-5">🎉</span>
              <strong className="ms-2">{t('processCompleted')}</strong>
            </div>
          </Alert>
        )}
      </Card.Body>
    </Card>
  );
};

CompressionControls.propTypes = {
  compressionQuality: PropTypes.number.isRequired,
  onQualityChange: PropTypes.func.isRequired,
  onStartCompression: PropTypes.func.isRequired,
  onDownloadZip: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
  filesCount: PropTypes.number.isRequired,
  totalOriginalSize: PropTypes.number,
  totalEstimatedSize: PropTypes.number,
  isProcessing: PropTypes.bool,
  isCompleted: PropTypes.bool,
  canStartCompression: PropTypes.bool,
};

CompressionControls.defaultProps = {
  totalOriginalSize: 0,
  totalEstimatedSize: 0,
  isProcessing: false,
  isCompleted: false,
  canStartCompression: false,
};

export default CompressionControls;