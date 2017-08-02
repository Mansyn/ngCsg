import { Component, Input } from '@angular/core';
import { MdDialog } from '@angular/material';

@Component({
	selector: 'gallery',
	template: `
		<div class="m-t-25">
		<h5 class="mat-headline p-l-50">{{datasource[0].date}}</h5>
		<md-grid-list cols="4" rowHeight="2:1">
			<md-grid-tile *ngFor="let image of datasource">
				<img src="{{image.url}}" class="tn" height="150" (click)=setSelectedImage(image)>
			</md-grid-tile>
		</md-grid-list>
		</div>
  `,
	styles: [`
    .tn { margin:2px 0px; box-shadow:#999 1px 1px 3px 1px; cursor: pointer }
  `]
})
export class GalleryComponent {
	constructor(public dialog: MdDialog) { }

	@Input() datasource;
	date: string;

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