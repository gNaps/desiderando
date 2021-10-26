import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/api/models/user';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit {
  @Input() members!: User[];
  @Input() classIndex: number = 0;
  
  constructor() { }

  ngOnInit(): void {
  }

}
