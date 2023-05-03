import { LoaderWrapper } from './Loader.styled';
import { MagnifyingGlass } from 'react-loader-spinner';

export const Loader = () => (
  <LoaderWrapper>
    <MagnifyingGlass color="#3f51b5" />
  </LoaderWrapper>
);
