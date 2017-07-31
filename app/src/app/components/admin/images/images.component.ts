import { Component, NgZone, ViewEncapsulation } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Ng2ImgToolsService } from 'ng2-img-tools';
import { Ng2FileInputAction } from 'ng2-file-input';
import { saveAs } from 'file-saver';

import { AppComponent } from '../../app.component';

@Component({
    selector: 'images',
    templateUrl: './images.component.html',
    styleUrls: ['./images.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ImagesComponent {

    section: any;
    page: any;
    processing: boolean = false;
    fixedImage: string = null;
    fixedImageTrusted: SafeUrl = null;

    constructor(private app: AppComponent, private ng2ImgToolsService: Ng2ImgToolsService, private sanitizer: DomSanitizer, private zone: NgZone) {
        this.section = app.navLinks.filter(x => x.section == 'admin')[0];
        this.page = this.section.pages.filter(x => x.link == 'images')[0];
    }

    public onAction(event: any) {
        if (event.action === Ng2FileInputAction.Added) {
            this.processFile(event.currentFiles[0]);
        }
    }

    private processFile(file: File) {
        this.processing = true;

        if (this.fixedImage !== null) {
            window.URL.revokeObjectURL(this.fixedImage);
        }

        this.fixedImage = "processing";

        this.resizeImage(file);
    }

    private resizeImage(file: File) {
        console.info("Starting resize for file:", file);
        this.ng2ImgToolsService.resize([file], 800, 800).subscribe(result => {
            console.log("Resize result:", result);
            //all good
            this.fixedImage = window.URL.createObjectURL(result);
            this.fixedImageTrusted = this.sanitizer.bypassSecurityTrustUrl(this.fixedImage);
        }, error => {
            console.error("Resize error:", error);
        }
        );
    }

    public saveImages() {
        saveAs(this.fixedImage);
    }
}