import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import {
  MAT_BOTTOM_SHEET_DATA,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { MatListModule } from '@angular/material/list';
import { ApprovalResponseDto, ChangeApprovalStatusDto } from '../../../Modals/Dtos/ApprovalDto';
import { MatButtonModule } from '@angular/material/button';
import { ApprovalService } from '../../../Services/Approval.service';
import { ApprovalStatus } from '../../../Modals/Enum/STATUS';

@Component({
  selector: 'app-aproval-botom-sheet',
  standalone: true,
  imports: [CommonModule, MatListModule, MatButtonModule],
  templateUrl: './AprovalBotomSheet.component.html',
  styleUrl: './AprovalBotomSheet.component.css',
})
export class AprovalBotomSheetComponent {
  SelectedRequests: ApprovalResponseDto[];
  typesOfShoes: string[] = ['Approved', 'Rejected', 'Pending'];

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA)
    public data: { SelectedRequests: ApprovalResponseDto[] },
    private _bottomSheetRef: MatBottomSheetRef<AprovalBotomSheetComponent>,
    private approvalService: ApprovalService
  ) {
    this.SelectedRequests = data.SelectedRequests;
  }

  async changeStatus(status: ChangeApprovalStatusDto) {
    await this.approvalService.SetStatus(status);
  }

  returnStatus(status: string): number {
    switch (status) {
      case 'Approved':
        return ApprovalStatus.Approved;
      case 'Pending':
        return ApprovalStatus.Pending;
      case 'Rejected':
        return ApprovalStatus.Rejected;
      default:
        return ApprovalStatus.Pending;
    }
  }

  UpdateStatus(_status: string): void {
    this.SelectedRequests.forEach(async (Request) => {
      const status = {} as ChangeApprovalStatusDto;
      status.requestId = Request.requestId;
      status.status = this.returnStatus(_status);
      await this.changeStatus(status);

      console.log('status changed of ' + Request.username + ' to ' + _status);
    });
    this._bottomSheetRef.dismiss();
  }
}
