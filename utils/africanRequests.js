const API_KEY = process.env.API_KEY;

export const africanRequests = {
  africanFeatured: {
    title: "African Cinema",
    url: `/discover/movie?api_key=${API_KEY}&with_origin_country=NG|ZA|KE|GH|EG&sort_by=popularity.desc`
  },

  nigeria: {
    title: "Nollywood (Nigeria)",
    url: `/discover/movie?api_key=${API_KEY}&with_origin_country=NG&sort_by=popularity.desc`
  },

  southAfrica: {
    title: "South African Cinema",
    url: `/discover/movie?api_key=${API_KEY}&with_origin_country=ZA&sort_by=popularity.desc`
  },

  eastAfrica: {
    title: "East African Cinema",
    url: `/discover/movie?api_key=${API_KEY}&with_origin_country=KE|TZ|UG&sort_by=popularity.desc`
  },

  northAfrica: {
    title: "North African Cinema",
    url: `/discover/movie?api_key=${API_KEY}&with_origin_country=EG|MA|TN&sort_by=popularity.desc`
  }
};
