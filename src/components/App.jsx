import { Component } from 'react';

import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import fetchImages from 'services/pixabay-api';
import Modal from './Modal';
import Loader from './Loader';

const INITIAL_STATE = {
  query: '',
  images: [],
  imagesPerPage: 0,
  totalImages: null,
  pageNumber: 1,
  showModal: false,
  currentImage: null,
  status: 'idle',
};

export class App extends Component {
  state = { ...INITIAL_STATE };

  async componentDidUpdate(prevProps, prevState) {
    const { query, pageNumber } = this.state;

    if (query !== prevState.query) {
      await this.setState({ status: 'pending' });
      fetchImages(query, pageNumber)
        .then(data =>
          data.hits.length === 0
            ? this.setState({ status: 'rejected' })
            : this.setState({
                ...INITIAL_STATE,
                query,
                images: data.hits,
                imagesPerPage: data.hits.length,
                totalImages: data.totalHits,
                status: 'resolved',
              })
        )
        .catch(() => this.setState({ status: 'rejected' }));
    }

    if (pageNumber !== prevState.pageNumber && query === prevState.query) {
      await this.setState({ status: 'pending' });
      await fetchImages(query, pageNumber)
        .then(data => {
          this.setState(prevState => {
            return {
              images: [...prevState.images, ...data.hits],
              imagesPerPage: data.hits.length,
              status: 'resolved',
            };
          });
        })
        .catch(() => this.setState({ status: 'rejected' }));
      setTimeout(() => {
        window.scrollBy({
          top: window.innerHeight - 158,
          behavior: 'smooth',
        });
      }, 100);
    }
  }

  getSearchQuery = query => {
    query.trim() === this.state.query.trim()
      ? this.setState({ status: 'rejected' })
      : this.setState({ ...INITIAL_STATE, query });
  };

  onLoadMoreClick = () => {
    this.setState(prevState => {
      return { pageNumber: prevState.pageNumber + 1 };
    });
  };

  toggleModal = image => {
    this.setState(prevState => {
      return {
        showModal: !prevState.showModal,
        currentImage: image,
      };
    });
  };

  render() {
    const { images, imagesPerPage, showModal, currentImage, status } =
      this.state;

    if (status === 'idle') {
      return <Searchbar onSubmit={this.getSearchQuery} />;
    }

    if (status === 'pending') {
      return (
        <>
          <Searchbar onSubmit={this.getSearchQuery} />
          <ImageGallery
            images={images}
            showModal={this.toggleModal}
            imagesPerPage={imagesPerPage}
            onClick={this.onLoadMoreClick}
          />
          <Loader />
        </>
      );
    }

    if (status === 'resolved') {
      return (
        <>
          <Searchbar onSubmit={this.getSearchQuery} />
          <ImageGallery
            images={images}
            showModal={this.toggleModal}
            imagesPerPage={imagesPerPage}
            onClick={this.onLoadMoreClick}
          />
          {showModal && (
            <Modal image={currentImage} onClose={this.toggleModal} />
          )}
        </>
      );
    }

    if (status === 'rejected') {
      return (
        <>
          <Searchbar onSubmit={this.getSearchQuery} />
          <p className="text">
            Sorry, there are no images matching your search query or you entered
            a previous query. Please try again.
          </p>
        </>
      );
    }
  }
}
