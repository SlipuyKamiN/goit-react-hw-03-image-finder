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

  async componentDidUpdate(_, prevState) {
    let { searchQuery, page, status } = this.state;

    if (prevState.page !== page || prevState.searchQuery !== searchQuery) {
      try {
        this.setState({ status: 'pending' });
        const newImages = await getImages(searchQuery, page);

        switch (newImages.length) {
          case 0:
            this.notification(
              `There are no results for "${searchQuery}" request.`
            );
            status = 'rejected';
            break;
          case 12:
            status = 'resolved';
            break;
          default:
            status = 'idle';
            break;
        }

        this.setState(prevState => {
          const images = [...prevState.images, ...newImages];
          return {
            images,
            status,
          };
        });
      } catch (error) {
        console.log(error.message);
        this.notification();
        this.setState({
          status: 'rejected',
        });
      }
    }
  }

  handleFormSubmit = searchQuery => {
    if (searchQuery === this.state.searchQuery) {
      this.notification(`You are already looking at "${searchQuery}"`);

      return;
    }

    this.setState({ searchQuery, page: 1, images: [] });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { images, status } = this.state;

    return (
      <AppWrapper>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery images={images} />
        {status === 'pending' && <Loader />}
        {status === 'resolved' && (
          <LoadMoreButton onClick={this.handleLoadMore} />
        )}
        <ToastContainer />
      </AppWrapper>
    );
  }
}

LoadMoreButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};
