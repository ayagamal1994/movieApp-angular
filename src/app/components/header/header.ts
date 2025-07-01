import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule, NgbAccordionModule],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {

}
