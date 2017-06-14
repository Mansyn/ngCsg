import { Component } from '@angular/core';

import { AppComponent } from '../app.component';

@Component({
    selector: 'about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.scss']
})
export class AboutComponent {
    section: any;
    constructor(private app: AppComponent) {
        if (window.screen.width > 960) {
            app.sidenav.open();
        }

        this.section = app.navLinks.filter(x => x.section == 'about')[0];
    }
}