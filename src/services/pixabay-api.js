const PERSONAL_KEY = '34315527-c905e7d0ccc489dbd5469a006';
const BASE_URL = 'https://pixabay.com/api/';

function fetchImages(query, pageNumber) {
  return fetch(
    `${BASE_URL}?q=${query}&key=${PERSONAL_KEY}&image_type=photo&orientation=horizontal&page=${pageNumber}&per_page=12`
  ).then(response => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(new Error('There are no images'));
  });
}

export default fetchImages;
