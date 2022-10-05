import { List } from "./list.model";

export interface Account {
  id: string;
  userName: string;
  email: string;
  lists: List[];
}
