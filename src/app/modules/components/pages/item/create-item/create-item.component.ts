import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  Observable,
  takeUntil,
  tap,
} from 'rxjs';
import { getRandomColor } from 'src/app/helpers/random-color.helper';
import { CustomField } from 'src/app/models/custom-field.model';
import { Item } from 'src/app/models/item.model';
import { AddItemRequest } from 'src/app/models/requests/list/add-item.request';
import { Tag } from 'src/app/models/tag.model';
import { ItemValidationRules } from 'src/app/models/validation/rules/item-validation-rules';
import { TagValidationRules } from 'src/app/models/validation/rules/tag-validation-rules';
import { GlobalSpinnerService } from 'src/app/modules/shared/components/spinner/global-spinner.service';
import { DestroyableComponent } from 'src/app/modules/shared/helpers/destroyable/destroyable.component';
import { ListsService } from 'src/app/modules/shared/services/api/lists.service';
import { TagsService } from 'src/app/modules/shared/services/api/tags.service';
import { RouteService } from 'src/app/modules/shared/services/common/route.service';

@Component({
  selector: 'app-create-item',
  templateUrl: './create-item.component.html',
  styleUrls: ['./create-item.component.scss'],
})
export class CreateItemComponent
  extends DestroyableComponent
  implements OnInit
{
  public tagValidationRules = TagValidationRules;
  public itemValidationRules = ItemValidationRules;

  private allTags: Tag[] = [];
  private listId!: number;

  public template!: Item;
  public itemId?: number;
  public item?: Item;
  public tags: any[] = [];
  public isEdit: boolean = false;
  public customFields: CustomField[] = [];

  public form = new FormGroup({
    name: new FormControl(''),
    tag: new FormControl(''),
  });
  public customFieldsForm = new FormGroup({});

  constructor(
    private readonly routeService: RouteService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly listsService: ListsService,
    private readonly snackBar: MatSnackBar,
    private readonly tagsService: TagsService,
    private readonly spinnerService: GlobalSpinnerService
  ) {
    super();

    const data = this.routeService.popData();

    if (!data) {
      this.router.navigateByUrl('/home');
    }

    this.listId = data.listId;
    this.isEdit = !!data.isEdit;

    this.tagsService
      .getAll()
      .pipe(
        takeUntil(this.onDestroy$),
        tap((t) => {
          this.allTags = t;
          console.log(t);
        })
      )
      .subscribe();

    if (this.isEdit) {
      this.item = data.item;
      this.template = data.item;
      this.itemId = +this.route.snapshot.paramMap.get('id')!;
    } else {
      this.template = data.template;
    }
  }

  ngOnInit(): void {
    this.initForm();
  }

  public getBackgroundColor = getRandomColor;

  public searchByTags = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map((term) =>
        term.length < 2
          ? []
          : this.allTags
              .filter(
                (v) => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1
              )
              .slice(0, 10)
              .map((t) => t.name)
              .filter((v, i, a) => a.indexOf(v) === i)
      )
    );

  public areFormsInvalid() {
    return this.form.invalid || this.customFieldsForm.invalid;
  }

  public getFormControl(formControlName: string) {
    return (this.form.controls as any)[formControlName];
  }

  public addTag() {
    const tag = {
      name: this.form.value.tag,
      color: getRandomColor(),
    };

    if (this.tags.every((t) => t.name !== tag.name)) {
      this.tags.push(tag);
    }

    this.form.controls.tag.setValue('');
  }

  public removeTag(tag: Tag) {
    this.tags = this.tags.filter((t) => t !== tag);
  }

  public create() {
    const formValue = this.form.value;
    const tags = this.tags.map((t) => t as Tag);
    const customFieldsValues = Object.values(this.customFieldsForm.value).map(
      (v) => v as CustomField
    );
    let response$: Observable<any>;

    if (this.isEdit) {
      const item = {
        id: this.itemId,
        tags: tags,
        name: formValue.name,
        customFields: customFieldsValues,
      } as Item;

      response$ = this.listsService.updateItem(item);
    } else {
      const request = {
        listId: this.listId,
        name: formValue.name,
        tags: tags,
        customFields: customFieldsValues,
      } as AddItemRequest;

      response$ = this.listsService.addItem(request);
    }

    this.spinnerService
      .wrap(response$)
      .pipe(
        tap((response) => {
          if (response.succeeded) {
            this.router.navigateByUrl(`/list/update/${this.listId}`);
          } else {
            this.snackBar.open((response as any).errors[0], 'Ok', {
              duration: 2000,
            });
          }
        })
      )
      .subscribe();
  }

  private initForm() {
    this.form.controls.name.setValue(this.item?.name ?? '');
    this.tags =
      this.item?.tags?.map((tag) => {
        return { ...tag, color: getRandomColor() };
      }) ?? [];

    this.customFields = this.isEdit
      ? this.item?.customFields!
      : this.template.customFields;

    this.customFields.forEach((field: CustomField) => {
      this.customFieldsForm.addControl(field.name, new FormControl(field));
    });
  }
}
