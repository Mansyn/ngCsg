import { Component } from '@angular/core';

import { AppComponent } from '../app.component';

@Component({
    selector: 'contact',
    template: require('./contact.component.html')
})
export class ContactComponent {
    constructor(private app: AppComponent) {
        if (window.screen.width > 960) {
            app.sidenav.open();
        }
    }
}