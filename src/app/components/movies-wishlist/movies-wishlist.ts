import { Component, inject } from '@angular/core';
import { wishlistStore } from '../../stores/wishlistStore';
import { NgbRating } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-movies-wishlist',
  imports: [NgbRating, ],
  templateUrl: './movies-wishlist.html',
  styleUrl: './movies-wishlist.scss'
})
export class MoviesWishlist {

  wishlistStore = inject(wishlistStore);

  removeFromWishlist(id: number) {
    this.wishlistStore.remove(id);
  }

  toggleWishlist(movie: any) {
    this.wishlistStore.isInWishlist(movie.id)
      ? this.wishlistStore.remove(movie.id)
      : this.wishlistStore.add(movie);
  }
}
