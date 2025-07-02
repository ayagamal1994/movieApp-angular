import { HttpClient } from "@angular/common/http";
import { inject } from "@angular/core";
import {
  patchState,
  signalStore,
  withMethods,
  withState
} from "@ngrx/signals";

interface movie {
  id: number;
  poster_path: string;
  title: string;
  release_date: string;
}

export const moviesListStore = signalStore(
  { providedIn: "root" },

  withState<{
    movies: movie[],
    currentPage: number,
    totalPages: number
  }>({
    movies: [],
    currentPage: 1,
    totalPages: 1
  }),

  withMethods((state) => {
    const http = inject(HttpClient);
    const API_KEY = '2c2bef9d99b73c2a458dd29141f940d1';

    return {
      loadNowPlaying: (page = 1) => {
        const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&page=${page}`;
        http.get<any>(url).subscribe((res) => {
          patchState(state, {
            movies: res.results,
            currentPage: res.page,
            totalPages: res.total_pages,
          });
        });
      },

      loadPopularMovies: () => {
        const url = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`;
        http.get<any>(url).subscribe((res) => {
          patchState(state, { movies: res.results });
          console.log("m", res.results)
        });
      },

      searchMovies: (query: string, page = 1) => {
        const API_KEY = '2c2bef9d99b73c2a458dd29141f940d1';
        const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}&page=${page}`;

        http.get<any>(url).subscribe((res) => {
          patchState(state, {
            movies: res.results,
            currentPage: res.page,
            totalPages: res.total_pages,
          });
        });
      },
    };
  })
);
