import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  public message = signal('');
  public isOpen = signal(false);

  constructor() {}
}
