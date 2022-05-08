import { Component, OnInit } from '@angular/core';
import {AdminAction} from "../../wrappers/admin-action";

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {

  actions: AdminAction[] = [
    {
      header: 'Add a new product',
      link: '/admin/product/add',
      icon: 'plus-square'
    }
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
