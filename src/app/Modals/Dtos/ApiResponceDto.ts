export interface apiResponce<T> {
  Success: boolean;
  Status: number;
  Data: T;
}

export interface apiResponceWithMessage  {
  message: string;
}

export interface ApiResponceDto{
  Success: boolean;
  Status: number;
  Data:
  {
    message: string;
  }
}
