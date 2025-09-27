import { Row, Col } from 'react-bootstrap';
import ImagePreviewCard from './ImagePreviewCard';
import PropTypes from 'prop-types';

const ImageGrid = ({
  files,
  compressionQuality,
  processingStatus,
  onRemoveFile,
  onEstimateReady
}) => {
  return (
    <Row className="g-4">
      {files.map((file, index) => {
        const fileStatus = processingStatus[file.name] || {
          isProcessing: false,
          progress: 0,
          isCompleted: false
        };

        return (
          <Col key={`${file.name}-${index}`} xs={12} sm={6} md={4} lg={3}>
            <ImagePreviewCard
              file={file}
              compressionQuality={compressionQuality}
              isProcessing={fileStatus.isProcessing}
              processingProgress={fileStatus.progress}
              isCompleted={fileStatus.isCompleted}
              onRemove={onRemoveFile}
              onEstimateReady={onEstimateReady}
            />
          </Col>
        );
      })}
    </Row>
  );
};

ImageGrid.propTypes = {
  files: PropTypes.array.isRequired,
  compressionQuality: PropTypes.number.isRequired,
  processingStatus: PropTypes.object.isRequired,
  onRemoveFile: PropTypes.func.isRequired,
  onEstimateReady: PropTypes.func,
};

export default ImageGrid;