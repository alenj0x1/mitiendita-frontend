import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button'
import { ErrorStateMatcher } from '@angular/material/core'
import { MatInputModule } from '@angular/material/input'
import { MatIconModule } from '@angular/material/icon'
import { RestService } from '../../services/rest.service';
import { Router } from '@angular/router';
import { ListenerService } from '../../services/listener.service';
import ManageToken from '../../lib/manageToken';

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
  private manageToken = new ManageToken()

  constructor(
    private rest: RestService, 
    private router: Router,
    private listener: ListenerService
  ) {}

  changePasswordView() {
    this.hidePassword = !this.hidePassword
  }

  onLogin() {
    this.rest.login(this.form.value).subscribe(res => {
      localStorage.setItem('token', res.data);
      this.listener.token.emit(res.data);

      const decodedToken = this.manageToken.decodedToken();

      // partialuser
      this.rest.getUser(parseInt(decodedToken.nameid)).subscribe(rsp => {
        this.listener.partialUser.emit(rsp.data)
      })
      
      this.router.navigate(['dashboard']);
    }, err => {

    })
  }
}
