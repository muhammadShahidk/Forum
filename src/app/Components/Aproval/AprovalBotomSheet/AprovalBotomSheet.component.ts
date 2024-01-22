import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import {
  MAT_BOTTOM_SHEET_DATA,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { MatListModule } from '@angular/material/list';
import {
  ApprovalResponseDto,
  ChangeApprovalStatusDto,
} from '../../../Modals/Dtos/ApprovalDto';
import { MatButtonModule } from '@angular/material/button';
import { ApprovalService } from '../../../Services/Approval.service';
import { ApprovalStatus } from '../../../Modals/Enum/STATUS';
import { AuthService } from '../../../Services/Auth.service';
import {
  UseRooleRequestDto,
  UserRolResponceDto,
} from '../../../Modals/Dtos/userDto';

@Component({
  selector: 'app-aproval-botom-sheet',
  standalone: true,
  imports: [CommonModule, MatListModule, MatButtonModule],
  templateUrl: './AprovalBotomSheet.component.html',
  styleUrl: './AprovalBotomSheet.component.css',
})
export class AprovalBotomSheetComponent {
  SelectedRequests: ApprovalResponseDto[] = [] as ApprovalResponseDto[];
  usrRoolsRequest: UseRooleRequestDto[] = [] as UseRooleRequestDto[];
  private _typesOfShoes: string[] = ['Approved', 'Rejected', 'Pending'];
  public get typesOfShoes(): string[] {
    if (this.type == 'userRools') {
      return ['User', 'Moderator'];
    }
    return this._typesOfShoes;
  }
  public set typesOfShoes(value: string[]) {
    this._typesOfShoes = value;
  }
  type: string;

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA)
    public data: { SelectedRequests: unknown; type: string },
    private _bottomSheetRef: MatBottomSheetRef<AprovalBotomSheetComponent>,
    private approvalService: ApprovalService,
    private authService: AuthService
  ) {
    this.type = data.type;
    if (this.type == 'userRools') {
      this.usrRoolsRequest = data.SelectedRequests as UserRolResponceDto[];
    } else {
      this.SelectedRequests = data.SelectedRequests as ApprovalResponseDto[];
    }
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

  async makeModerator(Username: string) {
    await this.authService.makeModerator({ userName: Username });
  }

  UpdateStatus(_status: string): void {
    if (this.type === 'userRools') {
      if (_status === 'Moderator') {
        this.usrRoolsRequest.forEach(async (Request) => {
          await this.makeModerator(Request.userName);
        });
      } else {
        this.usrRoolsRequest.forEach(async (Request) => {
          await this.makeUser({ userName: Request.userName });
        });
      }
      console.log('user rools changed');
      this._bottomSheetRef.dismiss();

      return;
    }
    this.SelectedRequests.forEach(async (Request) => {
      const status = {} as ChangeApprovalStatusDto;
      status.requestId = Request.requestId;
      status.status = this.returnStatus(_status);
      await this.changeStatus(status);

      console.log('status changed of ' + Request.username + ' to ' + _status);
    });
    this._bottomSheetRef.dismiss();
  }
  async makeUser(User: UseRooleRequestDto) {
    await this.authService.makeUser(User);
  }
}
