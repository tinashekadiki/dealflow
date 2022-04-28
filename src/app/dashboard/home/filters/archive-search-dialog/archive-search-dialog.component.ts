import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-archive-search-dialog',
  templateUrl: './archive-search-dialog.component.html',
  styleUrls: ['./archive-search-dialog.component.scss']
})
export class ArchiveSearchDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ArchiveSearchDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { 
    this.data.value = {min: '',max: ''};

    }

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
    return this.data.value?.min?.toString().trim().length > 0 && this.data.value?.max?.toString().trim().length > 0 &&
    new Date(this.data.value?.max) > new Date(this.data.value?.min)
  }

}
