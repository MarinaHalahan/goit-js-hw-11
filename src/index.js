import { ref } from './ref';
import { total, params, searchImages } from "./fetch";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import  SimpleLightbox  from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";


let lightbox = new SimpleLightbox('.photo-card a', { captionsData: "alt", captionDelay: 250 });
let search = "";

ref.form.addEventListener("submit", onSubmit);
ref.scroll.addEventListener("click", onLoadMoreClick);

async function onSubmit(event) {
    event.preventDefault();
    ref.scroll.classList.add('is-hidden');

  
    params.page = 1;


    ref.gallery.innerHTML = "";
    search = ref.form.elements.searchQuery.value;
    if (search === "") {
         Notify.failure("Sorry, there are no images matching your search query. Please try again.");
        return;
    }
    ref.form.reset();
   
    
    const asyncSearch = await searchImages(search);
    madeMarkup(asyncSearch);
    if(total>0){ref.scroll.classList.remove('is-hidden')};
  
    lightbox.refresh();
};

  async function onLoadMoreClick() {
       const asyncSearch = await searchImages(search);
    madeMarkup(asyncSearch);
    lightbox.refresh();
};


 function madeMarkup(data) { 
    
    if (total === 0) {
        return;
    }
     const markup = data.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads,}) =>
         `<div class="photo-card"><a href="${largeImageURL}">
                    <img class = "gallery_img" src="${webformatURL}" alt="${tags}" loading="lazy" /></a>
                    <div class="info">
                        <p class="info-item">
                        <b>Likes</b> ${likes}
                        </p>
                        <p class="info-item">
                        <b>Views</b> ${views}
                        </p>
                        <p class="info-item">
                        <b>Comments</b> ${comments}
                        </p>
                        <p class="info-item">
                        <b>Downloads</b> ${downloads}
                        </p>
                    </div>
                    </div>
                    `
        
    ).join("");
    return  ref.gallery.insertAdjacentHTML("beforeend", markup);
};










 


