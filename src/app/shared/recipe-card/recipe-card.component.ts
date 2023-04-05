import { Component, EventEmitter, Input, Output, OnInit, OnDestroy } from '@angular/core';
import { take } from 'rxjs';
import { Recipe } from 'src/app/models/recipe.model';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.scss']
})
export class RecipeCardComponent implements OnInit, OnDestroy {
  @Input() pag: string;
  @Output() messaggio = new EventEmitter();

  recipes: Recipe[];
  ricetteTotali : number;
  page = 1;
  ricettePerPagina = 4;

  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
    this.prendiRicette();
  }

  ngOnDestroy(): void {
    console.log('utente uscito dal componente');
  }

  prendiRicette(){
    this.recipeService.getRecipes()
    .pipe(
      take(1)
    )
    .subscribe({
      next: (res) => {
        this.recipes = res;
        if(this.pag) {
          this.recipes = this.recipes.sort((a,b) => b._id - a._id).slice(0,4);
        }
        this.ricetteTotali = res.length;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  inviaTitolo(titolo: string){
    this.messaggio.emit(titolo);
  }

  paginate(event) {
    event.page = event.page + 1;
    this.page = event.page;
  }

}
