import { Component, OnInit } from '@angular/core';
import { map, takeUntil, tap } from 'rxjs';
import { getRandomColor } from 'src/app/helpers/random-color.helper';
import { HomeInfo } from 'src/app/models/home-info.model';
import { CommonResponse } from 'src/app/models/responses/common-response.model';
import { DestroyableComponent } from 'src/app/modules/shared/helpers/destroyable/destroyable.component';
import { HomeService } from 'src/app/modules/shared/services/api/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent extends DestroyableComponent implements OnInit {
  public info?: HomeInfo;

  constructor(private readonly homeService: HomeService) {
    super();

    this.homeService
      .getHomeInfo()
      .pipe(
        takeUntil(this.onDestroy$),
        map((response: any) => response.body),
        tap((info) => (this.info = info))
      )
      .subscribe();
  }

  public getRandomColor = getRandomColor;

  ngOnInit(): void {}
}
