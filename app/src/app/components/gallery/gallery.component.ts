import { Component } from '@angular/core';

import { AppComponent } from '../app.component';

@Component({
    selector: 'gallery',
    templateUrl: './gallery.component.html'
})
export class GalleryComponent {
    section: any;
    constructor(private app: AppComponent) {
        if (window.innerWidth > 960) {
            app.sidenav.open();
        }

        this.section = app.navLinks.filter(x => x.section == 'gallery')[0];
    }
}