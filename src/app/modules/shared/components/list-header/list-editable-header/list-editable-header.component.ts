import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Guid } from 'guid-typescript';
import { Editor, toHTML, Validators } from 'ngx-editor';
import { BehaviorSubject, takeUntil, takeWhile, tap } from 'rxjs';
import { topicToIcon } from 'src/app/helpers/topic-to-icon.helper';
import { Topics } from 'src/app/models/constants/topics.constants';
import { List } from 'src/app/models/list.model';
import { SaveListInfoRequest } from 'src/app/models/requests/list/save-info.request';
import { ListValidationRules } from 'src/app/models/validation/rules/list-validation-rules';
import { DestroyableComponent } from 'src/app/modules/shared/helpers/destroyable/destroyable.component';
import { FirebaseService } from '../../../services/api/firebase.service';
import { richTextMaxLengthValidator } from '../../../validators/list-description.validator';

@Component({
  selector: 'app-list-editable-header',
  templateUrl: './list-editable-header.component.html',
  styleUrls: ['./list-editable-header.component.scss'],
})
export class ListEditableHeaderComponent
  extends DestroyableComponent
  implements OnInit
{
  public listValidation = ListValidationRules;

  private list$ = new BehaviorSubject<List>({} as List);
  private editorValue: string = '';

  public editor = new Editor();

  @Input()
  public set list(value: List) {
    this.list$.next(value);
  }

  public get list() {
    return this.list$.getValue();
  }

  @Input() public createNew: boolean = false;
  @Output() public onSave = new EventEmitter<SaveListInfoRequest>();

  public topics = Topics.Topics;
  public topicToIcon = topicToIcon;

  public get imageUrl() {
    return this.form.value.imageUrl;
  }

  public get topic() {
    return this.form.value.topic;
  }

  public form = new FormGroup({
    title: new FormControl(''),
    topic: new FormControl(''),
    imageUrl: new FormControl(''),
    description: new FormControl('', [
      richTextMaxLengthValidator(),
    ]),
  });

  constructor(private readonly firebaseService: FirebaseService) {
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
    const path = Guid.create().toString();

    this.firebaseService
      .uploadImage(path, file)
      .pipe(
        takeUntil(this.onDestroy$),
        tap((imageUrl) => {
          console.log(imageUrl);
          this.form.controls.imageUrl.setValue(imageUrl);
        })
      )
      .subscribe();
  }

  public saveListInfo() {
    const info = {
      listId: this.list.id,
      title: this.form.value.title,
      description: this.form.value.description,
      imageUrl: this.form.value.imageUrl,
      topic: { name: this.form.value.topic },
    } as SaveListInfoRequest;

    this.onSave.emit(info);
  }

  private initForm(list: List) {
    if (!list) return;

    this.form.setValue({
      topic: list.topic?.name ?? '',
      title: list.title ?? '',
      imageUrl: list.imageUrl ?? '',
      description: list.description ?? '',
    });

    this.form.valueChanges.subscribe((v) => console.log(this.form.value.description?.length));
  }
}
