import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { getCustomFieldValue } from 'src/app/helpers/custom-field.helpers';
import { getRandomColor } from 'src/app/helpers/random-color.helper';
import { CustomField } from 'src/app/models/custom-field.model';
import { Item } from 'src/app/models/item.model';
import { CreateItemRequest } from 'src/app/models/requests/item/create-item.request';
import { Tag } from 'src/app/models/tag.model';
import { RouteService } from 'src/app/modules/shared/services/common/route.service';

@Component({
  selector: 'app-create-item',
  templateUrl: './create-item.component.html',
  styleUrls: ['./create-item.component.scss'],
})
export class CreateItemComponent implements OnInit {
  private listId!: number;
  public template!: Item;
  public tags: any[] = [];

  public form = new FormGroup({
    name: new FormControl(''),
    tag: new FormControl(''),
  });
  public customFieldsForm = new FormGroup({});

  constructor(
    private readonly routeService: RouteService,
    private readonly router: Router,
    private readonly cdr: ChangeDetectorRef
  ) {
    const data = this.routeService.popData();

    if (!data) {
      this.router.navigateByUrl('/home');
    }

    this.listId = data.listId;
    this.template = data.template;
  }

  ngOnInit(): void {
    this.initForm();

    this.cdr.markForCheck();
  }

  public getBackgroundColor = getRandomColor;

  public areFormsInvalid() {
    return this.form.invalid
      || this.customFieldsForm.invalid;
  }

  public getFormControl(formControlName: string) {
    return (this.form.controls as any)[formControlName];
  }

  public addTag() {
    const tag = {
      name: this.form.value.tag,
      color: getRandomColor(),
    };

    this.tags.push(tag);
  }

  public removeTag(tag: Tag) {
    this.tags = this.tags.filter((t) => t !== tag);
  }

  public create() {
    const formValue = this.form.value;
    const tags = this.tags.map((t) => t as Tag);

    const request = {
      listId: this.listId,
      name: formValue.name,
      tags: tags,
      customFields: Object.values(this.customFieldsForm.value),
    } as CreateItemRequest;

    console.log(request);
  }

  private initForm() {
    this.template.customFields.forEach((field: CustomField) => {
      const controlValue = getCustomFieldValue(field);

      this.customFieldsForm.addControl(
        field.name,
        new FormControl(controlValue)
      );
    });
  }
}
