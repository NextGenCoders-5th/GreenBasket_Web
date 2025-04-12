 interface ITimeStamp {
    createdAt: string;
    updatedAt: string;
}

 interface ApiResponse<T> {
   data: {
    status: string;
    message: string;
    data: T;
    error?: string;
    errors?: string[];
   }
}

export type { ITimeStamp, ApiResponse };