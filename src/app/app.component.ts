import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { RestService } from './services/rest.service';
import { HeaderComponent } from './components/header/header.component';
import { ListenerService } from './services/listener.service';
import ManageToken from './lib/manageToken';
import IPartialUser from './interfaces/IPartialUser';
import { AlertComponent } from './components/alert/alert.component';
import IAlert from './interfaces/IAlert';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, AlertComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  public token: string|null = ''
  public partialUser: IPartialUser|null = null;
  private manageToken: ManageToken = new ManageToken();
  
  // Alert
  public alert: IAlert = {
    title: '',
  }
  public showAlert: boolean = false;

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

    this.token = token;
    this.listener.token.emit(token)

    // Setting partialUser and send to subscribers
    if (token) {
      const decodedToken = this.manageToken.decodedToken();

      this.rest.getUser(parseInt(decodedToken.nameid)).subscribe(rsp => {
        this.partialUser = rsp.data;
        this.listener.partialUser.emit(this.partialUser)
      })
    }

    // Token deleted
    this.listener.tokenDeleted.subscribe(() => {
      this.partialUser = null
    })

    // Alert activated
    this.listener.alert.subscribe(alert => {
      this.alert = alert;
      this.showAlert = true;
      this.alert.showSeconds = this.alert.showSeconds == undefined ? 3000 : this.alert.showSeconds;

      setTimeout(() => {
        this.showAlert = false;
      }, this.alert.showSeconds);
    })
  }
}
