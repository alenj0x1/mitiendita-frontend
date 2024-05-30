import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon'

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css'
})
export class AlertComponent {
  @Input({ required: true })
  public title: string = '';
  @Input({ required: false })
  public description: string = '';
  // Styles using tailwindcss
  @Input({ required: false })
  public borderColor: string = 'border-gray-600';
  @Input({ required: false })
  public backgroundColor: string = 'bg-white';
  // Icons using material components
  @Input({ required: false })
  public icon: string = 'warning';
  @Input({ required: false })
  public iconColor: string = 'text-gray-600'
}
