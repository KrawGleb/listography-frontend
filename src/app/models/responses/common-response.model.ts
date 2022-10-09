import { ApiResponse } from "./api-response.model";

export interface CommonResponse<T> extends ApiResponse {
  body: T;
}
