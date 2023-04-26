import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RpcService } from '../services/rpc.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent {
  // panelOpenState = false;
  ImagePath = '';

  constructor(private router: Router, private rpcService: RpcService) {
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

  // testButton(): void {
  //   console.log('merge getTest');

  //   let params = {
  //     username: 'admin',
  //   };

  //   this.rpcService.callRPC('test.getTest', params, (err: any, res: any) => {
  //     console.log('a intrat in main-page component ts');
  //     if (err || res.error) {
  //       console.log('nu s au putut afisa testul');
  //       return;
  //     } else {
  //       console.log('merge getTest');
  //       console.log(res.result);
  //     }
  //   });
  // }

  buttonExit(): void {
    console.log('s a apasat butonul de exit');
    let params = {
      "username": 'admin'
    }

    this.rpcService.callRPC('segmentation.imageSegmentation', params, (err: any, res: any) => {
      console.log('a mers segmentarea');
      if (err || res.error) {
        console.log('nu s-a putut realiza segmentarea');
        return;
      }
    });
  }

}
