import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { UserRolResponceDto } from '../../../Modals/Dtos/userDto';
import { AuthService } from '../../../Services/Auth.service';
import { SelectionModel } from '@angular/cdk/collections';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatBottomSheet, MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { AprovalBotomSheetComponent } from '../../Aproval/AprovalBotomSheet/AprovalBotomSheet.component';

@Component({
  selector: 'app-user-rools-management',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatBottomSheetModule,
  ],
  templateUrl: './UserRoolsManagement.component.html',
  styleUrl: './UserRoolsManagement.component.css',
})
export class UserRoolsManagementComponent implements AfterViewInit {
  displayedColumns: string[] = ['select', 'username', 'Rool'];
  dataSource = new MatTableDataSource<UserRolResponceDto>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  selection = new SelectionModel<UserRolResponceDto>(true, []);

  constructor(
    private authService: AuthService,
    private _bottomSheet: MatBottomSheet
  ) {
    (async () => {
      await this.initializeData();
    })();
  }

  async initializeData() {
    const usersWithRools = await this.authService.getAllUsersWithRoles();
    const usersWithRoolsArray = usersWithRools
      .filter(user => !user.rools.includes('ADMIN')) // Filter out users with 'ADMIN' role
      .map((user) => {
        let rool = 'user';
        if (user.rools.includes('MODERATOR')) {
          rool = 'MODERATOR';
        }
        return {
          ...user,
          Rool: rool,
        };
      });

    this.dataSource.data = usersWithRoolsArray;
  }

  openBottomSheet(): void {
    const bottomSheetRef = this._bottomSheet.open(AprovalBotomSheetComponent, {
      data: { SelectedRequests: this.selection.selected, type: 'userRools' },
    });

    bottomSheetRef.afterDismissed().subscribe(() => {
      this.initializeData();
      this.selection.clear();
    });
  }

  ngAfterViewInit() {
    console.log('user rols management view init');
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

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
  checkboxLabel(row?: UserRolResponceDto): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.name + 1
    }`;
  }
}
