import { API_URL, API_TOKEN } from "../config/env";
import { defineStore } from "pinia";
import axios from 'axios'

axios.interceptors.request.use(function (config) {
  config.headers.Authorization = `Bearer ${API_TOKEN}`;
  return config;
}, function (error) {
  return Promise.reject(error);
});


export const useMoviesStore = defineStore("movies", {
  state: () => ({
    popularMovies: [],
    genreMovies: [],
    trendMovies: [],
    movieDetail: {},
    cast: {},
  }),
  actions: {
    async getPopularMovies() {
      let response = await axios.get(`${API_URL}/movie/popular`);
      this.setPopularMovies(response.data.results);
    },
    async getGenreMovies() {
      let response = await axios.get(`${API_URL}/genre/movie/list`);
      this.setGenreMovies(response.data.genres);
    },
    async getTrendMovies() {
      let response = await axios.get(`${API_URL}/movie/top_rated`)
      this.setTrendMovies(response.data.results);
    },
    async getMovieDetail(id) {
      console.log("LLEGO EL ID", id)
      let response = await axios.get(`${API_URL}/movie/${id}`)
      this.setMovieDetail(response.data);
    },
    async getCast(data) {
      let response = await axios.get(`${API_URL}/movie/${data.id}/credits`)
      this.setCast(response.data.cast);
    },
    setPopularMovies(popularMovies) {
      this.popularMovies = popularMovies;
    },
    setGenreMovies(genreMovies) {
      this.genreMovies = genreMovies;
    },
    setTrendMovies(trendMovies) {
      this.trendMovies = trendMovies;
    },
    setMovieDetail(movieDetail) {
      this.movieDetail = movieDetail;
    },
    setCast(cast) {
      this.cast = cast;
    },
  },
});
