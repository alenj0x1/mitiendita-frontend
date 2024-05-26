import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button'
import { ErrorStateMatcher } from '@angular/material/core'
import { MatInputModule } from '@angular/material/input'
import { MatIconModule } from '@angular/material/icon'
import { RestService } from '../../services/rest.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, MatButtonModule, MatInputModule, MatIconModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  public hidePassword: boolean = true;
  public form = new FormGroup({
    mail: new FormControl('', { validators: [Validators.required, Validators.email] }),
    password: new FormControl('', { validators: [Validators.required] })
  })
  public matcher = new ErrorStateMatcher()

  constructor(private rest: RestService, private router: Router) {}

  changePasswordView() {
    this.hidePassword = !this.hidePassword
  }

  onLogin() {
  }
}
