import { Component, effect, inject } from '@angular/core';
import { moviesListStore } from '../../stores/moviesListStore';
import { wishlistStore } from '../../stores/wishlistStore';
import { languageStore } from '../../stores/languageStore';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule, DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-movies-list-page',
  imports: [FormsModule, NgbPaginationModule, CommonModule],
  templateUrl: './movies-list-page.html',
  styleUrl: './movies-list-page.scss'
})
export class MoviesListPage {
  moviesListStore = inject(moviesListStore);
  wishlistStore = inject(wishlistStore);
  langStore = inject(languageStore);
  document = inject(DOCUMENT);
  router = inject(Router);

  searchTerm = "";
  page = 1;

  languages = ['en', 'ar', 'fr', 'zh'];

  constructor() {
    effect(() => {
      const lang = this.langStore.getLanguage();
      const dir = lang === 'ar' ? 'rtl' : 'ltr';
      this.document.documentElement.dir = dir;
      this.moviesListStore.loadNowPlaying(this.page); // 🟢 يعيد التحميل عند تغيير اللغة
    });
  }

  ngOnInit() {
    this.page = this.moviesListStore.currentPage();
    this.moviesListStore.loadNowPlaying(this.page);
  }

  onLanguageChange(lang: string) {
    this.langStore.setLanguage(lang); // ✅ يغير اللغة و الاتجاه
  }

  onPageChange(page: number) {
    this.page = page;
    this.moviesListStore.loadNowPlaying(page);
  }

  search() {
    if (this.searchTerm.trim()) {
      this.router.navigate(['/search'], { queryParams: { q: this.searchTerm.trim() } });
    }
  }

  getVotePercent(movie: any): number {
    return Math.round((movie.vote_average || 0) * 10);
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
}
