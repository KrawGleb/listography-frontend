import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, switchMap, takeUntil, tap, timer } from 'rxjs';
import { getRandomColor } from 'src/app/helpers/random-color.helper';
import { CommentModel } from 'src/app/models/comment.model';
import { Item } from 'src/app/models/item.model';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { GlobalSpinnerService } from 'src/app/modules/shared/components/spinner/global-spinner.service';
import { DestroyableComponent } from 'src/app/modules/shared/helpers/destroyable/destroyable.component';
import { ListsService } from 'src/app/modules/shared/services/api/lists.service';
import { SocialService } from 'src/app/modules/shared/services/api/social.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent extends DestroyableComponent {
  private id!: number;

  public isAuthorize = false;
  public item?: Item;
  public preparedColors: string[] = [];
  public comments: CommentModel[] = [];
  public commentsForm = new FormGroup({
    comment: new FormControl(''),
  });

  constructor(
    private readonly route: ActivatedRoute,
    private readonly listsService: ListsService,
    private readonly socialService: SocialService,
    private readonly authService: AuthService,
    private readonly spinnerService: GlobalSpinnerService
  ) {
    super();

    this.id = +this.route.snapshot.paramMap.get('id')!;
    this.isAuthorize = this.authService.isAuthorize();

    let item$ = this.listsService.getItem(this.id);

    this.spinnerService
      .wrap(item$)
      .pipe(
        takeUntil(this.onDestroy$),
        map((response) => response.body),
        tap((item) => {
          this.item = item;
          this.comments = item.comments;

          this.preparedColors = item.tags.map(() => getRandomColor());
        })
      )
      .subscribe();

    this.reloadComments();
  }

  public getRandomColor = getRandomColor;

  public likeButtonClick() {
    if (!this.item) return;

    this.item.liked ? this.dislike() : this.like();
  }

  public commentButtonClick() {
    const content = this.commentsForm.value.comment;

    if (content) {
      this.socialService
        .comment(this.id, content)
        .pipe(
          takeUntil(this.onDestroy$)
        )
        .subscribe();
    }

    this.commentsForm.controls.comment.setValue('');
  }

  private reloadComments() {
    timer(5000, 5000)
      .pipe(
        takeUntil(this.onDestroy$),
        switchMap(() => this.socialService.getComments(this.id)),
        tap((response: any) => {
          if (response.succeeded) {
            const latestComments = response.body;
            const newComments = latestComments.filter((c: CommentModel) =>
              this.comments.every((s) => s.id !== c.id)
            );

            if (newComments.length > 0) {
              this.comments.push(...newComments);
              console.log(newComments);
            }
          }
        })
      )
      .subscribe();
  }

  private like() {
    this.item!.liked = true;
    this.item!.totalLikesCount! += 1;

    this.socialService
      .like(this.item?.id!)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe();
  }

  private dislike() {
    this.item!.liked = false;
    this.item!.totalLikesCount! -= 1;

    this.socialService
      .dislike(this.item?.id!)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe();
  }
}
