import { Subject } from 'rxjs';
import { ShoppingListService } from './../shopping-list/shopping-list.service';
import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Recipe } from "./recipe.model";

@Injectable()

export class RecipeService{
    recipesChanged = new Subject<Recipe[]>();
    

    private recipes: Recipe[] = [
        new Recipe(
            'Pizza', 
            'This is a pizza', 
            'https://cdn.pixabay.com/photo/2016/03/05/21/45/pizza-1239077__340.jpg',
            [
                new Ingredient('Cheese', 2),
                new Ingredient('Ham', 2),
                new Ingredient('Salami', 4),
                new Ingredient('Jalapenos', 3),
                new Ingredient('Flour', 1)
            ])
    ];

    getRecipes(){
        return this.recipes.slice();
    }

    constructor(private slService: ShoppingListService){}

    toShoppingList(ingredients: Ingredient[]){
        // ingredients.forEach(ingredient => {
        //     this.slService.addIngredient(ingredient);
        // });
        this.slService.addIngredients(ingredients);
    }

    getRecipe(index: number){
        return this.recipes[index];
    }

    addRecipe(recipe: Recipe){
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe){
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number){
        this.recipes.splice(index,1);
        this.recipesChanged.next(this.recipes.slice());
    }
}