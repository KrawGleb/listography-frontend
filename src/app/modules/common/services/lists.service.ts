import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { List } from 'src/app/models/list.model';
import { AddItemRequest } from 'src/app/models/requests/add-item.request';

@Injectable({
  providedIn: 'root'
})
export class ListsService {

  constructor(private readonly httpService: HttpService) { }

  public create(list: List) {
    return this.httpService.post('/lists/create', list, true);
  }

  public get(id: number) {
    return this.httpService.get<List>(`/lists/${id}`);
  }

  public addItem(request: AddItemRequest) {
    return this.httpService.post('/lists/add', request, true);
  }
}
