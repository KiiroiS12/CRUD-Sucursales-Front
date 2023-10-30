import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { BranchService } from '../services/branch.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';

interface Currency {
  id: number;
  description: string;
}

@Component({
  selector: 'app-branch-add-edit',
  templateUrl: './branch-add-edit.component.html',
  styleUrls: ['./branch-add-edit.component.scss']
})
export class BranchAddEditComponent implements OnInit {
  currencies: Currency[] = [];

  branchForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _branchService: BranchService,
    private _coreService: CoreService,
    private _dialogRef: MatDialogRef<BranchAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.branchForm = this._fb.group({
      id: [0, Validators.required],
      code: [0, Validators.required],
      description: ['', Validators.required],
      address: ['', Validators.required],
      identification: ['', Validators.required],
      dateCreate: ['', Validators.required],
      idCurrency: [0, Validators.required]
    });
  }

  minDate = new Date()


  ngOnInit(): void {
    console.log(this.minDate);
    this.getCurrencies();
    this.branchForm.patchValue(this.data);
  }

  getCurrencies() {
    this._branchService.getCurrencies().subscribe({
      next: (res) => {
        if (res.status == 200) {
          this.currencies = res.data;
        }
        else {
          this._coreService.openSnackBar(res.message);
        }
      },
      error: (err: any) => {
        this._coreService.openSnackBar("Ha ocurrido un error en el sistema. Contacte al administrador.");
      }
    })
  }
  onFormSubmit() {
    if (this.branchForm.valid) {
      if (this.data) {
        //Actualizar existente
        this._branchService.updateBranch(this.branchForm.value).subscribe({
          next: (res) => {
            this._coreService.openSnackBar(res.message);
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            this._coreService.openSnackBar("Ha ocurrido un error en el sistema. Contacte al administrador.");
          }
        });
      } else {
        //Añadir nuevo
        this._branchService.addBranch(this.branchForm.value).subscribe({
          next: (res) => {
            this._coreService.openSnackBar(res.message);
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            this._coreService.openSnackBar("Ha ocurrido un error en el sistema. Contacte al administrador.");
          }
        });
      }

    }
  }
}
