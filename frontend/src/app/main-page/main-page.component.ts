import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RpcService } from '../services/rpc.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent {
  ImagePath = '';
  segmentationProcessDone = false;
  imagepath = '';

  constructor(
    private router: Router,
    private rpcService: RpcService,
    private http: HttpClient,
    private el: ElementRef
  ) {
    // this.ImagePath = '';
    // this.imagepath = '';
  }

  // navigateTo(): void {
  //   this.router.navigate(['/upload']);
  // }

  onFileSelected(event: any) {
    event.stopPropagation();
    const file: File = event.target.files[0];
    console.log(file.name);
    this.ImagePath = file.name;
  }

  resetButton() {
    this.ImagePath = '';
    console.log('reset button was clicked');
    console.log(this.ImagePath);
  }

  uploadImage(): void {
    console.log(this.ImagePath);
  }

  buttonExit(): void {
    console.log('s a apasat butonul de exit');
    let params = {
      username: 'admin',
    };

    this.rpcService.callRPC(
      'segmentation.imageSegmentation',
      params,
      (err: any, res: any) => {
        console.log('a mers segmentarea');
        if (err || res.error) {
          console.log('nu s-a putut realiza segmentarea');
          return;
        } else {
          this.segmentationProcessDone = true;
          this.imagepath = res.result;
        }
      }
    );
  }
}
