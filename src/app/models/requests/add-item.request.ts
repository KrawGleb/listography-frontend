import { CustomField } from "../custom-field.model";

export interface AddItemRequest {
  listId: number;
  name: string;
  customFields: CustomField[];
}
