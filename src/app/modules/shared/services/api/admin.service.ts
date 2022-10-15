import { Injectable } from '@angular/core';
import { HttpService } from '../common/http.service';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private readonly httpService: HttpService) {}

  public getUserInfo(username: string) {
    return this.httpService.get(`/admins/${username}`, true);
  }

  public addAdmin(username: string) {
    return this.httpService.patch('/admins/appoint', { username }, true);
  }

  public removeAdmin(username: string) {
    return this.httpService.patch('/admins/remove', { username }, true);
  }

  public blockUser(username: string) {
    return this.httpService.patch('/admins/block', { username }, true);
  }

  public unblockUser(username: string) {
    return this.httpService.patch('/admins/unblock', { username }, true);
  }

  public deleteUser(username: string) {
    return this.httpService.delete('/admins/delete', { username }, true);
  }
}
