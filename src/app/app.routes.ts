import { Routes } from '@angular/router';

export const routes: Routes = [
    {path: "", redirectTo:"moviesList", pathMatch:"full"},
    {path: "moviesList", loadComponent:()=>import("./components/movies-list-page/movies-list-page").then(m=>m.MoviesListPage)},
    {path: "wishlist", loadComponent:()=>import("./components/movies-wishlist/movies-wishlist").then(m=>m.MoviesWishlist)},
    {path: "search", loadComponent:()=>import("./components/movies-search-results-page/movies-search-results-page").then(m=>m.MoviesSearchResultsPage)},
    {path: "**", loadComponent:()=>import("./components/not-found-page/not-found-page").then(m=>m.NotFoundPage)},
];
