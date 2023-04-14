import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginatorModule } from 'primeng/paginator';
import { ToastModule } from "primeng/toast";
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { RecipesRoutingModule } from "./recipes-routing.module";

import { RecipesComponent } from "./recipes.component";
import { RecipeCardComponent } from "src/app/shared/recipe-card/recipe-card.component";
import { RecipesListComponent } from "./recipes-list/recipes-list.component";
import { DetailComponent } from "./detail/detail.component";
import { CreateRecipeComponent } from "../create-recipe/create-recipe.component";


@NgModule({
  declarations: [
    RecipesComponent,
    RecipeCardComponent,
    RecipesListComponent,
    DetailComponent,
    CreateRecipeComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    PaginatorModule,
    ToastModule,
    CKEditorModule,
    RecipesRoutingModule
  ],
  exports: [
    RecipeCardComponent
  ]
})

export class RecipesModule {

}
