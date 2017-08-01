import { Component } from '@angular/core';

import { AppComponent } from '../app.component';

@Component({
    selector: 'work',
    templateUrl: './work.component.html'
})
export class WorkComponent {
    section: any;
    constructor(private app: AppComponent) {
        if (window.innerWidth > 960) {
            app.sidenav.open();
        }

        this.section = app.navLinks.filter(x => x.section == 'work')[0];
    }
}