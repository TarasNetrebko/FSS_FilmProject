// const API_KEY = "api_key=a63e37a24373c68ca9ae486468591e7b"
// export default function fetchPopular() {
//     return fetch(`https://developers.themoviedb.org/3/trending/get-trending?${API_KEY}`);
// }
// export default function fetchByWord() {
//     return fetch(`https://developers.themoviedb.org/3/search/search-movies?${API_KEY}`);
// }
// export default function fetchFilmInfo() {
//     return fetch(`https://developers.themoviedb.org/3/movies/get-movie-details?${API_KEY}`);
// }
import axios from 'axios';


export default function fetchFromBackend(url, callback) {
  axios
    .get(url)
    .then(async function (response) {
      // handle success
      callback(response);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function () {
      // always executed
    });
}