import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BranchAddEditComponent } from './branch-add-edit/branch-add-edit.component';
import { BranchService } from './services/branch.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CoreService } from './core/core.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  displayedColumns: string[] = [
    'id', 'code', 'description', 'address', 'identification', 'dateCreate', 'currency', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _dialog: MatDialog, private _branchService: BranchService, private _coreService: CoreService) {

  }

  ngOnInit(): void {
    this.getBranches();
  }

  openAddDialog() {
    const dialogRef = this._dialog.open(BranchAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getBranches();
        }
      }
    });
  }

  openEditDialog(data: any) {
    const dialogRef = this._dialog.open(BranchAddEditComponent, { data });
     dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getBranches();
        }
      }
    });
  }

  getBranches() {
    this._branchService.getBranches().subscribe({
      next: (res) => {
        if (res.status == 200) {
          this.dataSource = new MatTableDataSource(res.data);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        }
        else {
          this._coreService.openSnackBar(res.message);
        }
      },
      error: (err: any) => {
        this._coreService.openSnackBar("Ha ocurrido un error en el sistema. Contacte al administrador.");
      }
    });
  }

  deleteBranch(id: number) {
    this._branchService.deleteBranch(id).subscribe({
      next: (res) => {
        this._coreService.openSnackBar(res.message);
        this.getBranches();
      },
      error: (err: any) => {
        this._coreService.openSnackBar("Ha ocurrido un error en el sistema. Contacte al administrador.");
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
