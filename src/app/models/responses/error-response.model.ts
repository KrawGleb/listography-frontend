import { ApiResponse } from "./api-response.model";

export interface ErrorResponse extends ApiResponse {
  errors: string[];
}
