import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RecipeService } from 'src/app/services/recipe.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { take } from 'rxjs';

@Component({
  selector: 'app-create-recipe',
  templateUrl: './create-recipe.component.html',
  styleUrls: ['./create-recipe.component.scss']
})
export class CreateRecipeComponent {

  new_recipe = {
    title: '',
    description : '',
    image: '',
    published: '',
    difficulty: ''
  };

  form = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    image: new FormControl('', Validators.required),
    published: new FormControl(''),
    difficulty: new FormControl(''),//false
  });

  constructor(
    private router: Router,
    private recipeService: RecipeService,
    private modalService: NgbModal
    ) {}

  onSubmit() {
    console.log(this.form.value);
    this.new_recipe = {
      title: this.form.value.title,
      description : this.form.value.description,
      image: this.form.value.image,
      published: this.form.value.published,
      difficulty: this.form.value.difficulty
    }
  }

  open(content: any){
    this.modalService.open(content, { ariaLabelledBy: 'modale servizi', size: 'lg', centered: true}).result.then((res) => {
      this.recipeService.postRecipe(this.new_recipe).pipe(take(1)).subscribe({
        next: (res) => {
        console.log("fatto");
        },
        error: (err)=>{
          console.log(err);
        }
      });
    }).catch((res) => {
      this.router.navigate(['ricette']);
    });
  }
}
