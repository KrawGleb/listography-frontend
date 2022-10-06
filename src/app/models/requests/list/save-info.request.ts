import { Topic } from "../../topic.model";

export interface SaveListInfoRequest {
  listId: number;
  topic?: Topic;
  title: string;
  description: string;
  imageUrl: string;
}
