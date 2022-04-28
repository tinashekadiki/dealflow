import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DocumentVault } from 'src/app/shared/models/customers/customer_document';
import { CustomerRecordsService } from 'src/app/shared/services/customer-records/customer-records.service';
import { environment } from 'src/environments/environment';
import { CustomerDocumentComponent } from '../customer-document/customer-document.component';

@Component({
  selector: 'app-customer-document-folder',
  templateUrl: './customer-document-folder.component.html',
  styleUrls: ['../compliance-dialogs/shared.component.scss', './customer-document-folder.component.scss']
})
export class CustomerDocumentFolderComponent implements OnInit {

  customerFolders = [];
  isLoadingList = true;

  constructor(private dialogRef: MatDialogRef<CustomerDocumentFolderComponent>, private snackBar: MatSnackBar, private dialog: MatDialog, private customerRecords: CustomerRecordsService, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
     this.getCustomerFolder();

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  openCustomerDocumentsDialog(folder: any) {
    // console.log(documents);
    this.dialog.open(CustomerDocumentComponent, {
      width: '800px',
      height: '500px',
      data: { "parentFolder": folder }
    });
  }

  getCustomerFolder() {
    this.isLoadingList = true;
    this.customerRecords.getCustomerFolder(this.data).subscribe((data: DocumentVault) => {
      console.log('All the folders', data);
      this.customerFolders = data.eventFolderList;
      this.isLoadingList = false;
    }, error => {
      console.log(error);
      this.snackBar.open(error.error.error, 'Dismiss', {
        duration: environment.snackBarTimeout
      });
      this.isLoadingList = false;
    })
  }

  get isLoading(): boolean{
    return this.isLoadingList;
  }


  getDateAndYear(dateString) {
    const date = new Date(dateString);  // 2009-11-10
    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    return `${monthNames[date.getMonth()]}-${date.getFullYear()}`
  }
}
