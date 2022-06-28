import axios from 'axios';


 axios.defaults.baseURL =  "https://pixabay.com/api/";
const KEY = "28330490-ea9a8c99c9db698ace415b720";


// https://pixabay.com/api/?key=28330490-ea9a8c99c9db698ace415b720&q=yellow+flowers&image_type=photo

    const params = {
    image_type: "photo",
    orientation: "horizontal",
    safesearch :true,
};
export function searchImages(searchQuery) {

 
    axios.get(`/?key=${KEY}&q=${searchQuery}`, { params })
        .then(function (response) {
            const { webformatURL, largeImageURL, tags, likes, views, comments, downloads, totalHits } = response;
            return response;
  })
  .catch(function (error) {
    console.log(error);
  })
  .then(function () {
    // выполняется всегда
  }); };
