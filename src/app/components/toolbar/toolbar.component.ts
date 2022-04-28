import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtService } from 'src/app/services/jwt/jwt.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  constructor(private router: Router, private jwtService: JwtService) { }

  ngOnInit(): void {
  }

  public login() {
    this.router.navigateByUrl('/login');
  }

  public register() {
    this.router.navigateByUrl('/register');
  }

  public logout() {
    this.jwtService.logout();
    this.router.navigateByUrl('/login');
  }

}
