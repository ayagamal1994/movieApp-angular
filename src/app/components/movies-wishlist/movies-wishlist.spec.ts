import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviesWishlist } from './movies-wishlist';

describe('MoviesWishlist', () => {
  let component: MoviesWishlist;
  let fixture: ComponentFixture<MoviesWishlist>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoviesWishlist]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoviesWishlist);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
