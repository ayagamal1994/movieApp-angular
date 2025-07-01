import { HttpClient } from "@angular/common/http";
import { inject } from "@angular/core";
import { patchState, signalStore, withMethods, withState } from "@ngrx/signals";

interface movie {
  id: number,
  poster_path: string,
  title: string,
  release_date: string

}

export const moviesListStore = signalStore(
  { providedIn: "root" },

  withState<{ movies: movie[] }>({
    movies: [],
  }),

  withMethods((state) => {
    const http = inject(HttpClient);

    return {
      loadPopularMovies: () => {
        const API_KEY = '2c2bef9d99b73c2a458dd29141f940d1';
        const url = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`;

        http.get<any>(url).subscribe((res) => {
          patchState(state, {
            movies: res.results,
          });

          console.log('Movies from TMDb:', res.results);
        });
      },

      searchMovies: (query: string) => {
        const API_KEY = '2c2bef9d99b73c2a458dd29141f940d1';
        const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`;
        http.get<any>(url).subscribe((res) => {
          patchState(state, { movies: res.results });
          console.log("gfg",res.results)
        });
        
      }
    };
  })
);
