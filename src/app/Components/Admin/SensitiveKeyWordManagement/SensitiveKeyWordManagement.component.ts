import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { DialogComponent } from '../../Dialog/Dialog/Dialog.component';
import {
  sensitiveKeywordRequestDto,
  sensitiveKeywordResponseDto,
} from '../../../Modals/Dtos/SensitiveKeywordDto';
import { SensitiveKeyWordsService } from '../../../Services/SensitiveKeyWords.service';
import { TimeAgoPipe } from '../../../Modals/pipes/timeAgo.pipe';
import { UpdateKeyWordDialogComponent } from '../../Dialog/updateKeyWordDialog/updateKeyWordDialog.component';

@Component({
  selector: 'app-sensitive-key-word-management',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    TimeAgoPipe,
  ],
  templateUrl: './SensitiveKeyWordManagement.component.html',
  styleUrl: './SensitiveKeyWordManagement.component.css',
})
export class SensitiveKeyWordManagementComponent implements AfterViewInit {
  KeyWords: sensitiveKeywordResponseDto[] = [];

  constructor(
    private keyWordService: SensitiveKeyWordsService,
    public dialog: MatDialog
  ) {}
  async ngAfterViewInit(): Promise<void> {
    await this.InitilizeData();
  }

  private async InitilizeData() {
    this.KeyWords = await this.keyWordService.getAllKeyWords();
    this.dataSource = this.KeyWords;
  }

  addKeyword() {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        keywords: this.KeyWords,
      },
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      await this.InitilizeData();
    });
  }

  updateKeyword(keyWord: string) {
    const keyword = this.KeyWords.find(
      (keyword) => keyword.keyword === keyWord
    );

    const dialogRef = this.dialog.open(UpdateKeyWordDialogComponent, {
      data: {
        keywords: keyword,
      },
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      await this.InitilizeData();
    });
  }

  deleteKeyword(keyWorkd: string) {
    const keyword = this.KeyWords.find(
      (keyword) => keyword.keyword === keyWorkd
    );
    this.keyWordService.deleteKeyWord(keyword?.id ?? 0);
    this.KeyWords = this.KeyWords.filter(
      (keyword) => keyword.keyword !== keyWorkd
    );
    this.dataSource = this.KeyWords;
  }

  displayedColumns: string[] = ['keyword', 'DateCreated', 'Action'];
  dataSource: sensitiveKeywordResponseDto[] = [];
}
