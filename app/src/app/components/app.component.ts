import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { MdSidenav } from '@angular/material';
import { Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {

  constructor(private router: Router) { };

  navLinks = [{
    'section': 'about',
    'pages': [{
      'link': 'faq',
      'icon': 'question_answer',
      'headline': 'Frequently Asked Questions',
      'summary': 'Frequently asked questions about home exteriors'
    }, {
      'link': 'services',
      'icon': 'touch_app',
      'headline': 'Our Services',
      'summary': 'What services we can offer for your home'
    }, {
      'link': 'testimonials',
      'icon': 'thumb_up',
      'headline': 'Client Testimonials',
      'summary': 'What our past clients have to say about our work'
    }]
  }, {
    'section': 'gallery',
    'pages': [{
      'link': 'finished',
      'icon': 'view_carousel',
      'headline': 'Finished Gallery',
      'summary': 'View finished homes we\'ve previously worked on'
    }]
  }, {
    'section': 'contact',
    'pages': [{
      'link': 'call',
      'icon': 'phone',
      'headline': 'Contact By Phone',
      'summary': 'Why not call us now?'
    }, {
      'link': 'email',
      'icon': 'email',
      'headline': 'Contact By Email',
      'summary': 'Send us a message and we will contact you'
    }, {
      'link': 'facebook',
      'icon': 'face',
      'headline': 'On Facebook',
      'summary': 'Find us on Facebook and keep up with our latest work'
    }]
  }, {
    'section': 'admin',
    'pages': [{
      'link': 'images',
      'icon': 'lock',
      'headline': 'Import Images',
      'summary': 'Upload and format images to import to gallery'
    }]
  }];

  @ViewChild('sidenav') sidenav: MdSidenav;

  public isHidden() {
    let list = ['/', '/home'],
      route = this.router.url;

    return (list.indexOf(route) > -1);
  }

  public currentPath() {
    var fullPath = this.router.url;
    var pathTxt = fullPath.replace('/', '');

    return pathTxt.split('/');
  }

  onResize(event) {
    if ((this.router.url === '/home')) {
      this.sidenav.close();
    }
    if (event.target.innerWidth < 800) {
      this.sidenav.close();
      this.sidenav.mode = 'over';
    } else {
      this.sidenav.mode = 'side';
    }
  }
}