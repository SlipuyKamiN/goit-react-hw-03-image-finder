import { PureComponent } from 'react';
import { Backdrop, ModalWindow } from './Modal.styled';

export class Modal extends PureComponent {
  handleCloseModalByEsc = event => {
    if (event.code !== 'Escape') {
      return;
    }
    this.props.onImageClick(event);
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleCloseModalByEsc);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleCloseModalByEsc);
  }
  render() {
    const { imageURL, onImageClick } = this.props;
    return (
      <Backdrop>
        <ModalWindow>
          <img src={imageURL} alt={imageURL} onClick={onImageClick} />
        </ModalWindow>
      </Backdrop>
    );
  }
}
