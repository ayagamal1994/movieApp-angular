import { Component, inject } from '@angular/core';
import { movieDetailsStore } from '../../stores/movieDetailsStore';
import { wishlistStore } from '../../stores/wishlistStore';
import { ActivatedRoute } from '@angular/router';
import { NgbRating } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-movie-details-page',
  imports: [NgbRating],
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
    this.wishlistStore.isInWishlist(movie.id)
      ? this.wishlistStore.remove(movie.id)
      : this.wishlistStore.add(movie);
  }
}
