import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss'],
})
export class UploadFileComponent implements OnInit {
  ImagePath = '';

  // constructor() {
  //   //image location
  //   this.ImagePath = 'test.png';
  // }

  ngOnInit() {}

  onFileSelected(event:any) {

    const file:File = event.target.files[0];
    console.log(file.name);
    this.ImagePath = file.name;

    // if (file) {

    //     this.fileName = file.name;

    //     const formData = new FormData();

    //     formData.append("thumbnail", file);

    //     const upload$ = this.http.post("/api/thumbnail-upload", formData);

    //     upload$.subscribe();
    // }
}
}
