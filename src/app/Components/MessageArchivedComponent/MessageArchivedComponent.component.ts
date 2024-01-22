import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarRef } from '@angular/material/snack-bar';
import { ToastService } from '../../Services/Utl/Toast.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-message-archived-component',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule],
  templateUrl: './MessageArchivedComponent.component.html',
  styleUrl: './MessageArchivedComponent.component.css',
})
export class MessageArchivedComponentComponent {
  constructor(
    private _snackBar: MatSnackBarRef<MessageArchivedComponentComponent>,
    private toast:ToastService
  ) {}
  durationInSeconds = 0;
  message = signal( this.toast.message());
  close() {
    this._snackBar.dismiss();
    this.toast.isOpen.set(false);
  }
}
