import { ApprovalStatus } from "../Enum/STATUS"; // Import the ApprovalStatus enum
export interface ApprovalRequestDto {
    username:string;
}


export interface ApprovalResponseDto {
  dateCreated: string;
  dateUpdated: string;
  username: string;
  name: string;
  userID: string;
  status: ApprovalStatus; // Use the imported ApprovalStatus enum
  requestId: number;
}

export interface ChangeApprovalStatusDto {
  status: number,
  requestId: number
}
