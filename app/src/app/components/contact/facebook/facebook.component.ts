import { Component } from '@angular/core';

import { AppComponent } from '../../app.component';

@Component({
    selector: 'facebook',
    templateUrl: './facebook.component.html'
})
export class FacebookComponent {
    section: any;
    page: any;
    constructor(private app: AppComponent) {
        this.section = app.navLinks.filter(x => x.section == 'contact')[0];
        this.page = this.section.pages.filter(x => x.link == 'facebook')[0];
    }
}