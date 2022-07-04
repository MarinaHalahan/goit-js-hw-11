import  SimpleLightbox  from 'simplelightbox';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import axios from 'axios';

import "simplelightbox/dist/simple-lightbox.min.css";


  const ref = {
    input: document.querySelector('[name="searchQuery"]'),
    form: document.querySelector('#search-form'),
    gallery: document.querySelector('.gallery'),
      scroll: document.querySelector('.scroll-div'),
    
    
};

let options = {
    rootMargin: '200px',
    threshold: 1.0
};
ref.scroll.textContent = "nkjkjk";

let target = document.querySelector('.scroll-div');
let callback = function(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            searchImages(searchQuery.value)
                .then(madeMarkup)
        }
    })
};
let observer = new IntersectionObserver(callback, options);

observer.observe(target);

ref.form.addEventListener("submit", onSubmit);


   
let lightbox = new SimpleLightbox('.gallery a', { captionsData: "alt", captionDelay:250});


axios.defaults.baseURL =  "https://pixabay.com/api/";
const KEY = "28330490-ea9a8c99c9db698ace415b720";
let page = 1;
let total;

const params = {
    image_type: "photo",
    orientation: "horizontal",
    safesearch: true,
    per_page:40,
    page,
   
};
 async function searchImages(searchQuery) {

  try {
      const response = await axios.get(`/?key=${KEY}&q=${searchQuery}`, { params });
      total = response.data.total;
      
        if (response.data.totalHits === 0) {
            Notify.failure("Sorry, there are no images matching your search query. Please try again.");
            return response;
      };
      
     
      if (page === 1) {
          Notify.success(`Hooray! We found ${total} images.`);
           const hits = response.data.hits;
      return hits;
      }
       
     

  } catch (error) {
      console.log(error);
  } };


  function onSubmit(event) {
    event.preventDefault();
    page = 1;
     const {
    elements: { searchQuery}
  } = event.currentTarget;
      searchImages(searchQuery.value)
    .then(madeMarkup)
        
    
     

     

}


function madeMarkup(data) { 
    if (total === 0) {
        return;
    }
    
    const markup = data.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads,}) =>
         `<div class="photo-card"><a href="${largeImageURL}">
                    <img src="${webformatURL}" alt="${tags}" loading="lazy" /></a>
                    <div class="info">
                        <p class="info-item">
                        <b>Likes</b>${likes}
                        </p>
                        <p class="info-item">
                        <b>Views</b>${views}
                        </p>
                        <p class="info-item">
                        <b>Comments</b>${comments}
                        </p>
                        <p class="info-item">
                        <b>Downloads</b>${downloads}
                        </p>
                    </div>
                    </div>
                    `
        
    ).join("");
return ref.gallery.insertAdjacentHTML("afterbegin", markup)

};


