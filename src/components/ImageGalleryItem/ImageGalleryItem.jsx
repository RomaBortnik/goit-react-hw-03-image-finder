import PropTypes from 'prop-types';

import { GalleryItem, GalleryImage } from './ImageGalleryItem.styled';

const ImageGalleryItem = ({ smallImage, largeImage, tags, openModal }) => {
  return (
    <GalleryItem onClick={() => openModal(largeImage, tags)}>
      <GalleryImage src={smallImage} alt={tags} loading="lazy" />
    </GalleryItem>
  );
};

ImageGalleryItem.propTypes = {
  smallImage: PropTypes.string.isRequired,
  largeImage: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
  tags: PropTypes.string.isRequired,
};

export default ImageGalleryItem;
