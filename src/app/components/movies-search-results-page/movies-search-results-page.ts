import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { moviesListStore } from '../../stores/moviesListStore';
import { wishlistStore } from '../../stores/wishlistStore';
import { FormsModule } from '@angular/forms';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movies-search-results-page',
  imports: [FormsModule, NgbPaginationModule, CommonModule],
  templateUrl: './movies-search-results-page.html',
  styleUrl: './movies-search-results-page.scss'
})
export class MoviesSearchResultsPage {
  route = inject(ActivatedRoute);
  store = inject(moviesListStore);
  wishlistStore = inject(wishlistStore);
  router = inject(Router);

  query = signal('');
  page = signal(1);
  searchTerm = '';

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const q = (params['q'] || '').toLowerCase();
      const p = parseInt(params['page'] || '1');
      this.query.set(q);
      this.page.set(p);
      this.searchTerm = q;
      this.store.searchMovies(q,p);
    });
  }

  onSearchPageChange(newPage: number) {
  const q = this.query();
  this.router.navigate(['/search'], { queryParams: { q, page: newPage } });
  }

  search() {
    const trimmed = this.searchTerm.trim();
    if (trimmed) {
      this.router.navigate(['/search'], { queryParams: { q: trimmed } });
    }
  }

  getVotePercent(movie: any): number {
    return Math.round((movie.vote_average || 0 ) * 10 );
  }

  toggleWishlist(movie: any) {
  if (this.wishlistStore.isInWishlist(movie.id)) {
    this.wishlistStore.remove(movie.id);
  } else {
    this.wishlistStore.add({
      ...movie,
      media_type:'movie'
    });
  }
}

}
