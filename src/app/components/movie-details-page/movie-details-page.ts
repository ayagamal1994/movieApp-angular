import { Component, inject } from '@angular/core';
import { movieDetailsStore } from '../../stores/movieDetailsStore';
import { wishlistStore } from '../../stores/wishlistStore';
import { ActivatedRoute } from '@angular/router';
import { NgbRating } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movie-details-page',
  imports: [NgbRating, CommonModule],
  templateUrl: './movie-details-page.html',
  styleUrl: './movie-details-page.scss'
})
export class MovieDetailsPage {
  route = inject(ActivatedRoute);
  movieDetailsStore = inject(movieDetailsStore);
  wishlistStore = inject(wishlistStore)

  constructor() {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.movieDetailsStore.loadMovieDetails(id);
    });
  }

  toggleWishlist(movie: any) {
  if (this.wishlistStore.isInWishlist(movie.id)) {
    this.wishlistStore.remove(movie.id);
  } else {
    this.wishlistStore.add({
      ...movie,
      media_type: 'movie'
    });
  }
}

  getVotePercent(movie: any): number {
    return Math.round((movie.vote_average || 0 ) * 10 );
  }

  
}
