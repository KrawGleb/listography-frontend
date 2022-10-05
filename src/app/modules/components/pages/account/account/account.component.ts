import { Component, Input, OnInit } from '@angular/core';
import { List } from 'src/app/models/list.model';
import { DestroyableComponent } from '../../../helpers/destroyable/destroyable.component';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent extends DestroyableComponent {
  @Input() public lists!: List[];
  @Input() public editable: boolean = false;
}
