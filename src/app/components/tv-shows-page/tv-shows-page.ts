import { Component, effect, inject } from '@angular/core';
import { tvShowStore } from '../../stores/tvShowsStore'; 
import { wishlistStore } from '../../stores/wishlistStore';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movies-list-page',
  imports: [FormsModule, NgbPaginationModule, CommonModule],
  templateUrl: './tv-shows-page.html',
  styleUrl: './tv-shows-page.scss'
})
export class TvShowsPage {
  //pagination
  page = 1;
  ngOnInit() {
  this.page = this.tvShowStore.currentPage(); 
  this.tvShowStore.loadNowPlaying(this.page); 
}

onPageChange(page: number) {
  this.page = page;
  this.tvShowStore.loadNowPlaying(page);
}
  router = inject(Router)
  tvShowStore = inject(tvShowStore);
  wishlistStore = inject(wishlistStore);


  constructor() {
    effect(() => {
      this.tvShowStore.loadPopularMovies();
    });
  }

  getVotePercent(tv: any): number {
    return Math.round((tv.vote_average || 0 ) * 10 );
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


}

