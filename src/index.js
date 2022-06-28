import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { ref } from "./ref";
import { searchImages } from "./fetch";


ref.form.addEventListener("submit", onSubmit);


 function onSubmit(event) {
    event.preventDefault();
  
     const {
    elements: { searchQuery}
  } = event.currentTarget;
    searchImages(searchQuery.value);




}


