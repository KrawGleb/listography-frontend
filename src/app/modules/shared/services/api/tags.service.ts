import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { CommonResponse } from 'src/app/models/responses/common-response.model';
import { Tag } from 'src/app/models/tag.model';
import { HttpService } from '../common/http.service';

@Injectable({
  providedIn: 'root',
})
export class TagsService {
  constructor(private readonly httpService: HttpService) {}

  public getAll() {
    return this.httpService
      .get<CommonResponse<Tag[]>>('/tags/all')
      .pipe(map((response) => response.body));
  }
}
