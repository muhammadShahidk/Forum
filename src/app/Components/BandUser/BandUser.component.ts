import { SelectionModel } from '@angular/cdk/collections';
import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { BannedStatus, BannedUserResponceDTO } from '../../Modals/Dtos/BandUserDto';
import { BannedUsersService } from '../../Services/BannedUsers.service';
import { UserService } from '../../Services/User.service';

@Component({
  selector: 'app-band-user',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatCheckboxModule],
  templateUrl: './BandUser.component.html',
  styleUrl: './BandUser.component.css',
})
export class BandUserComponent implements OnInit {
  // initiliaze  data
  async ngOnInit(): Promise<void> {
    const data = await this.banUserService.GetAllBannedUsers();
    this.dataSource.data = data.map((x) => {
      return {
        ...x,
        statusText: BannedStatus[x.status],
      };
    });
    console.group('banuser Facthing data');
    console.count('count of requests');
    console.log(this.dataSource.data);
    console.groupEnd();
  }

  // inject service
  banUserService = inject(BannedUsersService);
  userService = inject(UserService);

  // mat table logic
  columns = [
    {
      columnDef: 'userName',
      header: 'User Name',
      cell: (element: BannedUserResponceDTO) => `${element?.username}`,
    },
    {
      columnDef: 'startDate',
      header: 'Start Date',
      cell: (element: BannedUserResponceDTO) => `${element?.startDate}`,
    },
    {
      columnDef: 'endDate',
      header: 'End Date',
      cell: (element: BannedUserResponceDTO) => `${element?.endDate}`,
    },
    {
      columnDef: 'status',
      header: 'Status',
      cell: (element: BannedUserResponceDTO) => `${element?.status}`,
    },
  ];
  displayedColumns = this.columns.map((c) => c?.columnDef).push('select');

  // displayedColumns: string[] = [
  //   'select',
  //   'UserName',
  //   'Start Date',
  //   'End Date',
  //   'status',
  // ];
  dataSource = new MatTableDataSource<BannedUserResponceDTO>([]);
  selection = new SelectionModel<BannedUserResponceDTO>(true, []);

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
  checkboxLabel(row?: BannedUserResponceDTO): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.id + 1
    }`;
  }
}
