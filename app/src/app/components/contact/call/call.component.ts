import { Component } from '@angular/core';

import { AppComponent } from '../../app.component';

@Component({
    selector: 'call',
    templateUrl: './call.component.html'
})
export class CallComponent {
    section: any;
    page: any;
    constructor(private app: AppComponent) {
        this.section = app.navLinks.filter(x => x.section == 'contact')[0];
        this.page = this.section.pages.filter(x => x.link == 'call')[0];
    }
}