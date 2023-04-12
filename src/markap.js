export function renderMarkapGallery(pictures) {
  const markup = pictures
    .map(
      picture => `
        <div class="photo-card">
        <a href=${picture.largeImageURL}>
          <img class="img" src=${picture.webformatURL} alt="${picture.tags}" loading="lazy" />
        </a>
          <div class="info">
            <p class="info-item">
              <b>
                Likes:
                <br />
                ${picture.likes}
              </b>
            </p>
            <p class="info-item">
              <b>Views: <br /> ${picture.views}</b>
            </p>
            <p class="info-item">
              <b>Comments: <br />${picture.comments}</b>
            </p>
            <p class="info-item">
              <b>Downloads: <br />${picture.downloads}</b>
            </p>
          </div>
        </div>
      `
    )
    .join('');

  return markup;
}
