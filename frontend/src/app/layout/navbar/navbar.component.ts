import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/api/api/auth.service';
import { User } from 'src/app/api/models/user';

type navbarType = 'DASHBOARD' | 'MINIMAL' | 'DETAIL-LIST' | 'DETAIL-ITEM';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  user!: User;
  @Input() type: navbarType = 'DASHBOARD';
  @Input() title: string = "";

  constructor(private authService: AuthService) { 
    this.user = this.authService.getLoggedUser();
    this.user.username = 'gnaps'
  }

  ngOnInit(): void {
  }

}
