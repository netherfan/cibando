import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoggedInGuard } from 'src/app/logged-in.guard'; // da mettere in nuova ricetta

import { RecipesComponent } from './recipes.component';
import { RecipesListComponent } from './recipes-list/recipes-list.component';
import { DetailComponent } from './detail/detail.component';
import { CreateRecipeComponent } from '../create-recipe/create-recipe.component';

const routes: Routes = [
  {path: '', component: RecipesComponent, children: [
    {path: 'ricette', component: RecipesListComponent},
    {path: 'dettaglio/:title/:_id', component: DetailComponent}, // aggiungi nuova ricetta
    {path: '', pathMatch: 'full', component: RecipesListComponent}
  ]}
];

@NgModule ({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class RecipesRoutingModule {}
