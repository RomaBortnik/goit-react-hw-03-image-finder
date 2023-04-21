const ImageGalleryItem = ({ smallImage, largeImage, showModal }) => {
  return (
    <li className="ImageGalleryItem" onClick={() => showModal(largeImage)}>
      <img
        className="ImageGalleryItem-image"
        src={smallImage}
        alt=""
        loading="lazy"
      />
    </li>
  );
};

export default ImageGalleryItem;
