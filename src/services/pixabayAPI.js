import axios from 'axios';
const APIKEY = '28401377-e234095eda63cbe54e5a64269';
axios.defaults.baseURL = 'https://pixabay.com/api/';

export async function pixabayGetImages(searchQuery, searchPage) {
  const params = new URLSearchParams({
    key: APIKEY,
    q: searchQuery,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: searchPage,
    per_page: 12,
  });

  try {
    const {
      data: { hits, totalHits },
    } = await axios.get(`?${params}`);

    const imagesData = hits.map(({ id, webformatURL, largeImageURL }) => ({
      id,
      webformatURL,
      largeImageURL,
    }));
    return { imagesData, totalHits };
  } catch (err) {
    console.log(err);
  }
}
