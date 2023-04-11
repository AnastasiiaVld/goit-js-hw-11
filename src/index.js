import { PixabayApi } from './pixabay';
import Notiflix from 'notiflix';
import { renderMarkapGallery } from './markap';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const searcFormEl = document.querySelector('.js-search-form');
const galleryEl = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.js-load-more');

const pixabayApi = new PixabayApi();

const onSearchSubmit = async event => {
  event.preventDefault();
  const { target: formEl } = event;
  pixabayApi.guery = formEl.elements.searchQuery.value;
  pixabayApi.page = 1;

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
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try againfdfggd'
      );

      return;
    }

    if (data.totalHits === 1) {
      galleryEl.innerHTML = renderMarkapGallery(data.hits);
      loadMoreBtn.classList.add('is-hidden');
      Notiflix.Notify.info(
        "We're sorry, but you've reached the end of search results."
      );

      return;
    }

    galleryEl.innerHTML = renderMarkapGallery(data.hits);
    loadMoreBtn.classList.remove('is-hidden');
    Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
    const lightbox = new SimpleLightbox('.photo-card a');
    console.log(lightbox);
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
    loadMoreBtn.classList.remove('is-hidden');

    if (pixabayApi.page === data.totalHits) {
      loadMoreBtn.classList.add('is-hidden');
    }
    const lightbox = new SimpleLightbox('.photo-card a');
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
