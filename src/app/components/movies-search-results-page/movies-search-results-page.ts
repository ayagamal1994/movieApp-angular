import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { moviesListStore } from '../../stores/moviesListStore';
import { wishlistStore } from '../../stores/wishlistStore';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-movies-search-results-page',
  imports: [FormsModule],
  templateUrl: './movies-search-results-page.html',
  styleUrl: './movies-search-results-page.scss'
})
export class MoviesSearchResultsPage {
  route = inject(ActivatedRoute);
  store = inject(moviesListStore);
  wishlistStore = inject(wishlistStore);
  router = inject(Router);

  query = signal('');
  searchTerm = '';

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const q = (params['q'] || '').toLowerCase();
      this.query.set(q);
      this.searchTerm = q;
      this.store.searchMovies(q);
    });
  }

  search() {
    const trimmed = this.searchTerm.trim();
    if (trimmed) {
      this.router.navigate(['/search'], { queryParams: { q: trimmed } });
    }
  }

  toggleWishlist(movie: any) {
    this.wishlistStore.isInWishlist(movie.id)
      ? this.wishlistStore.remove(movie.id)
      : this.wishlistStore.add(movie);
  }
}
