const infoOfGal = [
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg",
    description: "Hokkaido Flower",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg",
    description: "Container Haulage Freight",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg",
    description: "Aerial Beach View",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg",
    description: "Flower Blooms",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg",
    description: "Alpine Mountains",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg",
    description: "Mountain Lake Sailing",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg",
    description: "Alpine Spring Meadows",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg",
    description: "Nature Landscape",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg",
    description: "Lighthouse Coast Sea",
  },
];

const wrapperOfGalleryEl = document.querySelector(".js-gallery");
const modalEl = document.querySelector(".js-lightbox");
const overlayBox = document.querySelector(".lightbox__overlay");
const closeModalBtnEL = document.querySelector(".lightbox__button");
const lightBoxEl = document.querySelector(".lightbox__content");

let currentIndex;

const arrayOriginal = infoOfGal.map((el) => el.original);
const listOfItemGalleryMarkUp = infoOfGal
  .map(({ preview, original, description }) => {
    return createItemOfGalleryMarkUp({ preview, original, description });
  })
  .join(" ");

wrapperOfGalleryEl.insertAdjacentHTML("beforeend", listOfItemGalleryMarkUp);

closeModalBtnEL.addEventListener("click", onCloseModalBtnELClick);
window.addEventListener("keydown", onWindowEvent);
wrapperOfGalleryEl.addEventListener("click", onWrapperOfGalleryElClick);
overlayBox.addEventListener("click", () => {
  onCloseModalBtnELClick();
  lightBoxEl.firstElementChild.src = " ";
});

function onWrapperOfGalleryElClick(event) {
  if (!event.target.classList.contains("gallery__image")) {
    return;
  }
  getStyleToLightBoxEl(event);
}

function createItemOfGalleryMarkUp({ preview, original, description }) {
  return `<li class="gallery__item">
  <a
    class="gallery__link"
    href="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546_1280.jpg"
  >
    <img
      class="gallery__image"
      src=${preview}
      data-source=${original}
      alt=${description}
    />
  </a>
</li>`;
}

function onCloseModalBtnELClick() {
  modalEl.classList.remove("is-open");
  modalEl.removeEventListener("click", onCloseModalBtnELClick);
}

function onWindowEvent(event) {
  currentIndex = arrayOriginal.indexOf(lightBoxEl.firstElementChild.src);
  if (event.key === "Escape") {
    onCloseModalBtnELClick();
  }
  changeImgByArrowLeft(event);
  changeImgByArrowRigth(event);
}

function changeImgByArrowRigth(event) {
  if (event.key === "ArrowRight") {
    ++currentIndex;
    if (currentIndex < arrayOriginal.length) {
      lightBoxEl.firstElementChild.src = arrayOriginal[currentIndex];
    } else {
      currentIndex -= arrayOriginal.length;
      lightBoxEl.firstElementChild.src = arrayOriginal[currentIndex];
    }
  }
}

function changeImgByArrowLeft(event) {
  if (event.key === "ArrowLeft") {
    --currentIndex;
    if (currentIndex < 0) {
      currentIndex += arrayOriginal.length;
      lightBoxEl.firstElementChild.src = arrayOriginal[currentIndex];
    } else {
      lightBoxEl.firstElementChild.src = arrayOriginal[currentIndex];
    }
  }
}

function getStyleToLightBoxEl(event) {
  modalEl.classList.add("is-open");
  event.preventDefault();
  lightBoxEl.firstElementChild.src = event.target.dataset.source;
  lightBoxEl.firstElementChild.alt = event.target.alt;
}
