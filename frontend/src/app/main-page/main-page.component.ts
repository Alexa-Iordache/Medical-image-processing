import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent {
  // panelOpenState = false;

  constructor(private router: Router) {}

  navigateTo(): void {
    this.router.navigate(['/upload']);
  }
}
