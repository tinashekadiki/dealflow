import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-customer-document-documentviewer',
  templateUrl: './customer-document-documentviewer.component.html',
  styleUrls: ['./customer-document-documentviewer.component.scss'],
  //template: `{{data}}`
})
export class CustomerDocumentDocumentviewerComponent implements OnInit {
  // data;
  pdfSource = "";
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private dialogRef: MatDialogRef<CustomerDocumentDocumentviewerComponent>) { }

  ngOnInit(): void {
    this.pdfSource = this.data;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
