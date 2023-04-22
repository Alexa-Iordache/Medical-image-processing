import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent  {
  // panelOpenState = false;
  ImagePath = '';

  constructor(private router: Router) {
    this.ImagePath = '';
  }

  navigateTo(): void {
    this.router.navigate(['/upload']);
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    console.log(file.name);
    this.ImagePath = file.name;
  }

  resetButton() {
    this.ImagePath = '';
    console.log('reset button was clicked');
    console.log(this.ImagePath);
  }
}
