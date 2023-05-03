import { LoadMoreBtn } from './LoadMoreButton.styled';

export const LoadMoreButton = ({ onClick, page }) => {
  return (
    <LoadMoreBtn
      type="button"
      onClick={() => {
        onClick('cat', page);
      }}
    >
      Load more
    </LoadMoreBtn>
  );
};
