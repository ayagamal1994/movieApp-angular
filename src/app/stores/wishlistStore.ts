import { signalStore, withState, withMethods, patchState, withComputed } from '@ngrx/signals';
import { computed } from '@angular/core';

interface Movie {
  id: number,
  poster_path: string,
  title: string,
  release_date: string,
  overview: string,
  vote_average: number,
  vote_count: number
}

const stored = localStorage.getItem('wishlist');
const initialList: Movie[] = stored ? JSON.parse(stored) : [];

export const wishlistStore = signalStore(
  { providedIn: 'root' },

  withState<{ movies: Movie[] }>({
    movies: initialList,
  }),

  withComputed((state) => ({
    count: computed(() => state.movies().length),
  })),

  withMethods((state) => ({
    add: (movie: Movie) => {
      const exists = state.movies().some((m) => m.id === movie.id);
      if (!exists) {
        const updated = [...state.movies(), movie];
        patchState(state, { movies: updated });
        localStorage.setItem('wishlist', JSON.stringify(updated));
      }
    },

    remove: (id: number) => {
      const updated = state.movies().filter((m) => m.id !== id);
      patchState(state, { movies: updated });
      localStorage.setItem('wishlist', JSON.stringify(updated));
    },

    isInWishlist: (id: number): boolean => {
      return state.movies().some((m) => m.id === id);
    }
  }))
);
