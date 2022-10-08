import { List } from "./list.model";
import { Tag } from "./tag.model";

export interface HomeInfo {
  tags: Tag[];
  largestLists: List[];
  lastCreatedItems: {
    id: number;
    listName: string;
    name: string;
    author: string;
  }[]
}
