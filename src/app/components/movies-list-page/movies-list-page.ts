import { Component, effect, inject } from '@angular/core';
import { moviesListStore } from '../../stores/moviesListStore';
import { wishlistStore } from '../../stores/wishlistStore';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movies-list-page',
  imports: [FormsModule, NgbPaginationModule, CommonModule],
  templateUrl: './movies-list-page.html',
  styleUrl: './movies-list-page.scss'
})
export class MoviesListPage {
  //pagination
  page = 1;
  ngOnInit() {
  this.page = this.moviesListStore.currentPage(); 
  this.moviesListStore.loadNowPlaying(this.page); 
}

onPageChange(page: number) {
  this.page = page;
  this.moviesListStore.loadNowPlaying(page);
}
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

  getVotePercent(movie: any): number {
    return Math.round((movie.vote_average || 0 ) * 10 );
  }

  toggleWishlist(movie: any) {
    this.wishlistStore.isInWishlist(movie.id)
      ? this.wishlistStore.remove(movie.id)
      : this.wishlistStore.add(movie);
  }

}
