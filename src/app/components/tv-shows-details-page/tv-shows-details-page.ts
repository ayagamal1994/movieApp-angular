import { Component, inject } from '@angular/core';
import { tvDetailsStore } from '../../stores/tvDetailsStore';
import { wishlistStore } from '../../stores/wishlistStore';
import { ActivatedRoute } from '@angular/router';
import { NgbRating } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tv-shows-details-page',
  imports: [NgbRating, CommonModule],
  templateUrl: './tv-shows-details-page.html',
  styleUrl: './tv-shows-details-page.scss'
})
export class TvShowsDetailsPage {
  route = inject(ActivatedRoute);
  tvDetailsStore = inject(tvDetailsStore);
  wishlistStore = inject(wishlistStore)

  constructor() {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.tvDetailsStore.loadMovieDetails(id);
    });
  }

  toggleWishlist(tv: any) {
  if (this.wishlistStore.isInWishlist(tv.id)) {
    this.wishlistStore.remove(tv.id);
  } else {
    this.wishlistStore.add({
      ...tv,
      media_type: 'tv'
    });
  }
}

  getVotePercent(tv: any): number {
    return Math.round((tv.vote_average || 0 ) * 10 );
  }
}
