import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon'
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'cibando';
  ciao = 'red';

  images = [
    {id: 1,
      label: "Spaghetti al pomodoro"},
    {id: 2,
      label: "Tagliata di manzo"},
    {id: 3,
      label: "Tiramisù"}
  ];

  percorso = "../assets/images/carousel-";
  // percorsostd = "../assets/images/carousel-1.jpg"

  colore: 'green';
}
