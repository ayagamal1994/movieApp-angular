import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviesListPage } from './movies-list-page';

describe('MoviesListPage', () => {
  let component: MoviesListPage;
  let fixture: ComponentFixture<MoviesListPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoviesListPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoviesListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
