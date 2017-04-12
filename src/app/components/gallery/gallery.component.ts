import { Component } from '@angular/core';

import { AppComponent } from '../app.component';

@Component({
    selector: 'gallery',
    template: require('./gallery.component.html')
})
export class GalleryComponent {
    constructor(private app: AppComponent) {
        if (window.screen.width > 960) {
            app.sidenav.open();
        }
    }
}