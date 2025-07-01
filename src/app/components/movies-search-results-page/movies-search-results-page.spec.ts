import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviesSearchResultsPage } from './movies-search-results-page';

describe('MoviesSearchResultsPage', () => {
  let component: MoviesSearchResultsPage;
  let fixture: ComponentFixture<MoviesSearchResultsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoviesSearchResultsPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoviesSearchResultsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
