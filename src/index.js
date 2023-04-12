import { PixabayApi } from './pixabay';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { renderMarkapGallery } from './markap';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const searcFormEl = document.querySelector('.js-search-form');
const galleryEl = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.js-load-more');

const pixabayApi = new PixabayApi();
const lightbox = new SimpleLightbox('.photo-card a');

const onSearchSubmit = async event => {
  event.preventDefault();

  const { target: formEl } = event;
  pixabayApi.guery = formEl.elements.searchQuery.value;
  pixabayApi.page = 1;

  // console.log(pixabayApi.page);
  // pixabayApi
  //   .fetchPhotosByQuery()
  //   .then(response => {
  //     const { data } = response;

  try {
    const response = await pixabayApi.fetchPhotosByQuery();
    const { data } = response;

    if (data.total === 0) {
      galleryEl.innerHTML = '';
      loadMoreBtn.classList.add('is-hidden');
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try againfdfggd'
      );

      return;
    }

    galleryEl.innerHTML = '';
    galleryEl.insertAdjacentHTML('beforeend', renderMarkapGallery(data.hits));
    Notify.success(`Hooray! We found ${data.totalHits} images.`);

    if (data.total > 40) {
      loadMoreBtn.classList.remove('is-hidden');

      return;
    }

    lightbox.refresh();
  } catch (err) {
    console.log(err);
  }
};

const onLoadMoreBtnClick = async event => {
  pixabayApi.page += 1;

  try {
    const response = await pixabayApi.fetchPhotosByQuery();
    const { data } = response;

    galleryEl.insertAdjacentHTML('beforeend', renderMarkapGallery(data.hits));

    if (pixabayApi.page === data.total) {
      loadMoreBtn.classList.add('is-hidden');
      Notify.info("We're sorry, but you've reached the end of search results.");
    }

    // const lightbox = new SimpleLightbox('.photo-card a');

    lightbox.refresh();
  } catch (err) {
    console.log(err);
  }

  // pixabayApi
  //   .fetchPhotosByQuery()
  //   .then(response => {
  //     const { data } = response;

  //     galleryEl.insertAdjacentHTML('beforeend', renderMarkapGallery(data.hits));
  //     loadMoreBtn.classList.remove('is-hidden');

  //     if (pixabayApi.page === data.totalHits) {
  //       loadMoreBtn.classList.add('is-hidden');
  //     }
  //   })
  //   .catch(err => {
  //     console.log(err);
  //   });
};

searcFormEl.addEventListener('submit', onSearchSubmit);
loadMoreBtn.addEventListener('click', onLoadMoreBtnClick);
