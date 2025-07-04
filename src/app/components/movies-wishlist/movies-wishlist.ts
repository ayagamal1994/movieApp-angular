import { Component, inject } from '@angular/core';
import { wishlistStore } from '../../stores/wishlistStore';
import { NgbRating } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-movies-wishlist',
  imports: [NgbRating, RouterModule],
  templateUrl: './movies-wishlist.html',
  styleUrl: './movies-wishlist.scss'
})
export class MoviesWishlist {

  wishlistStore = inject(wishlistStore);

  removeFromWishlist(id: number) {
    this.wishlistStore.remove(id);
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


  moviesOnly() {
  return this.wishlistStore.wishItems().filter(i => i.media_type === 'movie');
}

tvOnly() {
  return this.wishlistStore.wishItems().filter(i => i.media_type === 'tv');
}
}
