import { ref } from './ref';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import axios from 'axios';
import  SimpleLightbox  from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";


let lightbox = new SimpleLightbox('.photo-card a', { captionsData: "alt", captionDelay: 250 });
let search = "";
axios.defaults.baseURL =  "https://pixabay.com/api/";
const KEY = "28330490-ea9a8c99c9db698ace415b720";
let total;
let page = 1;
const params = {
    image_type: "photo",
    orientation: "horizontal",
    safesearch: true,
    per_page:40,
    page,
    
};

ref.form.addEventListener("submit", onSubmit);
ref.scroll.addEventListener("click", onclick);



async function onSubmit(event) {
    event.preventDefault();
    page = 1;
    params.page = 1;
    ref.gallery.innerHTML = "";
    
    
    search = ref.form.elements.searchQuery.value;
    ref.scroll.classList.remove('is-hidden');
  
    ref.form.reset();
    await searchImages(search).then(madeMarkup);
    lightbox.refresh();

};

  async function onclick() {
      await searchImages(search).then(madeMarkup);
      lightbox.refresh();
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
      };
      if (page > total / 40) {
            ref.scroll.classList.add('is-hidden');
      };
      page = page + 1;
      params.page = page;
      
        
      const hits = response.data.hits;
      return hits;
      } catch (error) {
      console.log(error);
  } };


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
    return  ref.gallery.insertAdjacentHTML("beforeend", markup);
    

};










 


