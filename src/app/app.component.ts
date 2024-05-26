import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { RestService } from './services/rest.service';
import { HeaderComponent } from './components/header/header.component';
import { ListenerService } from './services/listener.service';
import ManageToken from './lib/manageToken';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  public token: string|null = ''
  private manageToken: ManageToken = new ManageToken();

  constructor(
    private rest: RestService, 
    private router: Router,
    private listener: ListenerService
  ) {
    this.rest.checkApp().subscribe(() => {
    }, err => {
      if (err.error.msg == 'without_admin') {
        this.router.navigate(['withoutSuperAdmin'])
      }
    })
  }

  ngOnInit(): void {
    // Send token to subscribers
    const token = this.manageToken.findToken()
    this.listener.token.emit(token)
  }
}
