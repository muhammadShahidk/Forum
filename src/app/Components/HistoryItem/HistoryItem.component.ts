import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { BannedUserResponceDTO } from '../../Modals/Dtos/BandUserDto';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-history-item',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './HistoryItem.component.html',
  styleUrl: './HistoryItem.component.css',
})
export class HistoryItemComponent {
  @Input() historyItem!: BannedUserResponceDTO;
}
