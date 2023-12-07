export interface ApprovalRequestDto {
    username:string;
}


export interface ApprovalResponseDto {
    dateCreated: string;
    dateUpdated?: any;
    userID: string;
    status: number;
    requestId: number;
  }