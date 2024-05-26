import { Component } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu'
import { MatIconModule } from '@angular/material/icon'
import { RouterModule } from '@angular/router';
import { ListenerService } from '../../services/listener.service';
import IPartialUser from '../../interfaces/IPartialUser';

interface IMenuItem {
  name: string;
  logged: boolean;
  userRole: number;
  isButton?: boolean;
  icon?: string;
  routerLink?: string;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatMenuModule, MatIconModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  public token: string|null = ''
  public partialUser: IPartialUser|null = null;
  public menuItems: IMenuItem[] = [
    {
      name: 'Iniciar sesión',
      logged: false,
      routerLink: 'login',
      userRole: 5
    },
    {
      name: 'Crear un administrador',
      logged: true,
      userRole: 1,
      routerLink: 'superadmin/createAdmin',
    },
    {
      name: 'Crear una tienda',
      logged: true,
      userRole: 2,
      routerLink: 'admin/createStore'
    },
    {
      name: 'Cerrar sesión',
      logged: true,
      routerLink: 'logout',
      userRole: 5
    },
  ]

  constructor(private listener: ListenerService) {
    // Setting token
    this.listener.token.subscribe(token => {
      this.token = token;
    })

    // Setting partialUser
    this.listener.partialUser.subscribe((partialUser) => {
      this.partialUser = partialUser;
    })

    // Token deleted
    this.listener.tokenDeleted.subscribe(() => {
      this.token = null;
      this.partialUser = null;
    })
  }
}
