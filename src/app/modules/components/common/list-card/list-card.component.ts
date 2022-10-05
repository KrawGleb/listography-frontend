import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Tag } from 'src/app/models/tag.model';
import { Topic } from 'src/app/models/topic.model';

@Component({
  selector: 'app-list-card',
  templateUrl: './list-card.component.html',
  styleUrls: ['./list-card.component.scss'],
})
export class ListCardComponent {
  @Input() public id?: number = -1;
  @Input() public title?: string = '';
  @Input() public description?: string = '';
  @Input() public imageUrl?: string =
    'https://material.angular.io/assets/img/examples/shiba2.jpg';
  @Input() public tags?: Tag[] = [];
  @Input() public topic?: Topic;
  @Input() public clickable?: boolean = false;
  @Input() public editable?: boolean = false;

  constructor(private readonly router: Router) {}

  public editClick() {
    this.router.navigateByUrl(`/list/update/${this.id}`);
  }
}
