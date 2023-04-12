import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomValidator } from '../../user/customValidator';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { take } from 'rxjs';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {

  form = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/)]),
    ripetiPassword: new FormControl('', Validators.required),
    accetto: new FormControl('', Validators.required),
  },
  [CustomValidator.MatchValidator('password', 'ripetiPassword')]
  );

  constructor(
    private userService : UserService,
    private router: Router,
    private modalService: NgbModal
  ) {}

  onSubmit() {
    // console.log(this.form.value);
    const user = {
      name: this.form.value.name,
      email: this.form.value.email,
      password: this.form.value.password
    }
    this.userService.datiUtente.next(user);
    this.userService.createUser(user).pipe(take(1)).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      }
    });

    this.router.navigate(['home']);
  }

  open(content: any, titolo?: string){
    let title = titolo;
    this.modalService.open(content, { ariaLabelledBy: 'modale servizi', size: 'lg', centered: true}).result.then((res) => {
      console.log('azione da eseguire' + titolo)
    }).catch((res) => {
      console.log('nessuna azione da eseguire')
    });
  }
}
