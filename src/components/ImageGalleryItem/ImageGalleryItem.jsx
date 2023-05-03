import PropTypes from 'prop-types';
import { GalleryItem, GalleryItemImage } from './ImageGalleryItem.styled';
import { Modal } from 'components/Modal/Modal';
import { PureComponent } from 'react';

export class ImageGalleryItem extends PureComponent {
  state = {
    modalOpen: false,
  };

  toggleModal = event => {
    const { dataset, nodeName } = event.target;

    if (
      event.code === 'Escape' ||
      (dataset.backdrop && nodeName !== 'IMG') ||
      dataset.openModal
    ) {
      return this.setState(prevState => ({ modalOpen: !prevState.modalOpen }));
    }

    if (nodeName === 'IMG') {
      return;
    }
  };

  render() {
    const { webformatURL, largeImageURL } = this.props;

    return (
      <>
        <GalleryItem>
          <GalleryItemImage
            src={webformatURL}
            data-open-modal
            loading="lazy"
            onClick={this.toggleModal}
          />
        </GalleryItem>
        {this.state.modalOpen && (
          <Modal imageURL={largeImageURL} toggleModal={this.toggleModal} />
        )}
      </>
    );
  }
}

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};
