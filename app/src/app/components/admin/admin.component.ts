import { Component } from '@angular/core';

import { AppComponent } from '../app.component';

@Component({
    selector: 'admin',
    templateUrl: './admin.component.html'
})
export class AdminComponent {
    section: any;
    constructor(private app: AppComponent) {
        if (window.innerWidth > 960) {
            app.sidenav.open();
        }

        this.section = app.navLinks.filter(x => x.section == 'admin')[0];
    }
}