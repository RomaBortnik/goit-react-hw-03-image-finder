import PropTypes from 'prop-types';

import ImageGalleryItem from 'components/ImageGalleryItem';
import Gallery from './ImageGallery.styled';

const ImageGallery = ({ images, openModal }) => {
  return (
    <>
      <Gallery>
        {images.map(image => {
          const { id, webformatURL, largeImageURL, tags } = image;
          return (
            <ImageGalleryItem
              key={id}
              smallImage={webformatURL}
              largeImage={largeImageURL}
              tags={tags}
              openModal={openModal}
            ></ImageGalleryItem>
          );
        })}
      </Gallery>
    </>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ).isRequired,
  openModal: PropTypes.func.isRequired,
};

export default ImageGallery;
