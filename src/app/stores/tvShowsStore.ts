import { HttpClient } from "@angular/common/http";
import { inject } from "@angular/core";
import {
  patchState,
  signalStore,
  withMethods,
  withState
} from "@ngrx/signals";

interface tvShow {
  id: number,
  poster_path: string,
  name: string,
  first_air_date: string,
  vote_average: number
}

export const tvShowStore = signalStore(
  { providedIn: "root" },

  withState<{
    tvShows: tvShow[],
    currentPage: number,
    totalPages: number
  }>({
    tvShows: [],
    currentPage: 1,
    totalPages: 1
  }),

  withMethods((state) => {
    const http = inject(HttpClient);
    const API_KEY = '2c2bef9d99b73c2a458dd29141f940d1';

    return {
      loadNowPlaying: (page = 1) => {
        const url = `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&page=${page}`;
        http.get<any>(url).subscribe((res) => {
          patchState(state, {
            tvShows: res.results,
            currentPage: res.page,
            totalPages: res.total_pages,
          });
        });
      },

      loadPopularMovies: () => {
        const url = `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}`;
        http.get<any>(url).subscribe((res) => {
          patchState(state, { tvShows: res.results });
          console.log("m", res.results)
        });
      },

      searchMovies: (query: string, page = 1) => {
        const API_KEY = '2c2bef9d99b73c2a458dd29141f940d1';
        const url = ` https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&query=${query}&page=${page}`;

        http.get<any>(url).subscribe((res) => {
          patchState(state, {
            tvShows: res.results,
            currentPage: res.page,
            totalPages: res.total_pages,
          });
        });
      },
    };
  })
);
