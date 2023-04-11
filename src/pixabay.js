import axios from 'axios';

export class PixabayApi {
  static BASE_URL = 'https://pixabay.com/api';
  static API_KEY = '35295302-5511e94bc4906b81bb635556d';

  constructor() {
    this.guery = null;
    this.page = 1;
  }

  fetchPhotosByQuery() {
    const searchParams = {
      params: {
        key: PixabayApi.API_KEY,
        q: this.guery,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: this.page,
        per_page: 40,
      },
    };

    return axios.get(`${PixabayApi.BASE_URL}/`, searchParams);

    // return fetch(`${PixabayApi.BASE_URL}/?${searchParams}`).then(response => {
    //   if (!response.ok) {
    //     throw new Error(response.status);
    //   }

    //   return response.json();
    // });
  }
}
