import axios from 'axios';

const PERSONAL_KEY = '34315527-c905e7d0ccc489dbd5469a006';
const BASE_URL = 'https://pixabay.com/api/';

const fetchImages = async (query, pageNumber) => {
  const response = await axios.get(
    `${BASE_URL}?q=${query}&key=${PERSONAL_KEY}&image_type=photo&orientation=horizontal&page=${pageNumber}&per_page=12`
  );
  return response.data;
};

export default fetchImages;
