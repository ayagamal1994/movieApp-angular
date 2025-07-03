import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';
import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface MovieDetails {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  runtime: number;
  genres: { id: number, name: string }[];
  spoken_languages: {english_name: string, iso_639_1: string, name: string}[];
  production_companies: {id: number, logo_path: string}[];
  homepage: string
}

interface Review {
  id: number;
  author_details: {name: string, avatar_path: string};
  content: string;
}

interface Recommendation {
  id: number;
  title: string;
  poster_path: string;
  release_date: string
}

export const movieDetailsStore = signalStore(
  { providedIn: 'root' },

  withState<{ 
    movie: MovieDetails | null;
    reviews: Review[];
    recommendations: Recommendation[];

   }>({
    movie: null,
    reviews: [],
    recommendations: []
  }),

  withMethods((state) => {
    const http = inject(HttpClient);
    const apiKey = '2c2bef9d99b73c2a458dd29141f940d1';

    return {
      loadMovieDetails: (id: number) => {
        const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`;
        http.get<MovieDetails>(url).subscribe((res) => {
          patchState(state, { movie: res });
          console.log(res)
        });

        //reviews
        const reviewsUrl = `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${apiKey}`;
        http.get<any>(reviewsUrl).subscribe(res => {
          patchState(state, { reviews: res.results });
          console.log("rev", res.results)
      });

      //recommendations
      const recsUrl = `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${apiKey}`;
        http.get<any>(recsUrl).subscribe(res => {
          patchState(state, { recommendations: res.results });
          console.log("reco", res.results)
        });

      }


      
    };
  })
);
