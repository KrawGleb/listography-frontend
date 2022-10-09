import { Item } from "./item.model";
import { Tag } from "./tag.model";
import { Topic } from "./topic.model";

export interface List {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  topic: Topic;
  tags: Tag[];
  itemTemplate: Item;
  items: Item[];
}
