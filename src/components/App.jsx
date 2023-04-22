import { Component } from 'react';

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
  totalImages: null,
  pageNumber: 1,
  showModal: false,
  isLoading: false,
  currentImage: null,
  status: 'idle',
};

export class App extends Component {
  state = { ...INITIAL_STATE };

  async componentDidUpdate(prevProps, prevState) {
    const { query, pageNumber } = this.state;

    if (query !== prevState.query) {
      this.setState({ status: 'pending' });
      const data = await fetchImages(query, pageNumber);
      return data.hits.length === 0
        ? this.setState({ status: 'rejected' })
        : this.setState({
            ...INITIAL_STATE,
            query,
            images: data.hits,
            imagesPerPage: data.hits.length,
            totalImages: data.totalHits,
            status: 'resolved',
          });
    }

    if (pageNumber !== prevState.pageNumber && query === prevState.query) {
      await this.setState({ isLoading: true });
      const data = await fetchImages(query, pageNumber);
      this.setState(prevState => {
        return {
          images: [...prevState.images, ...data.hits],
          imagesPerPage: data.hits.length,
          isLoading: false,
        };
      });
    }
  }

  getSearchQuery = query => {
    return this.setState({ ...INITIAL_STATE, query });
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
    const {
      query,
      images,
      imagesPerPage,
      showModal,
      currentImage,
      isLoading,
      status,
    } = this.state;

    if (status === 'idle') {
      return (
        <Searchbar
          searchQuery={query}
          onSubmit={this.getSearchQuery}
        ></Searchbar>
      );
    }

    if (status === 'pending') {
      return <Loader></Loader>;
    }

    if (status === 'resolved') {
      return (
        <>
          <Searchbar
            searchQuery={query}
            onSubmit={this.getSearchQuery}
          ></Searchbar>
          <ImageGallery
            images={images}
            showModal={this.toggleModal}
          ></ImageGallery>
          {imagesPerPage === 12 ? (
            <Button onClick={this.onLoadMoreClick}></Button>
          ) : null}
          {isLoading && <Loader></Loader>}
          {showModal && (
            <Modal image={currentImage} onClose={this.toggleModal}></Modal>
          )}
        </>
      );
    }

    if (status === 'rejected') {
      return (
        <>
          <Searchbar
            searchQuery={query}
            onSubmit={this.getSearchQuery}
          ></Searchbar>
          <p className="text">
            Sorry, there are no images matching your search query. Please try
            again.
          </p>
        </>
      );
    }
  }
}
