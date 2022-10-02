import { Tag } from "../../tag.model";
import { Topic } from "../../topic.model";

export interface UpdateListInfoRequest {
  listId: number;
  topic?: Topic;
  title: string;
  description: string;
  imageUrl: string;
  tags: Tag[];
}
