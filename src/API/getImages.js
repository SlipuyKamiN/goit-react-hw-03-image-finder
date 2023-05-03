import axios from 'axios';

const BASIC_URL = 'https://pixabay.com/api/';
const API_KEY = '36014719-07f7e4991b93ce8fa6f9441d0';

export const getImages = async (searchQuery, page) => {
  const currentImages = await axios
    .get(
      `${BASIC_URL}?q=${searchQuery}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
    )
    .catch(error => {
      return new Error(error);
    });
  return currentImages.data.hits;
};
