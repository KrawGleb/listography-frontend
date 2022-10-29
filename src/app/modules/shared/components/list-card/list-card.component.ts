import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { filter, takeUntil, tap } from 'rxjs';
import { topicToIcon } from 'src/app/helpers/topic-to-icon.helper';
import { Tag } from 'src/app/models/tag.model';
import { Topic } from 'src/app/models/topic.model';
import { ConfirmationDialogComponent } from 'src/app/modules/shared/components/confirmation-dialog/confirmation-dialog.component';
import { DestroyableComponent } from '../../helpers/destroyable/destroyable.component';
import { ListsService } from '../../services/api/lists.service';

@Component({
  selector: 'app-list-card',
  templateUrl: './list-card.component.html',
  styleUrls: ['./list-card.component.scss'],
})
export class ListCardComponent extends DestroyableComponent {
  @Input() public id?: number = -1;
  @Input() public title?: string = '';
  @Input() public description?: string = '';
  @Input() public imageUrl?: string =
    'https://material.angular.io/assets/img/examples/shiba2.jpg';
  @Input() public tags?: Tag[] = [];
  @Input() public topic?: Topic;
  @Input() public clickable?: boolean = false;
  @Input() public editable?: boolean = false;
  @Input() public canExport: boolean = false;

  @Output() public listDeleted = new EventEmitter<number>();

  constructor(
    private readonly router: Router,
    private readonly dialog: MatDialog,
    private readonly listsService: ListsService
  ) {
    super();
  }

  public topicToIcon = topicToIcon;

  public editClick() {
    this.router.navigateByUrl(`/list/update/${this.id}`);
  }

  public deleteClick() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      maxWidth: '400px',
      data: {
        title: 'List.Actions.Delete.ConfirmationTitle',
        message: 'List.Actions.Delete.ConfirmationMessage',
      },
    });

    dialogRef.afterClosed().pipe(
      filter((res) => res),
      tap(() => {
        this.listsService.delete(this.id!)
          .pipe(
            takeUntil(this.onDestroy$),
            tap(() => this.listDeleted.emit(this.id)))
          .subscribe();
      })
    )
    .subscribe();
  }

  public downloadClick() {
    if (this.id) this.listsService.download(this.id);
  }
}
