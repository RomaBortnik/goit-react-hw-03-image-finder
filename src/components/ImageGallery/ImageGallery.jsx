import ImageGalleryItem from 'components/ImageGalleryItem';

const ImageGallery = ({ images, showModal }) => {
  return (
    <ul className="ImageGallery">
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
    </ul>
  );
};

export default ImageGallery;
