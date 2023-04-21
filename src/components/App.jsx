import { Component } from 'react';

import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import fetchImages from 'services/pixabay-api';
import Button from './Button';
import Modal from './Modal';
// import { TailSpin } from 'react-loader-spinner';

const INITIAL_STATE = {
  query: '',
  images: [],
  imagesPerPage: 0,
  totalImages: null,
  pageNumber: 1,
  showModal: false,
  currentImage: null,
};

export class App extends Component {
  state = { ...INITIAL_STATE };

  componentDidUpdate(prevProps, prevState) {
    const { query, pageNumber } = this.state;
    if (query !== prevState.query) {
      fetchImages(query, pageNumber)
        .then(data => {
          this.setState({
            query,
            images: data.hits,
            imagesPerPage: data.hits.length,
            totalImages: data.totalHits,
            pageNumber: 1,
          });
        })
        .catch(console.log);
    }
    if (pageNumber !== prevState.pageNumber && query === prevState.query) {
      fetchImages(query, pageNumber)
        .then(data => {
          this.setState(prevState => {
            return {
              images: [...prevState.images, ...data.hits],
              imagesPerPage: data.hits.length,
            };
          });
        })
        .catch(console.log);
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
    const { query, images, imagesPerPage, showModal, currentImage } =
      this.state;
    console.log(this.state);
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
        {showModal && (
          <Modal image={currentImage} onClose={this.toggleModal}></Modal>
        )}
        {/* {isLoading && (
          <TailSpin
            height="60"
            width="60"
            color="#000"
            ariaLabel="tail-spin-loading"
            radius="1"
            wrapperStyle={{}}
            wrapperClass="Overlay"
            visible={true}
          />
        )} */}
      </>
    );
  }
}
