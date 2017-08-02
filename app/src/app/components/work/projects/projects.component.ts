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

        this.images = [{
            "set": [{
                "date": "8/19/2016",
                "url": "/assets/images/gallery/1/20160819_093125.jpg",
            },
            {
                "date": "8/19/2016",
                "url": "/assets/images/gallery/1/20160902_155725.jpg"
            },
            {
                "date": "8/19/2016",
                "url": "/assets/images/gallery/1/20160902_155802.jpg"
            },
            {
                "date": "8/19/2016",
                "url": "/assets/images/gallery/1/20160902_155833.jpg"
            }]
        }, {
            "set": [{
                "date": "6/9/2016",
                "url": "/assets/images/gallery/3/20160609_125520.jpg",
            }]
        }, {
            "set": [{
                "date": "9/16/2016",
                "url": "/assets/images/gallery/4/20160916_090037.jpg",
            }, {
                "date": "9/16/2016",
                "url": "/assets/images/gallery/4/20160916_090057.jpg",
            }, {
                "date": "9/16/2016",
                "url": "/assets/images/gallery/4/20160916_090158.jpg",
            }, {
                "date": "9/16/2016",
                "url": "/assets/images/gallery/4/20160916_090221.jpg",
            }, {
                "date": "9/16/2016",
                "url": "/assets/images/gallery/4/20160916_160514.jpg",
            }, {
                "date": "9/16/2016",
                "url": "/assets/images/gallery/4/20161007_111713.jpg",
            }, {
                "date": "9/16/2016",
                "url": "/assets/images/gallery/4/20161007_124944.jpg",
            }, {
                "date": "9/16/2016",
                "url": "/assets/images/gallery/4/20161007_124955.jpg",
            }, {
                "date": "9/16/2016",
                "url": "/assets/images/gallery/4/20161007_125004.jpg",
            }, {
                "date": "9/16/2016",
                "url": "/assets/images/gallery/4/20161007_125029.jpg",
            }, {
                "date": "9/16/2016",
                "url": "/assets/images/gallery/4/20161007_125100.jpg",
            }, {
                "date": "9/16/2016",
                "url": "/assets/images/gallery/4/20161007_125151.jpg",
            }]
        }, {
            "set": [{
                "date": "11/22/2016",
                "url": "/assets/images/gallery/5/20161121_160618.jpg",
            },
            {
                "date": "11/22/2016",
                "url": "/assets/images/gallery/5/20161122_091019.jpg"
            },
            {
                "date": "11/22/2016",
                "url": "/assets/images/gallery/5/20161122_091025.jpg"
            },
            {
                "date": "11/22/2016",
                "url": "/assets/images/gallery/5/20161122_161713.jpg"
            },
            {
                "date": "11/22/2016",
                "url": "/assets/images/gallery/5/20161122_161717.jpg"
            }]
        }, {
            "set": [{
                "date": "12/2/2016",
                "url": "/assets/images/gallery/6/20161202_113453.jpg",
            },
            {
                "date": "12/2/2016",
                "url": "/assets/images/gallery/6/20161207_161605.jpg"
            },
            {
                "date": "12/2/2016",
                "url": "/assets/images/gallery/6/20161222_155325.jpg"
            },
            {
                "date": "12/2/2016",
                "url": "/assets/images/gallery/6/20161222_155344.jpg"
            },
            {
                "date": "12/2/2016",
                "url": "/assets/images/gallery/6/20161230_110821.jpg"
            },
            {
                "date": "12/2/2016",
                "url": "/assets/images/gallery/6/20161230_110850.jpg"
            },
            {
                "date": "12/2/2016",
                "url": "/assets/images/gallery/6/20161230_111006.jpg"
            },
            {
                "date": "12/2/2016",
                "url": "/assets/images/gallery/6/20161230_111100.jpg"
            },
            {
                "date": "12/2/2016",
                "url": "/assets/images/gallery/6/20161230_111121.jpg"
            }]
        }];
    }
}