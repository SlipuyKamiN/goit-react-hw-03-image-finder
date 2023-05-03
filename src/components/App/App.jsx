import PropTypes from 'prop-types';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { AppWrapper } from './App.styled';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { LoadMoreButton } from 'components/LoadMoreButton/LoadMoreButton';
import { PureComponent } from 'react';
import { getImages } from 'API/getImages';
import { Loader } from 'components/Loader/Loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export class App extends PureComponent {
  state = {
    images: [],
    page: null,
    searchQuery: '',
    status: 'idle',
  };

  notification = (message = 'Something went wrong...') =>
    toast.error(message, {
      position: 'top-center',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
    });

  handleSearch = async searchQuery => {
    const page = 1;
    this.setState({ status: 'pending' });

    try {
      const images = await getImages(searchQuery, page);
      const status =
        images.length === 12
          ? 'resolved'
          : images.length < 12 && images.length !== 0
          ? 'idle'
          : 'rejected';

      if (images.length === 0) {
        this.notification(`There are no results for "${searchQuery}" request.`);
      }

      this.setState({
        images,
        searchQuery,
        page,
        status,
      });
    } catch (error) {
      console.log(error.message);
      this.notification();
      this.setState({
        status: 'rejected',
      });
    }
  };

  loadMore = async () => {
    let { searchQuery, page } = this.state;
    page += 1;
    this.setState({ status: 'pending' });

    try {
      const currentImages = await getImages(searchQuery, page);
      const isLastImages = currentImages.length < 12;
      this.setState(prevState => {
        const images = [...prevState.images, ...currentImages];
        return {
          images,
          page,
          status: isLastImages ? 'idle' : 'resolved',
        };
      });
    } catch (error) {
      this.notification();
      this.setState({
        status: 'rejected',
      });
    }
  };

  render() {
    const { images, status } = this.state;

    return (
      <AppWrapper>
        <Searchbar onSubmit={this.handleSearch} />
        <ImageGallery images={images} />
        {status === 'pending' && <Loader />}
        {status === 'resolved' && <LoadMoreButton onClick={this.loadMore} />}
        <ToastContainer />
      </AppWrapper>
    );
  }
}

LoadMoreButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};
