import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TableComponent } from '../../../table/table.component';

@Component({
  selector: 'app-approved-aproval-request',
  standalone: true,
  imports: [
    CommonModule,
    TableComponent
  ],
  templateUrl: './ApprovedAprovalRequest.component.html',
  styleUrl: './ApprovedAprovalRequest.component.css',
})
export class ApprovedAprovalRequestComponent { }
