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
  hasTumor = false; // are tumoare sau nu
  resultAfterProcessing = 0; // procentul de contor dupa procesarea imaginii
  resultButtonClicked = false; // s a apasat pe butonul de rezultat sau nu

  constructor(private router: Router, private rpcService: RpcService) {}

  // uploading an image
  onFileSelected(event: any) {
    event.stopPropagation();
    const file: File = event.target.files[0];
    console.log(file.name);
    this.originalImagePath = file.name;
    this.imageSegmentationPath = ''
    this.imgBrightnessEnhPath = ''
    this.imgSharpnessEnhPath = ''
  }

  // reseting images -> in order to process another image
  resetButton() {
    this.originalImagePath = '';
    this.imageSegmentationPath = '';
    this.imgBrightnessEnhPath = '';
    this.imgSharpnessEnhPath = '';
    this.resultButtonClicked = false;
  }

  // process for image segmentation
  imageSegmentation(imagepath: string): void {
    // event.preventDefault();
    console.log('image segmentation button clicked');
    let params = {
      imagepath: this.originalImagePath
    };
    // console.log(params.imagepath);

    this.rpcService.callRPC(
      'segmentation.imageSegmentation',
      params,
      (err: any, res: any) => {
        if (err || res.error) {
          console.log('segmentation does NOT work');
          return;
        } else {
          // event.preventDefault();
          console.log('segmentation works');
          this.imageSegmentationPath = res.result;
        }
      }
    );
  }

  // process for image brightness enhancement
  brightnessEnhancement(imagepath: string): void {
    // event.preventDefault();
    this.imgSharpnessEnhPath = '';
    console.log('brightness enhancement button clicked');

    let params = {
      imagepath: this.originalImagePath
    };

    this.rpcService.callRPC(
      'brightness.brightnessEnhancement',
      params,
      (err: any, res: any) => {
        if (err || res.error) {
          console.log('brightness enhancement does NOT work');
          return;
        } else {
          // event.preventDefault();
          console.log('brightness enhancement works');
          console.log(res.result);
          this.imgBrightnessEnhPath = res.result;
        }
      }
    );
  }

  // process for image sharpness enhancement
  sharpnessEnhancement(imagepath: string): void {
    // event.preventDefault();
    this.imgBrightnessEnhPath = '';
    console.log('sharpness enhancement button clicked');

    let params = {
      imagepath: this.originalImagePath
    };

    this.rpcService.callRPC(
      'sharpness.sharpnessEnhancement',
      params,
      (err: any, res: any) => {
        if (err || res.error) {
          console.log('sharpness enhancement does NOT work');
          return;
        } else {
          // event.preventDefault();
          console.log('sharpness enhancement works');
          this.imgSharpnessEnhPath = res.result;
        }
      }
    );
  }

  // tumor detection function
  showResults(): void {
    console.log('tumor detection button clicked');
    let params = {
      username: 'admin',
    };

    this.resultButtonClicked = true;

    this.rpcService.callRPC(
      'tumorDetection.tumorDetectionProcess',
      params,
      (err: any, res: any) => {
        if (err || res.error) {
          console.log('tumor detection does NOT work');
          return;
        } else {
          console.log('tumor detection works');
          this.resultAfterProcessing = res.result;
          console.log(this.resultAfterProcessing);
          if (this.resultAfterProcessing > 1000) this.hasTumor = true;
        }
      }
    );
  }

  // exit function - returns to login page
  exitButton(): void {
    this.resultButtonClicked = false;
    let copyInstance = this; // a copy of this class (atributes + methods)
    copyInstance.router.navigate(['/login']);
  }
}
