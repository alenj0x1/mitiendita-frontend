import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button'
import { ErrorStateMatcher } from '@angular/material/core'
import { MatInputModule } from '@angular/material/input'
import { MatIconModule } from '@angular/material/icon'
import { RestService } from '../../services/rest.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-without-super-admin',
  standalone: true,
  imports: [MatButtonModule, ReactiveFormsModule, MatInputModule, MatIconModule],
  templateUrl: './without-super-admin.component.html',
  styleUrl: './without-super-admin.component.css'
})
export class WithoutSuperAdminComponent {
  public hidePassword: boolean = true;
  public form = new FormGroup({
    mail: new FormControl('', { validators: [Validators.required, Validators.email] }),
    password: new FormControl('', { validators: [Validators.required] }),
    passwordHint: new FormControl('', { validators: [Validators.required]})
  })
  public matcher = new ErrorStateMatcher()

  constructor(private rest: RestService, private router: Router) {}

  changePasswordView() {
    this.hidePassword = !this.hidePassword
  }

  onCreate() {
    this.rest.createAdmin(this.form.value).subscribe(() => {
      this.router.navigate(['login'])
    }, err => {

    })
  }
}
