import { Component } from '@angular/core';

import { AppComponent } from '../app.component';

@Component({
    selector: 'about',
    template: require('./about.component.html')]
})
export class AboutComponent {
    section: any;
    constructor(private app: AppComponent) {
        if (window.innerWidth > 960) {
            app.sidenav.open();
        }

        this.section = app.navLinks.filter(x => x.section == 'about')[0];
    }
}