import { signalStore, withState, withMethods, patchState, withComputed } from '@ngrx/signals';
import { computed } from '@angular/core';

interface Movie {
  id: number,
  poster_path: string,
  title: string,
  release_date: string
}

const stored = localStorage.getItem('wishlist');
const initialList: Movie[] = stored ? JSON.parse(stored) : [];

export const wishlistStore = signalStore(
  { providedIn: 'root' },

  withState<{ items: Movie[] }>({
    items: initialList,
  }),

  withComputed((state) => ({
    count: computed(() => state.items().length),
  })),

  withMethods((state) => ({
    add: (movie: Movie) => {
      const exists = state.items().some((m) => m.id === movie.id);
      if (!exists) {
        const updated = [...state.items(), movie];
        patchState(state, { items: updated });
        localStorage.setItem('wishlist', JSON.stringify(updated));
      }
    },

    remove: (id: number) => {
      const updated = state.items().filter((m) => m.id !== id);
      patchState(state, { items: updated });
      localStorage.setItem('wishlist', JSON.stringify(updated));
    },

    isInWishlist: (id: number): boolean => {
      return state.items().some((m) => m.id === id);
    }
  }))
);
