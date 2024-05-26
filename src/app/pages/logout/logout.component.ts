import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import ManageToken from '../../lib/manageToken';
import { ListenerService } from '../../services/listener.service';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [],
  template: '',
})
export class LogoutComponent implements OnInit {
  private manageToken: ManageToken = new ManageToken();
  constructor(private router: Router, private listener: ListenerService) {}

  ngOnInit(): void {
    this.manageToken.deleteToken();
    this.listener.tokenDeleted.emit();
    this.router.navigate(['login']);
  }
}
