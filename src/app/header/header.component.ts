import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  loadAPI;

  constructor(public router: Router) { }

  ngOnInit(): void {
  }
  // tslint:disable-next-line:typedef
  login(){
    this.router.navigate(['/login']);
  }

}
