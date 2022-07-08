import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { ref } from './ref';


axios.defaults.baseURL = "https://pixabay.com/api/";
const KEY = "28330490-ea9a8c99c9db698ace415b720";
export let total;


export const params = {
    image_type: "photo",
    orientation: "horizontal",
    safesearch: true,
    per_page: 40,
    page: 0,
};



export async function searchImages(searchQuery) {
  
  try {
      const response = await axios.get(`/?key=${KEY}&q=${searchQuery}`, { params });
      total = response.data.total;
    
        if (response.data.totalHits === 0) {
            Notify.failure("Sorry, there are no images matching your search query. Please try again.");
            return response;
        };
      
        if (params.page === 1) {
          Notify.success(`Hooray! We found ${total} images.`);
      };
     
      if (params.page >= Math.ceil(total / 40)) {
           
          ref.scroll.classList.add('is-hidden');
         Notify.success("We're sorry, but you've reached the end of search results.");
        };
    
      params.page = params.page+1;
      const hits = response.data.hits;

      return hits;

      } catch (error) {
      console.log(error);
  } };