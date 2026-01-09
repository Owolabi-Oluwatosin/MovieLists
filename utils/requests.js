const API_KEY = process.env.API_KEY;

const requests = {
  // 🌍 GLOBAL
  fetchTrending: {
    title: 'Trending',
    url: `/trending/all/week?api_key=${API_KEY}&language=en-US`
  },
  fetchTopRated: {
    title: 'Top Rated',
    url: `/movie/top_rated?api_key=${API_KEY}&language=en-US`
  },

  // 🎬 GENRES
  fetchActionMovies: {
    title: 'Action',
    url: `/discover/movie?api_key=${API_KEY}&with_genres=28`
  },
  fetchComedyMovies: {
    title: 'Comedy',
    url: `/discover/movie?api_key=${API_KEY}&with_genres=35`
  },
  fetchHorrorMovies: {
    title: 'Horror',
    url: `/discover/movie?api_key=${API_KEY}&with_genres=27`
  },
  fetchRomanceMovies: {
    title: 'Romance',
    url: `/discover/movie?api_key=${API_KEY}&with_genres=10749`
  },

  // 🌍 AFRICAN CINEMA (NEW)
  fetchAfricanCinema: {
    title: 'African Cinema',
    url: `/discover/movie?api_key=${API_KEY}&with_origin_country=NG|ZA|KE|GH|EG&sort_by=popularity.desc`
  },
  fetchNollywood: {
    title: 'Nollywood',
    url: `/discover/movie?api_key=${API_KEY}&with_origin_country=NG&sort_by=popularity.desc`
  },
  fetchSouthAfrica: {
    title: 'South African',
    url: `/discover/movie?api_key=${API_KEY}&with_origin_country=ZA&sort_by=popularity.desc`
  },
  fetchEastAfrica: {
    title: 'East African',
    url: `/discover/movie?api_key=${API_KEY}&with_origin_country=KE|UG|TZ&sort_by=popularity.desc`
  },

  // 📺 TV
  fetchTV: {
    title: 'TV Shows',
    url: `/discover/tv?api_key=${API_KEY}&language=en-US`
  }
};

export default requests;




// const API_KEY = process.env.API_KEY;

// export default {
//     fetchTrending: {
//         title: 'Trending',
//         url: `/trending/all/week?api_key=${API_KEY}&language=en-US`
//     },
//     fetchTopRated: {
//         title: 'Top Rated',
//         url: `/movie/top_rated?api_key=${API_KEY}&language=en-US`
//     },
//     fetchActionMovies: {
//         title: 'Action',
//         url: `/discover/movie?api_key=${API_KEY}&with_genres=28`
//     },
//     fetchComedyMovies: {
//         title: 'Comedy',
//         url: `/discover/movie?api_key=${API_KEY}&with_genres=35`
//     },
//     fetchHorrorMovies: {
//         title: 'Horror',
//         url: `/discover/movie?api_key=${API_KEY}&with_genres=27`
//     },
//     fetchRomanceMovies: {
//         title: 'Romance',
//         url: `/discover/movie?api_key=${API_KEY}&with_genres=10749`
//     },
//     fetchMystery: {
//         title: 'Mystery',
//         url: `/discover/movie?api_key=${API_KEY}&with_genres=9648`
//     },
//     fetchSciFi: {
//         title: 'Sci-Fi',
//         url: `/discover/movie?api_key=${API_KEY}&language=en-US`
//     },
//     fetchWestern: {
//         title: 'Western',
//         url: `/discover/movie?api_key=${API_KEY}&language=en-US`
//     },
//     fetchAnimation: {
//         title: 'Animation',
//         url: `/discover/movie?api_key=${API_KEY}&language=en-US`
//     },
//     fetchTV: {
//         title: 'TV Movies',
//         url: `/discover/movie?api_key=${API_KEY}&language=en-US`
//     }
// }