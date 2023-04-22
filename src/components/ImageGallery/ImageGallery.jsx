import PropTypes from 'prop-types';

import ImageGalleryItem from 'components/ImageGalleryItem';
import Gallery from './ImageGallery.styled';

const ImageGallery = ({ images, showModal }) => {
  return (
    <Gallery>
      {images.map(image => {
        const { id, webformatURL, largeImageURL } = image;
        return (
          <ImageGalleryItem
            key={id}
            smallImage={webformatURL}
            largeImage={largeImageURL}
            showModal={showModal}
          ></ImageGalleryItem>
        );
      })}
    </Gallery>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ).isRequired,
  showModal: PropTypes.func.isRequired,
};

export default ImageGallery;
