import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, takeUntil, takeWhile, tap } from 'rxjs';
import { List } from 'src/app/models/list.model';
import { UpdateListInfoRequest } from 'src/app/models/requests/list/update-info.request';
import { FirebaseService } from 'src/app/modules/common/services/firebase.service';
import { ListsService } from 'src/app/modules/common/services/lists.service';
import { DestroyableComponent } from 'src/app/modules/components/helpers/destroyable/destroyable.component';

@Component({
  selector: 'app-list-editable-header',
  templateUrl: './list-editable-header.component.html',
  styleUrls: ['./list-editable-header.component.scss'],
})
export class ListEditableHeaderComponent
  extends DestroyableComponent
  implements OnInit
{
  private list$ = new BehaviorSubject<List>({} as List);

  @Input()
  public set list(value: List) {
    this.list$.next(value);
  }

  public get list() {
    return this.list$.getValue();
  }

  public get imageUrl() {
    return this.form.value.imageUrl;
  }

  public form = new FormGroup({
    topic: new FormControl(''),
    title: new FormControl(''),
    description: new FormControl(''),
    imageUrl: new FormControl(''),
  });

  constructor(
    private readonly firebaseService: FirebaseService,
    private readonly listsService: ListsService,
    private readonly router: Router
  ) {
    super();
  }

  ngOnInit(): void {
    this.list$
      .pipe(
        takeUntil(this.onDestroy$),
        tap((list) => this.initForm(list))
      )
      .subscribe();
  }

  public uploadImage(event: any) {
    const file = event.target.files[0];
    const path = this.list.id.toString();

    this.firebaseService
      .uploadImage(path, file)
      .pipe(
        takeUntil(this.onDestroy$),
        tap((imageUrl) => this.form.controls.imageUrl.setValue(imageUrl))
      )
      .subscribe();
  }

  public saveListInfo() {
    const info = {
      id: this.list.id,
      title: this.form.value.title,
      description: this.form.value.description,
      imageUrl: this.form.value.imageUrl,
      topic: { name: this.form.value.topic },
    } as UpdateListInfoRequest;

    this.listsService
      .updateInfo(info)
      .pipe(
        takeUntil(this.onDestroy$),
        tap(() => this.router.navigateByUrl('/me'))
      )
      .subscribe();
  }

  private initForm(list: List) {
    if (!list) return;

    this.form.setValue({
      topic: list.topic?.name ?? '',
      title: list.title,
      description: list.description,
      imageUrl: list.imageUrl,
    });
  }
}
