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
    'section': 'work',
    'pages': [{
      'link': 'projects',
      'icon': 'view_carousel',
      'headline': 'Past Projects',
      'summary': 'View our past projects to see the quality of our work'
    }]
  }, {
    'section': 'contact',
    'pages': [{
      'link': 'call',
      'icon': 'phone',
      'headline': 'Contact By Phone',
      'summary': 'Why not call us now?',
      'href': 'tel:513-932-6680'
    }, {
      'link': 'email',
      'icon': 'email',
      'headline': 'Contact By Email',
      'summary': 'Send us a message and we will contact you',
      'href': 'mailto:steve@crisenberysiding.com?Subject=I\'d%20like%20to%20know%20more'
    }, {
      'link': 'facebook',
      'icon': 'face',
      'headline': 'On Facebook',
      'summary': 'Find us on Facebook and keep up with our latest work',
      'href': 'https://www.facebook.com/Crisenbery-Siding-Continuous-Gutters-162301023793528/'
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