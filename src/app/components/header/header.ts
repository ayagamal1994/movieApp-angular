import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { wishlistStore } from '../../stores/wishlistStore';
import { FormsModule } from '@angular/forms';
import { languageStore } from '../../stores/languageStore';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule, NgbAccordionModule, FormsModule],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {

  
  wishlistStore = inject(wishlistStore);

  langStore = inject(languageStore);

  languages = ['en', 'ar', 'fr', 'zh'];
  selectedLanguage = this.langStore.getLanguage();

  onLanguageChange(lang: string) {
    this.selectedLanguage = lang;
    this.langStore.setLanguage(lang);
  }
}
