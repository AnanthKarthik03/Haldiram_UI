import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  loadAPI;
  name = '';

  constructor(private routers: Router, public router: ActivatedRoute) {
    this.loadAPI = new Promise((resolve) => {
      this.loadScript();
      resolve(true);
    });
  }

  ngOnInit(): void {
    this.name = sessionStorage.getItem('name');
  }
  // tslint:disable-next-line:typedef
  dashboard() {
    this.routers.navigate(['/Dashboard']);
  }
  // tslint:disable-next-line:typedef
  order() {
    this.routers.navigate(['/order']);
  }
  cOrder() {
    this.routers.navigate(['/cOrder']);
  }
  invoice() {
    this.routers.navigate(['/invoice']);
  }
  customerPrice() {
    this.routers.navigate(['/customerPrice']);
  }
  customerDiscount() {
    this.routers.navigate(['/customerDiscount']);
  }
  reports() {
    this.routers.navigate(['/reports']);
  }

  // tslint:disable-next-line:typedef
  public loadScript() {
    let isFound = false;
    const scripts = document.getElementsByTagName('script');
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < scripts.length; ++i) {
      if (
        scripts[i].getAttribute('src') != null &&
        scripts[i].getAttribute('src').includes('loader')
      ) {
        isFound = true;
      }
    }

    if (!isFound) {
      const dynamicScripts = ['assets/js/app.js'];

      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < dynamicScripts.length; i++) {
        const node = document.createElement('script');
        node.src = dynamicScripts[i];
        node.type = 'text/javascript';
        node.async = false;
        node.charset = 'utf-8';
        document.getElementsByTagName('head')[0].appendChild(node);
      }
    }
  }

  // tslint:disable-next-line:typedef
  login() {
    this.routers.navigate(['/login']);
  }
}
