export * from "./product";
export * from "./order";
export * from "./user";

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
