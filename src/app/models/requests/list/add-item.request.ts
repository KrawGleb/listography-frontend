import { CustomField } from "../../custom-field.model";
import { Tag } from "../../tag.model";

export interface AddItemRequest {
  listId: number;
  name: string;
  tags: Tag[];
  customFields: CustomField[];
}
