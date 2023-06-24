const allImagesContainer = document.getElementById('all-images-container');
const navList = document.getElementById('nav-list');
const navListContent = document.querySelectorAll('.list-content');

async function requestImages() {
  const response = await fetch('images.json');
  const data = await response.json();
  return data[0];
}

//events
document.addEventListener('DOMContentLoaded', loadImages('adult'));
navList.addEventListener('click', filterImages);

//events callback
function filterImages(event) {
  const clikedElement = event.target;

  if (clikedElement.classList.contains('list-content')) {
    allImagesContainer.innerHTML = '';

    activeState(clikedElement.textContent);

    loadImages(clikedElement.textContent.toLowerCase());
  }
}

function loadImages(category) {
  requestImages().then((imagesCategories) => {
    imagesCategories[category].forEach((imageCategory) => {
      const imageContainer = document.createElement('div');
      const image = document.createElement('img');

      imageContainer.className = 'image-container';

      image.setAttribute('src', imageCategory.src);

      imageContainer.appendChild(image);

      allImagesContainer.appendChild(imageContainer);
    });
  });
}

//function
function activeState(clickedElementTextContent) {
  navListContent.forEach((listContent) => {
    if (listContent.textContent === clickedElementTextContent) {
      listContent.classList.add('active');
    } else {
      listContent.classList.remove('active');
    }
  });
}
