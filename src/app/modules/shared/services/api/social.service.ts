import { Injectable } from '@angular/core';
import { HttpService } from '../common/http.service';

@Injectable({
  providedIn: 'root',
})
export class SocialService {
  constructor(private readonly httpService: HttpService) {}

  public like(itemId: number) {
    return this.httpService.post(
      '/social/like',
      {
        itemId,
      },
      true
    );
  }

  public dislike(itemId: number) {
    return this.httpService.post(
      '/social/dislike',
      {
        itemId,
      },
      true
    );
  }

  public comment(itemId: number, content: string) {
    return this.httpService.post(
      '/social/comment',
      {
        itemId,
        content,
      },
      true
    );
  }
}
