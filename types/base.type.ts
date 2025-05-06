interface ITimeStamp {
  createdAt: string;
  updatedAt: string;
}

interface ApiResponse<T> {
  status: string;
  message: string;
  data: T;
  error?: string;
  errors?: string[];
}

export type { ITimeStamp, ApiResponse };
