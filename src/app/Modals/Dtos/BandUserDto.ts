// BannedUserDTO.interface.ts

export interface BannedUserResponceDTO {
  id: number;
  userId:string,
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  startDate: Date;
  endDate: Date;
  status: number;
}


export interface BannedUserUpdateRequestDTO {
  banId: number
  status: number

}

export interface BannedUserRequestDTO {

  userId:string
  startDate:Date
  endDate:Date
  status:BannedStatus
}


export enum BannedStatus {
  Inactive=0,
  Active,
}

export interface bandUserStatus {
  userId: string;
  userName: string;
  status: number;
}
