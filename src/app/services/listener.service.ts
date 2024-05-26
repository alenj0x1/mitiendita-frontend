import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ListenerService {
  @Output()
  token: EventEmitter<string|null> = new EventEmitter()
  @Output()
  tokenDeleted: EventEmitter<string|null> = new EventEmitter()

  constructor() { }
}
