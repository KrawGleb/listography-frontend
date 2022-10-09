import { Injectable } from '@angular/core';
import { Item } from 'src/app/models/item.model';
import { CommonResponse } from 'src/app/models/responses/common-response.model';
import { SearchItem } from 'src/app/models/search-item.model';
import { HttpService } from '../common/http.service';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(private readonly httpService: HttpService) {}

  public search(value: string) {
    return this.httpService.get<CommonResponse<SearchItem[]>>(
      `/search/${value}`
    );
  }
}
