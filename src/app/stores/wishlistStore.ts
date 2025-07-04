import { signalStore, withState, withMethods, patchState, withComputed } from '@ngrx/signals';
import { computed } from '@angular/core';

interface WishItem {
  id: number,
  poster_path: string,
  title: string,
  name: string,
  first_air_date: string,
  release_date: string,
  overview: string,
  vote_average: number,
  vote_count: number,
  media_type: "movie" | "tv"
}

const stored = localStorage.getItem('wishlist');
const initialList: WishItem[] = stored ? JSON.parse(stored) : [];

export const wishlistStore = signalStore(
  { providedIn: 'root' },

  withState<{ wishItems: WishItem[] }>({
    wishItems: initialList,
  }),

  withComputed((state) => ({

    count: computed(() => state.wishItems().length),
  })),

  withMethods((state) => ({
    add: (movie: WishItem) => {
      const exists = state.wishItems().some((m) => m.id === movie.id);
      if (!exists) {
        const updated = [...state.wishItems(), movie];
        patchState(state, { wishItems: updated });
        localStorage.setItem('wishlist', JSON.stringify(updated));
      }
    },

    remove: (id: number) => {
      const updated = state.wishItems().filter((m) => m.id !== id);
      patchState(state, { wishItems: updated });
      localStorage.setItem('wishlist', JSON.stringify(updated));
    },

    isInWishlist: (id: number): boolean => {
      return state.wishItems().some((m) => m.id === id);
    }
  }))
);
