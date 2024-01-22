import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { sensitiveKeywordResponseDto } from '../../../Modals/Dtos/SensitiveKeywordDto';
import { SensitiveKeyWordsService } from '../../../Services/SensitiveKeyWords.service';


@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatIconModule,
  ],
  templateUrl: './Dialog.component.html',
  styleUrl: './Dialog.component.css',
})
export class DialogComponent {
Addkeyword() {
  this.keywordservice.addNewKeyWord({keyword:this.value??""});

}
  keywords: sensitiveKeywordResponseDto[] = [];
  constructor(@Inject(MAT_DIALOG_DATA) public data: { keywords :sensitiveKeywordResponseDto[]},
  private keywordservice: SensitiveKeyWordsService,
  ) {
    this .keywords = data.keywords;
  }



  value = '';
}

