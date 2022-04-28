import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-select-filter-dialog',
  templateUrl: './select-filter-dialog.component.html',
  styleUrls: ['./select-filter-dialog.component.scss']
})
export class SelectFilterDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<SelectFilterDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: any) { }

  @HostListener('window:keyup.enter') submitRequest(){
    if(this.validInput){
      this.dialogRef.close(this.data);
    }
  }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  get validInput(){
    return this.data.value.toString().trim().length > 0
  }

}
