import { Component, EventEmitter, Input, Output, OnInit, OnDestroy } from '@angular/core';
import { Observable, take, map } from 'rxjs';
import { Recipe } from 'src/app/models/recipe.model';
import { RecipeService } from 'src/app/services/recipe.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.scss']
})
export class RecipeCardComponent implements OnDestroy {

  @Input() pag: string;
  @Output() messaggio = new EventEmitter();

  // recipes: Recipe[];
  ricetteTotali : number;
  page = 1;
  ricettePerPagina = 4;

  ruolo: any;

  recipes$: Observable<Recipe[]> = this.recipeService.getRecipes().pipe( //pipe async, no subscribe perchè è lui stesso l'observable
    map(response => response.filter(ricetteFiltrate => ricetteFiltrate.difficulty <= 5)),//plus
    map(res => this.ricette = res)
  ); //il dollaro è una convenzione utilizzata per far capire che è una variabile asincrona
  // recipes$ = this.recipeService.getRecipes();

  ricette: Recipe[];

  constructor(private recipeService: RecipeService, private userService: UserService) {}

  // ngOnInit(): void {
  //   this.prendiRicette();
  // }
  // ngOnInit(): void {
  //   if(JSON.parse(localStorage.getItem('user')) != null){
  //     this.userService.getUserRole.subscribe({
  //       next: (res) => {
  //         this.ruolo = res;
  //       },
  //       error: (err) => {
  //         console.log(err)
  //       }
  //     })
  //   }
  //  }

  ngOnDestroy(): void {
    console.log('utente uscito dal componente');
  }

  // prendiRicette(){
  //   this.recipeService.getRecipes().pipe(take(1)).subscribe({
  //     next: (res) => {
  //       this.recipes = res;
  //       if(this.pag) {
  //         this.recipes = this.recipes.sort((a,b) => b._id - a._id).slice(0,4);
  //       }
  //       this.ricetteTotali = res.length;
  //     },
  //     error: (error) => {
  //       console.log(error);
  //     }
  //   })
  // }

  inviaTitolo(titolo: string){
    this.messaggio.emit(titolo);
  }

  paginate(event) {
    event.page = event.page + 1;
    this.page = event.page;
  }

}
