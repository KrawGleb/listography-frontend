import { ApiResponse } from "./api-response.model";

export interface CommonResponse extends ApiResponse {
  body?: any;
}
