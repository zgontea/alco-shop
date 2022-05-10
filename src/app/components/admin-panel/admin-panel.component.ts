import {Component, OnDestroy, OnInit} from '@angular/core';
import {AdminAction} from "../../wrappers/admin-action";
import {Router} from "@angular/router";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit, OnDestroy {

  // whereToNavigate = 'product/add'
  // actions: AdminAction[] = [
  //   {
  //     header: 'Add a new product',
  //     link: 'product/add',
  //     icon: 'plus-square'
  //   }
  // ]
  constructor() { }

  ngOnInit(): void {
    //this.router.navigateByUrl('/admin-panel/product/add');
  }

  public ngOnDestroy(): void {}
}
