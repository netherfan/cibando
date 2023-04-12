import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RecipeService } from 'src/app/services/recipe.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { take } from 'rxjs';
import * as ClassicEditorBuild from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-create-recipe',
  templateUrl: './create-recipe.component.html',
  styleUrls: ['./create-recipe.component.scss']
})
export class CreateRecipeComponent {

  new_recipe : any;

  form = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    image: new FormControl('', Validators.required),
    published: new FormControl(false),
    difficulty: new FormControl(''),
  });

  Editor = ClassicEditorBuild;

  editorConfig = {
    toolbar: {
        items: [
            'bold',
            'italic',
            'link',
            'bulletedList',
            'numberedList',
            '|',
            'indent',
            'outdent',
            '|',
            'codeBlock',
            'imageUpload',
            'blockQuote',
            'insertTable',
            'undo',
            'redo',
        ]
    },
    image: {
        toolbar: [
            'imageStyle:full',
            'imageStyle:side',
            '|',
            'imageTextAlternative'
        ]
    },
    table: {
        contentToolbar: [
            'tableColumn',
            'tableRow',
            'mergeTableCells'
        ]
    },
    height: 300,
};


  constructor(
    private router: Router,
    private recipeService: RecipeService,
    private modalService: NgbModal
    ) {}

  onSubmit() {
    const recipe = this.form.value;
    this.recipeService
      .postRecipe(recipe)
      .pipe(take(1))
      .subscribe({
        next: (res) => {
          console.log(res);
          this.new_recipe = res;
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  // open(content: any){
  //   this.modalService.open(content, { ariaLabelledBy: 'modale servizi', size: 'lg', centered: true}).result.then((res) => {
  //     this.recipeService.postRecipe(this.new_recipe).pipe(take(1)).subscribe({
  //       next: (res) => {
  //       console.log("fatto");
  //       },
  //       error: (err)=>{
  //         console.log(err);
  //       }
  //     });
  //   }).catch((res) => {
  //     this.router.navigate(['ricette']);
  //   });
  // }

  onClose(){
    this.new_recipe = '';
    this.router.navigate(['ricette']);
  }

  onNewRecipe(){
    this.new_recipe = '';
        this.form.patchValue({
            title: '',
            description: '',
            image: '',
            difficulty: '',
            published: false,
        })
  }
}
