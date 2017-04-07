import { Component, ViewChild } from '@angular/core';
import { MdSidenav } from "@angular/material";

@Component({
  selector: 'app-root',
  template: require('./app.component.html'),
  styles: [require('./app.component.scss')]
})
export class AppComponent {

  navLinks = [{
    'link': 'about',
    'icon': 'info'
  }, {
    'link': 'services',
    'icon': 'assignment'
  }];

  @ViewChild('sidenav') sidenav: MdSidenav;

  onResize(event) {
    if (event.target.innerWidth < 600) {
      if (this.sidenav._isOpened) {
        this.sidenav.close();
      }
    }
    else {
      if (this.sidenav._isClosed) {
        this.sidenav.open();
      }
    }
  }
}