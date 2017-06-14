import { Component } from '@angular/core';

import { AppComponent } from '../app.component';

@Component({
    selector: 'gallery',
    templateUrl: './gallery.component.html',
    styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent {
    section: any;
    constructor(private app: AppComponent) {
        if (window.screen.width > 960) {
            app.sidenav.open();
        }

        this.section = app.navLinks.filter(x => x.section == 'gallery')[0];
    }
}