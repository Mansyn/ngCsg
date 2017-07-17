import { Component } from '@angular/core';

import { AppComponent } from '../../app.component';

@Component({
    selector: 'faq',
    template: require('./faq.component.html'),
    styles: [require('./faq.component.scss')]
})
export class FaqComponent {
    section: any;
    page: any;
    constructor(private app: AppComponent) {
        this.section = app.navLinks.filter(x => x.section == 'about')[0];
        this.page = this.section.pages.filter(x => x.link == 'faq')[0];
    }
}