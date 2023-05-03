import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import { Backdrop, ModalWindow } from './Modal.styled';

export class Modal extends PureComponent {
  handleCloseModalByEsc = event => {
    if (event.code !== 'Escape') {
      return;
    }
    this.props.toggleModal(event);
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleCloseModalByEsc);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleCloseModalByEsc);
  }
  render() {
    const { imageURL, toggleModal } = this.props;
    return (
      <Backdrop onClick={toggleModal} data-backdrop>
        <ModalWindow>
          <img src={imageURL} alt={imageURL} />
        </ModalWindow>
      </Backdrop>
    );
  }
}

Modal.propTypes = {
  imageURL: PropTypes.string.isRequired,
  toggleModal: PropTypes.func.isRequired,
};
