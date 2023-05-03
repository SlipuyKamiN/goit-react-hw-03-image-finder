import { Gallery } from './ImageGallery.styled';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ images, onImageClick }) => {
  return (
    <Gallery>
      {images.map(img => (
        <ImageGalleryItem
          key={img.id}
          webformatURL={img.webformatURL}
          largeImageURL={img.largeImageURL}
          onImageClick={onImageClick}
        />
      ))}
    </Gallery>
  );
};
