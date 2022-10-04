import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent{
  private id!: number;

  constructor(private readonly route: ActivatedRoute) {
    this.id = +this.route.snapshot.paramMap.get('id')!;

    console.log(this.id);
  }

}
