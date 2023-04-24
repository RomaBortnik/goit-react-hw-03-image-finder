import { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import { Overlay, ModalImage } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeydown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeydown);
  }
  static propTypes = {
    image: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
    tags: PropTypes.string.isRequired,
  };

  handleKeydown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      this.props.onClose();
    }
  };

  render() {
    const { image, tags } = this.props;
    return createPortal(
      <Overlay onClick={this.handleBackdropClick}>
        <ModalImage className="Modal">
          <img src={image} alt={tags} />
        </ModalImage>
      </Overlay>,
      modalRoot
    );
  }
}

export default Modal;
