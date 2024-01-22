import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { ApprovalService } from '../../Services/Approval.service';
import {
  ApprovalRequestDto,
  ApprovalResponseDto,
} from '../../Modals/Dtos/ApprovalDto';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SelectionModel } from '@angular/cdk/collections';
import { ApprovalStatus } from '../../Modals/Enum/STATUS';
import {
  MatBottomSheet,
  MatBottomSheetModule,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { AprovalBotomSheetComponent } from '../../Components/Aproval/AprovalBotomSheet/AprovalBotomSheet.component';
import { MatButtonModule } from '@angular/material/button';
import { TimeAgoPipe } from '../../Modals/pipes/timeAgo.pipe';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { UserRoolsManagementComponent } from '../../Components/Admin/UserRoolsManagement/UserRoolsManagement.component';
import { SensitiveKeyWordManagementComponent } from '../../Components/Admin/SensitiveKeyWordManagement/SensitiveKeyWordManagement.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
@Component({
  selector: 'app-approval-request-page',
  standalone: true,
  templateUrl: './ApprovalRequestPage.component.html',
  styleUrl: './ApprovalRequestPage.component.css',
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatTabsModule,
    UserRoolsManagementComponent,
    SensitiveKeyWordManagementComponent,
    MatCheckboxModule,
    MatTableModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatPaginatorModule,
    MatSortModule,
    MatBottomSheetModule,
    TimeAgoPipe,
    MatProgressBarModule,
    MatProgressSpinnerModule
  ],
})
export class ApprovalRequestPageComponent implements AfterViewInit {
  approvalRequests: ApprovalResponseDto[] = [] as ApprovalResponseDto[];
  displayedColumns: string[] = [
    'select',
    'username',
    // 'name',
    // 'userID',
    'status',
    'dateCreated',
    'updatedOn',
  ];
  dataSource = new MatTableDataSource<ApprovalResponseDto>(
    this.approvalRequests
  );
  selection = new SelectionModel<ApprovalResponseDto>(true, []);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  ngAfterViewInit() {
    console.log("approval request page after view init")
    this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: ApprovalResponseDto): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.requestId + 1
    }`;
  }

  printSelected() {
    console.log(this.selection.selected);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  constructor(
    private _bottomSheet: MatBottomSheet,
    private aprovalService: ApprovalService
  ) {}

  openBottomSheet(): void {
    const bottomSheetRef = this._bottomSheet.open(AprovalBotomSheetComponent, {
      data: { SelectedRequests: this.selection.selected },
    });

    bottomSheetRef.afterDismissed().subscribe(() => {
      this.getApprovalRequest();
      this.selection.clear();
    });
  }

  async getApprovalRequest() {
    this.approvalRequests = await this.aprovalService.getAllRequest();
    this.dataSource.data = this.approvalRequests.map((x) => ({
      ...x,
      Status: ApprovalStatus[x.status] as string,
    }));
  }

  async ngOnInit() {
    console.log("approval request page on  init")
    await this.getApprovalRequest();

    console.log(
      this.approvalRequests.map((x) => ({
        username: x.username,
        dateCreated: x.dateCreated,
        statusNumber: x.status,
        status: ApprovalStatus[x.status] as string,
      }))
    );
  }


}
