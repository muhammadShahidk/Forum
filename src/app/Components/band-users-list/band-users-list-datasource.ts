import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { from , Observable, of as observableOf, merge } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { inject } from '@angular/core';
import { BannedUsersService } from '../../Services/BannedUsers.service';
import { BannedUserResponceDTO } from '../../Modals/Dtos/BandUserDto';

// TODO: Replace this with your own data model type

// TODO: replace this with real data from your application

/**
 * Data source for the BandUsersList view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class BandUsersListDataSource extends DataSource<BannedUserResponceDTO> {
  banduserService: BannedUsersService = inject(BannedUsersService);
  data: BannedUserResponceDTO[] = [];
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  constructor() {
    super();
    (async () => {
      await this.loadData();
    })();

  }

  private async loadData(): Promise<void> {
    // this.data = await this.banduserService.GetAllBannedUsers();
    console.log(this.data);
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<BannedUserResponceDTO[]> {
    if (this.paginator && this.sort) {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
      return merge(
        observableOf(this.data),
        this.paginator.page,
        this.sort.sortChange
      ).pipe(
        map(() => {
          return this.getPagedData(this.getSortedData([...this.data]));
        })
      );
    } else {
      throw Error(
        'Please set the paginator and sort on the data source before connecting.'
      );
    }
  }

  // connect(): Observable<BannedUserResponceDTO[]> {
  //   if (this.paginator && this.sort) {
  //     // Check if data is already loaded
  //     if (this.data.length === 0) {
  //       // Data is not loaded, so load it asynchronously
  //       return from(this.loadData()).pipe(
  //         switchMap(() => this.getStreamObservable())
  //       );
  //     } else {
  //       // Data is already loaded, return the observable immediately
  //       return this.getStreamObservable();
  //     }
  //   } else {
  //     throw Error(
  //       'Please set the paginator and sort on the data source before connecting.'
  //     );
  //   }
  // }

  // private getStreamObservable(): Observable<BannedUserResponceDTO[]> {
  //   return merge(
  //     observableOf(this.data),
  //     this.paginator!.page,
  //     this.sort!.sortChange
  //   ).pipe(map(() => this.getPagedData(this.getSortedData([...this.data]))));
  // }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: BannedUserResponceDTO[]): BannedUserResponceDTO[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(
    data: BannedUserResponceDTO[]
  ): BannedUserResponceDTO[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'name':
          return compare(a.firstName, b.firstName, isAsc);
        case 'id':
          return compare(+a.id, +b.id, isAsc);
        default:
          return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}



