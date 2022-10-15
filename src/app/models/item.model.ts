import { CommentModel } from "./comment.model";
import { CustomField } from "./custom-field.model";
import { Tag } from "./tag.model";

export interface Item {
  id: number;
  name: string;
  tags: Tag[];
  customFields: CustomField[];
  comments: CommentModel[];

  totalLikesCount?: number;
  liked?: boolean;
}
