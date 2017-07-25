import { Component } from '@angular/core';

import { AppComponent } from '../../app.component';

@Component({
    selector: 'finished',
    templateUrl: './finished.component.html'
})
export class FinishedComponent {
    section: any;
    page: any;
    constructor(private app: AppComponent) {
        this.section = app.navLinks.filter(x => x.section == 'gallery')[0];
        this.page = this.section.pages.filter(x => x.link == 'finished')[0];
    }
}