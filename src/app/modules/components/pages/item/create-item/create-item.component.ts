import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { getRandomColor } from 'src/app/helpers/random-color.helper';
import { CustomField } from 'src/app/models/custom-field.model';
import { Item } from 'src/app/models/item.model';
import { AddItemRequest } from 'src/app/models/requests/list/add-item.request';
import { Tag } from 'src/app/models/tag.model';
import { ItemValidationRules } from 'src/app/models/validation/rules/item-validation-rules';
import { TagValidationRules } from 'src/app/models/validation/rules/tag-validation-rules';
import { GlobalSpinnerService } from 'src/app/modules/shared/components/spinner/global-spinner.service';
import { ListsService } from 'src/app/modules/shared/services/api/lists.service';
import { RouteService } from 'src/app/modules/shared/services/common/route.service';

@Component({
  selector: 'app-create-item',
  templateUrl: './create-item.component.html',
  styleUrls: ['./create-item.component.scss'],
})
export class CreateItemComponent implements OnInit {
  public tagValidationRules = TagValidationRules;
  public itemValidationRules = ItemValidationRules;


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
    private readonly cdr: ChangeDetectorRef,
    private readonly listsService: ListsService,
    private readonly snackBar: MatSnackBar,
    private readonly spinnerService: GlobalSpinnerService
  ) {
    const data = this.routeService.popData();

    if (!data) {
      this.router.navigateByUrl('/home');
    }

    this.listId = data.listId;
    this.isEdit = !!data.isEdit;

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

    this.cdr.markForCheck();
  }

  public getBackgroundColor = getRandomColor;

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
