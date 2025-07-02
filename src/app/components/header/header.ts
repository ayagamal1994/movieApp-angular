import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { wishlistStore } from '../../stores/wishlistStore';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule, NgbAccordionModule],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {
  wishlistStore = inject(wishlistStore)
}
