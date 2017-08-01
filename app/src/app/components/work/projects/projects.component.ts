import { Component } from '@angular/core';

import { AppComponent } from '../../app.component';

@Component({
    selector: 'projects',
    templateUrl: './projects.component.html'
})
export class ProjectsComponent {
    section: any;
    page: any;
    images: any;
    constructor(private app: AppComponent) {
        this.section = app.navLinks.filter(x => x.section == 'work')[0];
        this.page = this.section.pages.filter(x => x.link == 'projects')[0];

        this.images = [
            { "url": "/assets/images/gallery/1/20160819_093125.jpg" },
            { "url": "/assets/images/gallery/1/20160902_155725.jpg" },
            { "url": "/assets/images/gallery/1/20160902_155802.jpg" },
            { "url": "/assets/images/gallery/1/20160902_155833.jpg" }
        ];
    }
}