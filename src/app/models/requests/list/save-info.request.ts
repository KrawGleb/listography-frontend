import { Tag } from "../../tag.model";
import { Topic } from "../../topic.model";

export interface SaveListInfoRequest {
  id: number;
  topic?: Topic;
  title: string;
  description: string;
  imageUrl: string;
  tags: Tag[];
}
