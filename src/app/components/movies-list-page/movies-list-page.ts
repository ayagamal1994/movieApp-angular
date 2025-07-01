import { Component, effect, inject } from '@angular/core';
import { moviesListStore } from '../../stores/moviesListStore';
import { wishlistStore } from '../../stores/wishlistStore';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-movies-list-page',
  imports: [FormsModule],
  templateUrl: './movies-list-page.html',
  styleUrl: './movies-list-page.scss'
})
export class MoviesListPage {

  //search
  router = inject(Router)
  searchTerm = "";
  search(){
    if(this.searchTerm.trim()){
      this.router.navigate(['/search'], { queryParams: { q: this.searchTerm.trim() } });
    }
  }
  //movies
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
