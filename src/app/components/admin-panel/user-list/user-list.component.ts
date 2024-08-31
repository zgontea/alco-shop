import { Component, OnInit, ViewChild } from '@angular/core';
import { UsersService } from 'src/app/services/users/users.service';
import { User } from 'src/app/wrappers/user';
import { SnackBarNotificationUtil } from 'src/app/utils/snack-bar-notification-util';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BAD_REQUEST_ERROR, CLOSE_BUTTON, NO_ACCESS_ERROR } from 'src/app/globals';
import { MatTable } from '@angular/material/table';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpErrorHandler } from 'src/app/utils/http-error-handler';

export interface UserWrapper {
  position: number;
  data: User;
}

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent extends HttpErrorHandler implements OnInit {
  @ViewChild(MatTable) table!: MatTable<UserWrapper>;
  public users: User[] = [];
  public value = '';
  columns = [
    {
      columnDef: 'position',
      header: 'No.',
      cell: (element: UserWrapper) => `${element.position}`,
    },
    {
      columnDef: 'name',
      header: 'Imię',
      cell: (element: UserWrapper) => `${element.data.firstname}`,
    },
    {
      columnDef: 'surname',
      header: 'Nazwisko',
      cell: (element: UserWrapper) => `${element.data.lastname}`,
    },
    {
      columnDef: 'email',
      header: 'Email',
      cell: (element: UserWrapper) => `${element.data.email}`,
    },
  ];
  dataSource: UserWrapper[] = [];
  displayedColumns = this.columns.map((c) => c.columnDef);

  constructor(
    private userService: UsersService,
    private snackBar: MatSnackBar
  ) {
    super();
  }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.userService.getAll().subscribe({
      next: (data) => {
        this.users = data;
        this.dataSource = [];
        for (let index = 0; index < data.length; index++) {
          const wrapper: UserWrapper = {
            position: index + 1,
            data: data[index],
          };
          this.dataSource.push(wrapper);
        }
      },
      error: (error: HttpErrorResponse) => {
        this.handleError(error, this.snackBar);
      },
      complete: () => {
        this.table.renderRows();
      },
    });
  }

  onDelete(user: UserWrapper) {
    this.userService.delete(user.data).subscribe({
      next: (data) => {
        SnackBarNotificationUtil.showSnackBarSuccess(
          this.snackBar,
          'Użytkownik został usunięty pomyślnie',
          CLOSE_BUTTON
        )
          .afterDismissed()
          .subscribe(() => {
            this.getUsers();
          });
      },
      error: (error: HttpErrorResponse) => {
        this.handleError(error, this.snackBar);
      },
      complete: () => {},
    });
  }
}
