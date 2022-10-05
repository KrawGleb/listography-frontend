import { CustomField } from "./custom-field.model";

export interface Item {
  id: number;
  name: string;
  customFields: CustomField[];
}
