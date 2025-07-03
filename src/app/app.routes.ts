import { Routes } from '@angular/router';

export const routes: Routes = [
    {path: "", redirectTo:"moviesList", pathMatch:"full"},
    {path: "moviesList", loadComponent:()=>import("./components/movies-list-page/movies-list-page").then(m=>m.MoviesListPage)},
    {path: "movieDetails/:id", loadComponent:()=>import("./components/movie-details-page/movie-details-page").then(m=>m.MovieDetailsPage)},
    {path: "tv", loadComponent:()=>import("./components/tv-shows-page/tv-shows-page").then(m=>m.TvShowsPage)},
    {path: "tvDetails/:id", loadComponent:()=>import("./components/tv-shows-details-page/tv-shows-details-page").then(m=>m.TvShowsDetailsPage)},
    {path: "wishlist", loadComponent:()=>import("./components/movies-wishlist/movies-wishlist").then(m=>m.MoviesWishlist)},
    {path: "search", loadComponent:()=>import("./components/movies-search-results-page/movies-search-results-page").then(m=>m.MoviesSearchResultsPage)},
    {path: "**", loadComponent:()=>import("./components/not-found-page/not-found-page").then(m=>m.NotFoundPage)},
];
