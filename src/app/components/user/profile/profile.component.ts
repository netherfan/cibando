import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, take } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{

  user: any;
  data: any;
  aggiornamento: any;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    if (JSON.parse(localStorage.getItem('user')) !== null) {
      this.user = JSON.parse(localStorage.getItem('user'));
      this.OnGetUser();
    }
  }

  OnGetUser(): void {
    this.userService.getUser(this.user.email).pipe(take(1)).subscribe({
      next: (res) => {
        this.user = res;
        this.data = moment(this.user.createdAt).locale('it').format('dddd DD MMMM YYYY');
        this.aggiornamento = moment(this.user.updatedAt).locale('it').format('dddd DD MMMM YYYY');
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
