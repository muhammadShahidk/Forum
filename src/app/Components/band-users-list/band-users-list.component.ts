import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTableModule, MatTable } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { BandUsersListDataSource } from './band-users-list-datasource';
import { BannedUserResponceDTO } from '../../Modals/Dtos/BandUserDto';

@Component({
  selector: 'app-band-users-list',
  templateUrl: './band-users-list.component.html',
  styleUrls: ['./band-users-list.component.css'],
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatSortModule],
})
export class BandUsersListComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<BannedUserResponceDTO>;

  dataSource = new BandUsersListDataSource();

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name'];

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
