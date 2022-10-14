import { Component, Input, OnInit } from '@angular/core';
import { takeUntil, tap } from 'rxjs';
import { DestroyableComponent } from '../../../helpers/destroyable/destroyable.component';
import { AdminService } from '../../../services/api/admin.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent extends DestroyableComponent implements OnInit {
  @Input() public username?: string;
  public isAdmin: boolean = false;
  public blocked: boolean = false;

  constructor(private readonly adminService: AdminService) {
    super();
  }

  ngOnInit(): void {
    this.adminService
      .getUserInfo(this.username!)
      .pipe(
        takeUntil(this.onDestroy$),
        tap((res: any) => {
          if (res.succeeded) {
            this.isAdmin = res.body.isAdmin;
            this.blocked = res.body.blocked;
          }
        })
      )
      .subscribe();
  }

  public adminCheckboxChanged(value: boolean) {
    let request$ = value
      ? this.adminService.addAdmin(this.username!)
      : this.adminService.removeAdmin(this.username!);

    request$.pipe(takeUntil(this.onDestroy$)).subscribe();
  }

  public blockedCheckboxChanged(value: boolean) {
    let request$ = value
      ? this.adminService.blockUser(this.username!)
      : this.adminService.unblockUser(this.username!);

    request$.pipe(takeUntil(this.onDestroy$)).subscribe();
  }

  public deleteClick() {
    this.adminService
      .deleteUser(this.username!)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe();
  }
}
