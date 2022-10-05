import { Component, Input, OnInit } from '@angular/core';
import { List } from 'src/app/models/list.model';

@Component({
  selector: 'app-list-header',
  templateUrl: './list-header.component.html',
  styleUrls: ['./list-header.component.scss']
})
export class ListHeaderComponent implements OnInit {
  @Input() public isEdit: boolean = false;
  @Input() public list!: List;

  constructor() { }

  ngOnInit(): void {
  }

}
