import PropTypes from 'prop-types';
import { LoadMoreBtn } from './LoadMoreButton.styled';

export const LoadMoreButton = ({ onClick }) => {
  return (
    <LoadMoreBtn type="button" onClick={onClick}>
      Load more
    </LoadMoreBtn>
  );
};

LoadMoreButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};
