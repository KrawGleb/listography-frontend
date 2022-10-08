import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  Self,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  FormGroup,
  NgControl,
} from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
import { Observable, Subject } from 'rxjs';
import {
  getCustomFieldValue,
  setCustomFieldValue,
} from 'src/app/helpers/custom-field.helpers';
import { CustomField } from 'src/app/models/custom-field.model';
import { CustomFieldType } from 'src/app/models/enums/custom-field-type.enum';

@Component({
  selector: 'app-custom-field-input',
  templateUrl: './custom-field-input.component.html',
  styleUrls: ['./custom-field-input.component.scss'],
})
export class CustomFieldInputComponent
  implements
    ControlValueAccessor,
    MatFormFieldControl<CustomField>,
    OnDestroy,
    OnInit
{
  static nextId = 0;
  public CustomFieldTypes = CustomFieldType;

  public form = new FormGroup({
    value: new FormControl(),
  });

  public autofilled?: boolean | undefined;
  public stateChanges = new Subject<void>();
  public focused: boolean = false;
  public touched: boolean = false;
  public controlType: string = 'custom-field-input';
  public id: string = `custom-field-input-${CustomFieldInputComponent.nextId++}`;
  public onChange = (_: any) => {};
  public onTouched = () => {};
  public getCustomFieldValue = getCustomFieldValue;

  get empty() {
    return !this.form.value.value;
  }

  get shouldLabelFloat() {
    return this.focused && !this.empty;
  }

  @Input() public field!: CustomField;
  @Input('aria-describedby') public userAriaDescribedBy?: string;

  @Input()
  get placeholder(): string {
    return this._placeholder;
  }
  set placeholder(value: string) {
    this._placeholder = value;
    this.stateChanges.next();
  }
  private _placeholder: string = '';

  @Input()
  get required(): boolean {
    return this._required;
  }
  set required(value: BooleanInput) {
    this._required = coerceBooleanProperty(value);
    this.stateChanges.next();
  }
  private _required = false;

  @Input()
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(value: BooleanInput) {
    this._disabled = coerceBooleanProperty(value);
    this._disabled ? this.form.disable() : this.form.enable();
    this.stateChanges.next();
  }
  private _disabled = false;

  @Input()
  get value(): CustomField | null {
    if (this.form.valid) {
      setCustomFieldValue(this.field, this.form.value.value);
      return this.field;
    }
    return null;
  }
  set value(field: CustomField | null) {
    if (field) {
      // if (field.type === CustomFieldType.BoolType) {
      //   field.boolValue = false;
      //   this.form.controls.value.markAsTouched();
      // }

      this.field = field;

      this.form.setValue({
        value: getCustomFieldValue(field),
      });
    }
    this.stateChanges.next();
  }

  get errorState(): boolean {
    return this.form.invalid;
  }

  constructor(@Optional() @Self() public ngControl: NgControl) {
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
  }

  ngOnInit(): void {
    if (this.field.type == CustomFieldType.BoolType) {
      this.field.boolValue = false;
      this.onChange(this.field);
    }
  }

  ngOnDestroy(): void {
    this.stateChanges.complete();
  }

  setDescribedByIds(ids: string[]): void {}
  onContainerClick(event: MouseEvent): void {}

  writeValue(obj: any): void {
    this.value = obj;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  public _handleInput() {
    this.onChange(this.value);
  }
}
