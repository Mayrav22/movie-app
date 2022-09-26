<script>
import { mapStores, mapState } from 'pinia'
import { useMoviesStore } from '../stores/movies'

export default {
  created() {
    this.moviesStore.getGenreMovies()
    this.moviesStore.getPopularMovies()
    this.moviesStore.getTrendMovies()
  },
  computed: {
    ...mapStores(useMoviesStore),
    ...mapState(useMoviesStore, ['genreMovies', 'popularMovies', 'trendMovies', 'movieDetail'])
  },
}
</script>

<template>
  <!--HEADER-->
  <header style="position: absolute; z-index: 1; width: 100%;">
    <div class="row" style="position: relative; top: 44px">
      <!--ICON-->
      <div class="col-3">
        <img src="/src/assets/imdb.webp" alt="logo" style="width: 35%;" class="ml-3 pl-3">
      </div>
      <!--NAVS-->
      <div class="col-6">
        <div class="row" style="text-shadow: 1px 1px black;">
          <!--MOVIES-->
          <div class="col-12 col-sm-3 flex justify-center d-sm-flex d-md-flex text-white px-1 font-medium">
            MOVIES
          </div>
          <!--CELEB-->
          <div class="col-3 d-none d-md-flex text-white px-1 font-medium">
            CELEBS & PHOTOS
          </div>
          <!--COMUNITY-->
          <div class="col-3 d-none d-md-flex text-white px-1 font-medium">
            COMMUNITY
          </div>
          <!--NEWS-->
          <div class="col-3 d-none d-sm-flex d-md-flex text-white px-1 font-medium">
            NEWS
          </div>
        </div>
      </div>
      <!--IMAGE-->
      <div class="col-3 flex justify-end">
        <img src="https://picsum.photos/70/70/?image=18" style="height: 40px" class="rounded-2 mr-5" alt="...">
      </div>
    </div>
  </header>
  <!--MAIN-->
  <main>
    <div class="row">
      <!-- Modal -->
      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg">
          <div class="modal-content hover:skew-y-6">
            <div class="modal-body p-0">
              <div class="container-fluid p-0">
                <div class="row">
                  <div class="col-5 pr-0 ">
                    <div>
                      <img :src="`https://image.tmdb.org/t/p/w500/${movieDetail.poster_path}`" alt="..." style="min-width: 330px">
                    </div>
                  </div>
                  <div class="col-7 pl-0">
                    <div class="row">
                      <div class="col-12 pt-3" style="padding-right: 45px;">
                        <div class="card px-4 py-3 shadow-lg shadow-black border-0" style="width: 110%; position: relative; right: 60px;">
                          <div class="row" style="padding-left: 12px;">
                            <div class="col-12">
                              <h1 class="text-2xl" style="text-transform: uppercase;">{{movieDetail.original_title}}</h1>
                            </div>
                            <div class="col-12 my-3"  style="display: flex; justify-content: space-between;">
                              <span class="text-primary" v-for="genre,i in movieDetail.genres" :key="genre.id">{{genre.name}}{{i+1 == movieDetail.genres.length ? '' : ', '}} </span>
                              <div>
                                <button class="btn-sm btn mr-3" style="background-color: #e7e7e7">PG-13</button>
                                <button class="btn-sm btn" style="background-color: #e7e7e7">2h 3m</button>
                              </div>
                            </div>
                            <div class="col-12 mb-1">
                              <div class="row">
                                <div class="col-4" style="display: grid;">
                                  ❤️ {{movieDetail.vote_average}}
                                  <small>Raiting</small>
                                </div>
                                <div class="col-4" style="display: grid;">
                                  👎 64
                                  <small>Score</small>
                                </div>
                                <div class="col-4" style="display: grid;">
                                  🏆 12
                                  <small>Awards</small>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="col-12" style="margin-left: 30px; margin-right: 24px; padding-right: 21px; width: 85%; margin-top: 15px;">
                        <p>
                          {{movieDetail.overview}}
                        </p>
                        <div class="text-primary my-2">
                          FULL MOVIE PROFILE ->
                        </div>
                      </div>
                      <div class="col-12" style="position: absolute; bottom: 0px; width: 62%;">
                        <div class="btn-group flex" role="group" aria-label="Basic example">
                          <button style="padding-top: 15px; padding-bottom: 15px;" class="rounded-0 btn btn-warning">Watch Trailer ></button>
                          <button style="padding-top: 15px; padding-bottom: 15px;" class="rounded-0 btn btn-dark">To Watchlist ⭐</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--CAROUSEL-->
      <div class="col-12">
        <div class="">
          <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
            <!--IMAGES-->
            <div class="carousel-inner">
              <div v-for="movie,i in trendMovies" class="carousel-item" :class="i == 1 ? 'active' : ''">
                <img :src="`https://image.tmdb.org/t/p/w1280/${movie.backdrop_path}`" class="d-block w-100" alt="...">
              </div>
            </div>
            <!--PREV-->
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <!--NEXT-->
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </div>
      <!--GRID MOVIES-->
      <div class="col-12 bg-gray-100">
        <div class="container card " style="position: relative; width: 76%; top: -60px; left: 0px; border-color: transparent;">
          <div class="container py-3">
            <div class="row">
              <!--HEADER GRID MOVIES-->
              <div class="col-12">
                <div class="row container">
                  <div class="col-5 col-sm-4 col-md-3 col-lg-2 flex justify-center items-center px-1 py-3 font-medium text-warning" style="border-bottom: 1px solid; border-bottom: 2px solid; margin-bottom: -1px;">IN THEATERS</div>
                  <div class="col-2 col-sm-0 col-md-3 col-lg-3 flex justify-center items-center px-1 py-3 font-medium d-none d-md-flex">COMING SOON</div>
                  <div class="col-2 col-sm-0 col-md-2 col-lg-1 flex justify-center items-center px-1 py-3 font-medium d-none d-md-flex">CHARTS</div>
                  <div class="col-2 col-sm-0 col-md-0 col-lg-1 flex justify-center items-center px-1 py-3 font-medium d-none d-lg-flex">TV&nbsp;SERIES</div>
                  <div class="col-2 col-sm-0 col-md-0 col-lg-2 flex justify-center items-center px-1 py-3 font-medium d-none d-lg-flex">TRAILERS</div>
                  <div class="col-4 col-sm-4 col-md-2 col-lg-1 flex justify-center items-center px-1 py-3 font-medium">MORE</div>
                  <div class="col-3 col-sm-4 col-md-2 col-lg-2 px-0 py-3">
                    <button type="button" class="btn btn-warning pl-1"> ⭐ 179</button>
                  </div>
                  <div class="col-12"><hr></div>
                </div>
              </div>
              <!--CONTROLS AND GRID MOVIES-->
              <div class="col-12 pt-4">
                <div class="row">
                  <!--CONTROLS-->
                  <div class="col-12">
                    <div class="row">
                      <!--ICONS LIST-GRID-->
                      <div class="order-0 order-sm-0 col-6 col-sm-3 col-md-2">
                        <i  style="font-size: 25px;" class="mr-3 bi bi-list"></i>
                        <i  style="font-size: 25px;" class="bi bi-grid-3x3-gap"></i>
                      </div>
                      <!--RANGE-->
                      <div class="order-2 order-sm-1 col-12 col-sm-6 col-md-6">
                        <label for="customRange1" class="form-label m-0">IMDb Rating</label>
                        <input type="range" style="width: 100%; height: 1px; background: #d3d3d3; position: relative; top: -5px;" id="customRange1" min="0" max="10" step="0.1">
                      </div>
                      <!--SEARCH-->
                      <div class="order-1 order-sm-2 col-6 col-sm-3 col-md-4">
                        <div class="input-group mb-3">
                          <input type="text" class="form-control" style="border: 0px solid transparent; border-bottom: 1px solid #b9b9b9; border-radius: 0px;">
                          <span class="input-group-text" id="basic-addon2" style="border: 0px; border-bottom: 1px solid #b9b9b9; border-radius: 0px; background: transparent;">
                            <i class="bi bi-search"></i>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!--GRID MOVIES-->
                  <div class="col-12 pt-4">
                    <div class="row">
                      <div v-for="movie,n in popularMovies" :key="n" class="col-12 col-sm-6 col-lg-4 mb-4 cursor-pointer hover:cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300">
                        <div class="card shadow-xl" data-bs-toggle="modal" data-bs-target="#exampleModal" @click="moviesStore.getMovieDetail(movie.id)">
                          <img :src="`https://image.tmdb.org/t/p/w300/${movie.poster_path}`" class="card-img-top" alt="...">
                          <div class="card-body">
                            <h4 style="text-transform: uppercase;">{{movie.title}}</h4>
                            <small class="text-warning" v-for="genre,i in genreMovies.filter((genre) => movie.genre_ids.includes(genre.id))" :key="i"> {{genre.name}}{{i+1 == movie.genre_ids.length ? '' : ', '}}  </small>
                            <h1 class="mt-2">❤️ {{movie.vote_average}}</h1>
                            <div style="position: absolute; right: 0px; bottom: 0px; width: 0; height: 0px; border: solid 30px; border-color: transparent yellow yellow transparent;">
                              <p style="text-shadow: 1px 1px grey; color: white; font-weight: 900; font-size: 25px; position: relative; right: -3px; bottom: 6px;">+</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--BOTON ...-->
      <div class="col-12 bg-gray-100 flex justify-center items-center pb-5">
        <button class="btn btn-pill btn-warning rounded-circle text-white font-black text-2xl">
          <p>...</p>
        </button>
      </div>
    </div>
  </main>
  <!--FOOTER-->
  <footer style="height: 142px;">
    <div class="row text-gray-400" style="position: relative; top: 44px">
      <div class="col-4" @click="f()">
        <h1 class="text-2xl font-bold ml-3 pl-3">IMDb</h1>
      </div>
      <div class="col-4">
        <div class="row">
          <div class="col-4 flex justify-end items-center">
            <i class="bi bi-twitter"></i>
          </div>
          <div class="col-4 flex justify-center items-center">
            <i class="bi bi-facebook"></i>
          </div>
          <div class="col-4 flex justify-start items-center">
            <i class="bi bi-instagram"></i>
          </div>
        </div>
      </div>
      <div class="col-4 flex justify-end">
        <p class="mr-3 pr-3">19990-2015 IMDB.COM INC</p>
      </div>
    </div>
  </footer>
</template>
