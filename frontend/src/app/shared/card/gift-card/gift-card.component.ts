import { Component, Input, OnInit } from '@angular/core';
import { Gift } from 'src/app/api/models/gift';
import * as moment from "moment";

@Component({
  selector: 'app-gift-card',
  templateUrl: './gift-card.component.html',
  styleUrls: ['./gift-card.component.scss']
})
export class GiftCardComponent implements OnInit {
  @Input() gift!: Gift;

  constructor() { }

  ngOnInit(): void {
  }

  getTime(time: string) {
    const date = new Date(time);
    return moment(date).format('DD/MM/YYYY');
  }

}
