import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { sensitiveKeywordResponseDto } from '../../../Modals/Dtos/SensitiveKeywordDto';
import { SensitiveKeyWordsService } from '../../../Services/SensitiveKeyWords.service';

@Component({
  selector: 'app-update-key-word-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
  ],
  templateUrl: './updateKeyWordDialog.component.html',
  styleUrl: './updateKeyWordDialog.component.css',
})
export class UpdateKeyWordDialogComponent {
  value: string = '';
  keyword: sensitiveKeywordResponseDto;
  async UpdateKeyword() {
    await this.keywordservice.UpdateKeyword(this.keyword.id,{keyword:this.value});

  }

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { keywords: sensitiveKeywordResponseDto },
    private keywordservice: SensitiveKeyWordsService
  ) {
    this.keyword = data.keywords;
    this.value = this.keyword.keyword;
  }



}
