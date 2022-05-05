import { Component, OnDestroy, OnInit } from '@angular/core';
import { RegisterService } from '../../services/register/register.service';
import { User } from '../../wrappers/user';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
})
export class RegisterPageComponent implements OnInit, OnDestroy {
  user: User = new User();
  cpassword ='';
  constructor(private registerService: RegisterService) {}

  public ngOnInit(): void {}

  public ngOnDestroy(): void {}

  public comparePasswords(): boolean
  {
    return this.user.password === this.cpassword;
  }

  public registerUser(): void {
    if( !this.comparePasswords() )
      alert('Your passwords are not equal!');
    else
    this.registerService.registerUser(this.user).subscribe({
      complete: () => {
        alert('User registered successfully!');
      },
      error: () => {
          alert('User could not be registered!');
      },
    });
  }
}
