import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RpcService } from '../services/rpc.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent {
  originalImagePath = '';
  imageSegmentationPath = '';

  constructor(
    private router: Router,
    private rpcService: RpcService,
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
    this.originalImagePath = file.name;
  }

  resetButton() {
    this.originalImagePath = '';
    this.imageSegmentationPath = '';
  }

  ceva(): void {
    console.log('macar aici nu');
  }

  imageSegmentation(event: any): void {
    event.preventDefault();
    console.log('s a apasat butonul de exit');
    let params = {
      username: 'admin',
    };

    this.rpcService.callRPC(
      'segmentation.imageSegmentation',
      params,
      (err: any, res: any) => {
        if (err || res.error) {
          console.log('segmentation does NOT work');
          return;
        } else {
          event.preventDefault();
          console.log('segmentation works');
          this.imageSegmentationPath = res.result;
        }
      }
    );
  }
}
