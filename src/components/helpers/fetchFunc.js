import axios from 'axios';
const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '35922682-1b431e882647e6bfef105f4f6';
const OTHER_PARAMS = '&image_type=photo&orientation=horizontal&per_page=12';

export function getData(value, pageCount) {
  const response = axios.get(
    `${BASE_URL}?key=${API_KEY}&q=${value}&page=${pageCount}${OTHER_PARAMS}`
  );
  return response;
}
