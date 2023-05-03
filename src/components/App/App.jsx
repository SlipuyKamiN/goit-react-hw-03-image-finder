import { Searchbar } from 'components/Searchbar/Searchbar';
import { AppWrapper } from './App.styled';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { LoadMoreButton } from 'components/LoadMoreButton/LoadMoreButton';
import { Modal } from 'components/Modal/Modal';
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
    largeImageURL: '',
    modalOpen: false,
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

  toggleModal = event => {
    if (event.code === 'Escape') {
      return this.setState({
        modalOpen: false,
        largeImageURL: '',
      });
    }

    if (event.currentTarget.nodeName === 'IMG') {
      const largeImageURL = event.currentTarget.dataset.largeUrl || '';
      return this.setState(prevState => ({
        modalOpen: !prevState.modalOpen,
        largeImageURL,
      }));
    }
  };

  render() {
    const { images, largeImageURL, modalOpen, status } = this.state;

    return (
      <AppWrapper>
        <Searchbar onSubmit={this.handleSearch} />
        <ImageGallery images={images} onImageClick={this.toggleModal} />
        {status === 'resolved' && <LoadMoreButton onClick={this.loadMore} />}
        {status === 'pending' && <Loader />}
        {modalOpen && (
          <Modal imageURL={largeImageURL} onImageClick={this.toggleModal} />
        )}
        <ToastContainer />
      </AppWrapper>
    );
  }
}
