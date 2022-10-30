import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, switchMap, takeUntil, tap } from 'rxjs';
import { Item } from 'src/app/models/item.model';
import { SearchItem } from 'src/app/models/search-item.model';
import { GlobalSpinnerService } from 'src/app/modules/shared/components/spinner/global-spinner.service';
import { DestroyableComponent } from 'src/app/modules/shared/helpers/destroyable/destroyable.component';
import { SearchService } from 'src/app/modules/shared/services/api/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent extends DestroyableComponent {
  public items$!: Observable<SearchItem[]>;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly searchService: SearchService,
    private readonly spinnerService: GlobalSpinnerService
  ) {
    super();

    this.items$ = this.route.params.pipe(
      map((params: any) => params.value),
      switchMap((value) => this.searchByValue(value))
    );
  }

  private searchByValue(value: string) {
    const search$ = this.searchService.search(value);

    return this.spinnerService.wrap(search$).pipe(
      takeUntil(this.onDestroy$),
      map((response) => response.body)
    );
  }
}
