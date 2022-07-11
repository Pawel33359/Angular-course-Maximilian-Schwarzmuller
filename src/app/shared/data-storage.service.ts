import { AuthService } from './../auth/auth.service';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { exhaustMap, map, take, tap } from "rxjs";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";

@Injectable({
    providedIn: 'root'//instead of adding it in app.module
})
export class DataStorageService{
    constructor(private http: HttpClient, 
        private recipeService: RecipeService, 
        private authService: AuthService){}

    storeRecipes(){
        const recipes = this.recipeService.getRecipes();
        this.http.put(
            'https://ng-complete-guide-d1d72-default-rtdb.europe-west1.firebasedatabase.app/recipes.json',
            recipes
        ).subscribe(response=>{
            console.log(response)
        });
    }

    fetchRecipes(){
        return this.http
                .get<Recipe[]>(
                'https://ng-complete-guide-d1d72-default-rtdb.europe-west1.firebasedatabase.app/recipes.json',
        ).pipe(map(recipes=>{//in case recipe doesn't have ingredients
            return recipes.map(recipe=>{
                return {...recipe, ingredients: recipe.ingredients? recipe.ingredients : []}
            });
        }),
            tap(recipes=>{
                this.recipeService.setRecipes(recipes);
        }))
    };
}

