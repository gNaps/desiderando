import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.scss']
})
export class NavigatorComponent implements OnInit {
  @Input() title?: string;
  @Input() image?: string;
  @Input() routerLink?: string[];

  constructor() { }

  ngOnInit(): void {
  }

}
