import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { RpcService } from '../services/rpc.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent {
  @ViewChild('brightnessValue') brightnessValue: any;
  @ViewChild('contrastValue') contrastValue: any;

  // images' path
  originalImagePath = '';
  imageSegmentationPath = '';
  imgBrightnessEnhPath = '';
  imgSharpnessEnhPath = '';
  imgFinalPath = '';

  hasTumor = false; // tumor detected ot not

  resultAfterProcessing = 0; // contour procent resulted after image processing

  resultButtonClicked = false;
  finalImageButton = false;
  brightness =  0;
  contrast = 0;
  isDisabled = true; // processing buttons are disabled until an image is uploaded
  resultButtonsDisabled= true; // buttons for final result are disabled until sharpness button is clicked

  constructor(private router: Router, private rpcService: RpcService) {}

  // uploading an image
  fileUpload(event: any) {
    let variable = [];
    variable = event.value.filename.split('\\');
    this.originalImagePath = variable[2];
    this.isDisabled = false; // the buttons are no longer disabled
  }

  // reseting images -> in order to process another image
  resetButton() {
    window.location.reload();
  }

  // process for image segmentation
  imageSegmentation(imagepath: string): void {
    let params = {
      imagepath: this.originalImagePath
    };

    this.rpcService.callRPC(
      'segmentation.imageSegmentation',
      params,
      (err: any, res: any) => {
        if (err || res.error) {
          console.log('segmentation does NOT work');
          return;
        } else {
          console.log('segmentation works');
          this.imageSegmentationPath = res.result;
        }
      }
    );
  }

  // process for image brightness enhancement
  brightnessEnhancement(imagepath: string, brightnessVal: number, contrastVal: number): void {
    this.imgBrightnessEnhPath = '';
    brightnessVal =  this.brightnessValue.nativeElement.value
    contrastVal = this.contrastValue.nativeElement.value;
    console.log(brightnessVal, contrastVal);
    // console.log('noua ruta:  ' + imagepath);
    this.imgSharpnessEnhPath = '';

    let params = {
      imagepath: this.originalImagePath,
      brightness: brightnessVal,
      contrast: contrastVal
    };

    this.rpcService.callRPC(
      'brightness.brightnessEnhancement',
      params,
      (err: any, res: any) => {
        if (err || res.error) {
          console.log('brightness enhancement does NOT work');
          return;
        } else {
          console.log('brightness enhancement works');
          this.imgBrightnessEnhPath = res.result;
          // console.log('dupa:  ' + this.imgBrightnessEnhPath);
        }
      }
    );
  }

  // process for image sharpness enhancement
  sharpnessEnhancement(imagepath: string): void {
    this.imgBrightnessEnhPath = '';
    this.resultButtonsDisabled = false;

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
          console.log('sharpness enhancement works');
          this.imgSharpnessEnhPath = res.result;
        }
      }
    );
  }

  // tumor detection function
  showResults(): void {
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
          if (this.resultAfterProcessing > 1000) this.hasTumor = true;
        }
      }
    );
  }

  // showing final image
  showFinalImage(): void {
    let params = {
      username: 'admin',
    };

    this.finalImageButton = true;

    this.rpcService.callRPC(
      'finalImage.showFinalImage',
      params,
      (err: any, res: any) => {
        if (err || res.error) {
          console.log('showing final image does NOT work');
          return;
        } else {
          console.log('showing final image works');
          this.imgFinalPath = res.result;
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

  // process original image with the new values for brightness and contrast
  changeBrightnessContrast(imagepath: string, brightnessVal: number, contrastVal: number): void {
    this.imgBrightnessEnhPath = '';
    brightnessVal =  this.brightnessValue.nativeElement.value
    contrastVal = this.contrastValue.nativeElement.value;
    console.log(brightnessVal, contrastVal);
    this.imageSegmentationPath = ''
    this.imgBrightnessEnhPath = ''
    this.imgSharpnessEnhPath = ''

    let params = {
      imagepath: this.originalImagePath,
      brightness: brightnessVal,
      contrast: contrastVal
    };

    this.rpcService.callRPC(
      'contrast.contrastEnhancement',
      params,
      (err: any, res: any) => {
        if (err || res.error) {
          console.log('contarst enhancement does NOT work');
          return;
        } else {
          console.log('contrast enhancement works');
          this.imgBrightnessEnhPath = res.result;
        }
      }
    );
  }
}
