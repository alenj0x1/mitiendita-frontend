import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { RestService } from './services/rest.service';
import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(private rest: RestService, private router: Router) {
    this.rest.checkApp().subscribe(status => {

    }, err => {
      if (err.error.msg == 'without_admin') {
        this.router.navigate(['withoutSuperAdmin'])
      }
    })
  }
}
