import { Component } from '@angular/core';

import { AppComponent } from '../../app.component';

@Component({
    selector: 'images',
    templateUrl: './images.component.html'
})
export class ImagesComponent {
    section: any;
    page: any;
    constructor(private app: AppComponent) {
        this.section = app.navLinks.filter(x => x.section == 'admin')[0];
        this.page = this.section.pages.filter(x => x.link == 'images')[0];
    }
}