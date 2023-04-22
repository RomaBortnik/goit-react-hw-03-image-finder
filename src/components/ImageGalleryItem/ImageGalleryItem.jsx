import PropTypes from 'prop-types';

import { GalleryItem, GalleryImage } from './ImageGalleryItem.styled';

const ImageGalleryItem = ({ smallImage, largeImage, showModal }) => {
  return (
    <GalleryItem onClick={() => showModal(largeImage)}>
      <GalleryImage src={smallImage} alt="" loading="lazy" />
    </GalleryItem>
  );
};

ImageGalleryItem.propTypes = {
  smallImage: PropTypes.string.isRequired,
  largeImage: PropTypes.string.isRequired,
  showModal: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
