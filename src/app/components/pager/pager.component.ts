import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.scss']
})
export class PagerComponent{

  @Input()
  totalPages = 0;

  @Input()
  currentPage = 0;

  @Output() pageChanged = new EventEmitter<number>();



}
