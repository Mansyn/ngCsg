import { Component } from '@angular/core';

import { AppComponent } from '../../app.component';

@Component({
    selector: 'email',
    templateUrl: './email.component.html'
})
export class EmailComponent {
    section: any;
    page: any;
    constructor(private app: AppComponent) {
        this.section = app.navLinks.filter(x => x.section == 'contact')[0];
        this.page = this.section.pages.filter(x => x.link == 'email')[0];
    }
}