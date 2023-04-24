import { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import fetchImages from 'services/pixabay-api';
import Button from './Button';
import Modal from './Modal';
import Loader from './Loader';

const INITIAL_STATE = {
  query: '',
  images: [],
  imagesPerPage: 0,
  pageNumber: 1,
  showModal: false,
  currentImage: null,
  tags: '',
  isLoading: false,
  error: null,
};

export class App extends Component {
  state = { ...INITIAL_STATE };

  async componentDidUpdate(prevProps, prevState) {
    const { query, pageNumber } = this.state;
    if (prevState.query !== query || prevState.pageNumber !== pageNumber) {
      await this.getImages(query, pageNumber);
    }
    if (prevState.query === query && prevState.pageNumber !== pageNumber) {
      setTimeout(() => {
        window.scrollBy({
          top: window.innerHeight - 158,
          behavior: 'smooth',
        });
      }, 100);
    }
  }

  getImages = async (query, pageNumber) => {
    try {
      this.setState({ isLoading: true });
      const data = await fetchImages(query, pageNumber);
      data.hits.length === 0
        ? toast.error(
            'Sorry, there are no images matching your search query. Please try again.'
          )
        : this.setState(({ images }) => ({
            images: [...images, ...data.hits],
            imagesPerPage: data.hits.length,
          }));
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleSubmit = query => {
    query.trim() === this.state.query.trim()
      ? toast.error('Sorry, you entered a previous query. Please try again.')
      : this.setState({ ...INITIAL_STATE, query });
  };

  onLoadMoreClick = () => {
    this.setState(({ pageNumber }) => ({ pageNumber: pageNumber + 1 }));
  };

  onOpenModal = (currentImage, tags) => {
    this.setState({ showModal: true, currentImage, tags });
  };

  onCloseModal = () => {
    this.setState({ showModal: false, currentImage: '', tags: '' });
  };

  render() {
    const {
      images,
      imagesPerPage,
      showModal,
      currentImage,
      isLoading,
      tags,
      error,
    } = this.state;

    return (
      <>
        <Searchbar onSubmit={this.handleSubmit} />
        {isLoading && <Loader></Loader>}
        {images.length !== 0 && (
          <ImageGallery
            images={images}
            openModal={this.onOpenModal}
          ></ImageGallery>
        )}
        {imagesPerPage === 12 ? (
          <Button onClick={this.onLoadMoreClick} />
        ) : null}
        {showModal && (
          <Modal image={currentImage} onClose={this.onCloseModal} tags={tags} />
        )}
        {error && <p>{error}</p>}
        <ToastContainer autoClose={2000} theme="dark"></ToastContainer>
      </>
    );
  }
}
