import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-range-select-filter-dialog',
  templateUrl: './range-select-filter-dialog.component.html',
  styleUrls: ['./range-select-filter-dialog.component.scss']
})
export class RangeSelectFilterDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<RangeSelectFilterDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

    @HostListener('window:keyup.enter') submitRequest(){
      if(this.validRange){
        this.dialogRef.close(this.data);
      }
    }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  get validRange(){
    return !isNaN(this.data.value.min) && !isNaN(this.data.value.max) && this.data.value.min < this.data.value.max;
  }

}
