import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { MdSidenav } from '@angular/material';
import { Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-root',
  template: require('./app.component.html'),
  styles: [require('./app.component.scss')],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {

  constructor(private router: Router) { };

  navLinks = [{
    'section': 'about',
    'pages': [{
      'link': 'faq',
      'headline': 'Frequently Asked Questions',
      'summary': 'Frequently asked questions about home exteriors'
    }, {
      'link': 'services',
      'headline': 'Our Services',
      'summary': 'What services we can offer for your home'
    }, {
      'link': 'testimonials',
      'headline': 'Client Testimonials',
      'summary': 'What our past clients have to say about our work'
    }]
  }, {
    'section': 'gallery',
    'pages': [{
      'link': 'houses',
      'headline': 'House Gallery',
      'summary': 'frequently asked questions about home exteriors'
    }]
  }, {
    'section': 'contact',
    'pages': [{
      'link': 'call',
      'headline': 'Contact By Phone',
      'summary': 'frequently asked questions about home exteriors'
    }, {
      'link': 'email',
      'headline': 'Contact By Email',
      'summary': 'frequently asked questions about home exteriors'
    }, {
      'link': 'facebook',
      'headline': 'On Facebook',
      'summary': 'Find us on Facebook and keep up with our latest work'
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
    if ((this.router.url === '/home') || (event.target.innerWidth < 600)) {
      this.sidenav.close();
    }
  }
}