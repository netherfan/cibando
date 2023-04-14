import { Injectable } from '@angular/core';
import { Recipe } from '../models/recipe.model';
import { RECIPES } from '../moks/recipes.mock';
import { Observable, of, ReplaySubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  apiBaseUrl = 'api/recipes';
  recipeName =  new ReplaySubject();

  constructor(private http: HttpClient) { }

  // getRecipes(): Observable<Recipe[]> {
  //   // return of (RECIPES);
  //   return this.http.get<Recipe[]>(`${this.apiBaseUrl}/`); //endpoint, alt 96 per backtick || return this.http.get<Recipe[]>(this.apiBaseUrl+ '/')
  // }

  getRecipes() {
    return this.http.get<Recipe[]>(`${this.apiBaseUrl}/`);
  }

  getRecipe(id: string): Observable<Recipe> { //observable per chiamate asincrone && prima id era number
    // const recipe = RECIPES.find(ricetta => ricetta._id === id);
    // return of (recipe);
    return this.http.get<Recipe>(`${this.apiBaseUrl}/${id}`);
  }

  postRecipe(new_recipe: any): Observable<any> {
    return this.http.post<any>(`${this.apiBaseUrl}/`, new_recipe);
  }

  findRecipe(text: string): Observable<any> {
    return this.http.get<any>(`${this.apiBaseUrl}/cerca/${text}`);
  }
}
