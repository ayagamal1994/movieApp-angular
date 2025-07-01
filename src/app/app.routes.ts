import { Routes } from '@angular/router';

export const routes: Routes = [
    {path: "", redirectTo:"moviesList", pathMatch:"full"},
    {path: "moviesList", loadComponent:()=>import("./components/movies-list-page/movies-list-page").then(m=>m.MoviesListPage)},
    {path: "wishlist", loadComponent:()=>import("./components/movies-wishlist/movies-wishlist").then(m=>m.MoviesWishlist)},
    {path: "**", loadComponent:()=>import("./components/not-found-page/not-found-page").then(m=>m.NotFoundPage)},
];
