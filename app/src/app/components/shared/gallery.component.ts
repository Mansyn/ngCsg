import { Component, Input } from '@angular/core';
import { MdDialog } from '@angular/material';

@Component({
	selector: 'gallery',
	template: `
  	<ul id="thumbnailsList">
  	   <li *ngFor="let image of datasource" >
					<img src="{{image.url}}" class="tn" height="150" (click)=setSelectedImage(image)>
  	   </li>
  	</ul>
  `,
	styles: [`
  	ul { padding:0; width:100%; margin:20px auto}
  	li { display:inline;}
    .tn { margin:2px 0px; box-shadow:#999 1px 1px 3px 1px; cursor: pointer }
  `]
})
export class GalleryComponent {
	constructor(public dialog: MdDialog) { }

	@Input() datasource;

	setSelectedImage(image) {
		let dialogRef = this.dialog.open(GalleryDialog);
		dialogRef.componentInstance.url = image.url;
	}
}

@Component({
	selector: 'gallery-dialog',
	template: `
  	<img src="{{url}}" />
  `,
})
export class GalleryDialog {
	public url: string;
}