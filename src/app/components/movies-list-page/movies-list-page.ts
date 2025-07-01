import { Component, effect, inject } from '@angular/core';
import { moviesListStore } from '../../stores/moviesListStore';
import { wishlistStore } from '../../stores/wishlistStore';
@Component({
  selector: 'app-movies-list-page',
  imports: [],
  templateUrl: './movies-list-page.html',
  styleUrl: './movies-list-page.scss'
})
export class MoviesListPage {

  moviesListStore = inject(moviesListStore);
  wishlistStore = inject(wishlistStore);

  constructor() {
    effect(() => {
      this.moviesListStore.loadPopularMovies();
    });
  }

  toggleWishlist(movie: any) {
    this.wishlistStore.isInWishlist(movie.id)
      ? this.wishlistStore.remove(movie.id)
      : this.wishlistStore.add(movie);
  }

}
