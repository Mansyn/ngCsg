import { Component } from '@angular/core';

import { AppComponent } from '../../app.component';

@Component({
    selector: 'services',
    templateUrl: './services.component.html',
    styleUrls: ['./services.component.scss']
})
export class ServicesComponent {
    section: any;
    page: any;
    constructor(private app: AppComponent) {
        this.section = app.navLinks.filter(x => x.section == 'about')[0];
        this.page = this.section.pages.filter(x => x.link == 'services')[0];
    }
}