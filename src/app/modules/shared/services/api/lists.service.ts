import { Injectable } from '@angular/core';
import { List } from 'src/app/models/list.model';
import { AddItemRequest } from 'src/app/models/requests/list/add-item.request';
import { SaveListInfoRequest } from 'src/app/models/requests/list/save-info.request';
import { CommonResponse } from 'src/app/models/responses/common-response.model';
import { ErrorResponse } from 'src/app/models/responses/error-response.model';
import { Item } from 'src/app/models/item.model';
import { ApiResponse } from 'src/app/models/responses/api-response.model';
import { map } from 'rxjs';
import { HttpService } from '../common/http.service';

@Injectable({
  providedIn: 'root',
})
export class ListsService {
  constructor(private readonly httpService: HttpService) {}

  public create(list: List) {
    return this.httpService.post<ApiResponse>('/lists/create', list, true);
  }

  public get(id: number) {
    return this.httpService
      .get<CommonResponse<List>>(`/lists/${id}`)
      .pipe(map((response) => response.body));
  }

  public updateInfo(request: SaveListInfoRequest) {
    return this.httpService.patch<ApiResponse>('/lists/update', request, true);
  }

  public delete(listId: number) {
    return this.httpService.delete(
      '/lists/delete',
      {
        listId: listId,
      },
      true
    );
  }

  public addItem(request: AddItemRequest) {
    return this.httpService.post<CommonResponse<Item> | ErrorResponse>(
      '/items/create',
      request,
      true
    );
  }

  public deleteItem(itemId: number) {
    return this.httpService.delete(
      '/items/delete',
      {
        id: itemId,
      },
      true
    );
  }

  public getItem(itemId: number) {
    return this.httpService.get<CommonResponse<Item>>(
      `/items/${itemId}`,
      true
    );
  }

  public updateItem(item: Item) {
    return this.httpService.patch<Response>('/items/update', item, true);
  }
}
