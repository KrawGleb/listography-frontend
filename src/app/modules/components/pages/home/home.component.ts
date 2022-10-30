import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, takeUntil, tap } from 'rxjs';
import { getRandomColor } from 'src/app/helpers/random-color.helper';
import { HomeInfo } from 'src/app/models/home-info.model';
import { CommonResponse } from 'src/app/models/responses/common-response.model';
import { GlobalSpinnerService } from 'src/app/modules/shared/components/spinner/global-spinner.service';
import { DestroyableComponent } from 'src/app/modules/shared/helpers/destroyable/destroyable.component';
import { HomeService } from 'src/app/modules/shared/services/api/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent extends DestroyableComponent {
  public info?: HomeInfo;
  public colors: string[] = [];

  constructor(
    private readonly homeService: HomeService,
    private readonly router: Router,
    private readonly spinnerService: GlobalSpinnerService
  ) {
    super();

    const homeInfo$ = this.homeService.getHomeInfo();
    this.spinnerService
      .wrap(homeInfo$)
      .pipe(
        takeUntil(this.onDestroy$),
        map((response: any) => response.body),
        tap((info: HomeInfo) => {
          this.info = info;
          this.colors = info.tags.map((t) => getRandomColor());
        })
      )
      .subscribe();
  }

  public searchByTag(tag: string) {
    this.router.navigateByUrl(`/search/${tag}`);
  }
}
