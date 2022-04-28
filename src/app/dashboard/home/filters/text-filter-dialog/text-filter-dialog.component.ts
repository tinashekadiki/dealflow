import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-text-filter-dialog',
  templateUrl: './text-filter-dialog.component.html',
  styleUrls: ['./text-filter-dialog.component.scss']
})
export class TextFilterDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<TextFilterDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

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
