import { GalleryItem, GalleryItemImage } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({
  webformatURL,
  largeImageURL,
  onImageClick,
}) => {
  return (
    <GalleryItem>
      <GalleryItemImage
        src={webformatURL}
        data-large-url={largeImageURL}
        onClick={onImageClick}
      />
    </GalleryItem>
  );
};
