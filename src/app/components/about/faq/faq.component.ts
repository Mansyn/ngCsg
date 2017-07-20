import { Component } from '@angular/core';

import { AppComponent } from '../../app.component';

@Component({
    selector: 'faq',
    templateUrl: './faq.component.html',
    styleUrls: ['./faq.component.scss']
})
export class FaqComponent {
    section: any;
    page: any;
    constructor(private app: AppComponent) {
        this.section = app.navLinks.filter(x => x.section == 'about')[0];
        this.page = this.section.pages.filter(x => x.link == 'faq')[0];
    }
}