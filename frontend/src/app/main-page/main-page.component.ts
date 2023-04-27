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
  imgBrightnessEnhPath = '';
  imgSharpnessEnhPath = '';
  imgTumorDetectedPath = '';

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

  // uploading an image
  onFileSelected(event: any) {
    event.stopPropagation();
    const file: File = event.target.files[0];
    console.log(file.name);
    this.originalImagePath = file.name;
  }

  // reseting images -> in order to process another image
  resetButton() {
    this.originalImagePath = '';
    this.imageSegmentationPath = '';
    this.imgBrightnessEnhPath = '';
    this.imgSharpnessEnhPath = '';
    this.imgTumorDetectedPath = '';
  }

  // process for image segmentation
  imageSegmentation(event: any): void {
    event.preventDefault();
    console.log('image segmentation button clicked');
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

  // process for image brightness enhancement
  brightnessEnhancement(event: any): void {
    event.preventDefault();
    this.imgSharpnessEnhPath = '';
    console.log('brightness enhancement button clicked');
    let params = {
      username: 'admin',
    };

    this.rpcService.callRPC(
      'brightness.brightnessEnhancement',
      params,
      (err: any, res: any) => {
        if (err || res.error) {
          console.log('brightness enhancement does NOT work');
          return;
        } else {
          event.preventDefault();
          console.log('brightness enhancement works');
          this.imgBrightnessEnhPath = res.result;
        }
      }
    );
  }

  //  // process for image contrast enhancement
  //  contrastEnhancement(event: any): void {
  //   event.preventDefault();
  //   this.imgBrightnessEnhPath = '';
  //   this.imgSharpnessEnhPath = '';
  //   console.log('contrast enhancement button clicked');
  //   let params = {
  //     username: 'admin',
  //   };

  //   this.rpcService.callRPC(
  //     'contrast.contrastEnhancement',
  //     params,
  //     (err: any, res: any) => {
  //       if (err || res.error) {
  //         console.log('contrast enhancement does NOT work');
  //         return;
  //       } else {
  //         event.preventDefault();
  //         console.log('contrst enhancement works');
  //         this.imgContrastEnhPath = res.result;
  //       }
  //     }
  //   );
  // }

  // process for image sharpness enhancement
  sharpnessEnhancement(event: any): void {
    event.preventDefault();
    this.imgBrightnessEnhPath = '';
    console.log('sharpness enhancement button clicked');
    let params = {
      username: 'admin',
    };

    this.rpcService.callRPC(
      'sharpness.sharpnessEnhancement',
      params,
      (err: any, res: any) => {
        if (err || res.error) {
          console.log('sharpness enhancement does NOT work');
          return;
        } else {
          event.preventDefault();
          console.log('sharpness enhancement works');
          this.imgSharpnessEnhPath = res.result;
        }
      }
    );
  }

  // tumor detection function
  tumorDetection(event: any): void {
    event.preventDefault();
    this.imgBrightnessEnhPath = '';
    this.imageSegmentationPath = '';
    console.log('tumor detection button clicked');
    let params = {
      username: 'admin',
    };

    this.rpcService.callRPC(
      'tumorDetection.tumorDetectionProcess',
      params,
      (err: any, res: any) => {
        if (err || res.error) {
          console.log('tumor detection does NOT work');
          return;
        } else {
          event.preventDefault();
          console.log('tumor detection works');
          this.imgTumorDetectedPath = res.result;
        }
      }
    );
  }

  // exit function - returns to login page
  exitButton(): void {
    let copyInstance = this; // a copy of this class (atributes + methods)
    copyInstance.router.navigate(['/login']);
  }
}
