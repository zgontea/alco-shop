import { Component, OnDestroy, OnInit } from '@angular/core';
import { AdminAction } from '../../wrappers/admin-action';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { Observable, Observer } from 'rxjs';
import { ProductsViewComponent } from '../products-view/products-view.component';

export interface Tab {
  index: number;
  component: string;
}

const TABS: Tab[] = [
  {
    index: 0,
    component: 'user-list',
  },
  {
    index: 1,
    component: 'product-list',
  },
  {
    index: 2,
    component: 'statistics',
  },
];

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss'],
})
export class AdminPanelComponent implements OnInit, OnDestroy {
  constructor(private router: Router) {}

  changeTab($event: { index: number }) {
    console.log($event.index);
    this.router.navigate(['admin-panel/' + TABS[$event.index].component]);
  }

  ngOnInit(): void {
    if (localStorage.getItem('is_admin') === 'false') {
      this.router.navigate(['/error']);
      return;
    }
    this.router.navigate(['admin-panel/user-list']);
  }

  public ngOnDestroy(): void {}
}
