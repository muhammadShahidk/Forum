import { DateAdapter } from "@angular/material/core";

export interface sensitiveKeywordResponseDto {
  userId: number;
  dateCreated: Date;
  dateUpdated: Date;
  id: number;
  keyword: string;
}

export interface sensitiveKeywordRequestDto {
  keyword: string;
}

