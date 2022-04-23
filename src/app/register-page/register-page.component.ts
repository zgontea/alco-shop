import { Component, OnDestroy, OnInit } from '@angular/core';
import { RegisterService } from '../services/register.service';
import { User } from '../wrappers/user';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
})
export class RegisterPageComponent implements OnInit, OnDestroy {
  user: User = new User();

  constructor(private registerService: RegisterService) {}

  public ngOnInit(): void {}

  public ngOnDestroy(): void {}

  public registerUser(): void {
    this.registerService.registerUser(this.user).subscribe({
      complete: () => {
        alert('Successfully User register');
      },
      error: () => {
        alert('Sorry User not register');
      },
    });
  }
}
