import { Component, Inject, OnInit, Output, EventEmitter } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import JSZip from 'jszip';
import JSZipUtils from 'jszip-utils';
import saveAs from 'file-saver';
import { element } from 'protractor';
import { Console } from 'console';
import { CustomerDocumentDocumentviewerComponent } from '../customer-document-documentviewer/customer-document-documentviewer.component';

// import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-customer-document',
  templateUrl: './customer-document.component.html',
  styleUrls: [
    '../compliance-dialogs/shared.component.scss',
    './customer-document.component.scss',
  ],
})
export class CustomerDocumentComponent implements OnInit {
  customerDocuments = [];
  documentIds = [];
  parentFolder: any;
  public allSelected: boolean = false;
  public indeterminate: boolean = false;
  docUrl: string;

  constructor(
    private dialogRef: MatDialogRef<CustomerDocumentComponent>,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    console.log(this.data);
    this.customerDocuments = this.data.parentFolder.documents;
    this.parentFolder = this.data.parentFolder;

    this.documentIds = this.customerDocuments.map((o) => o.documentId);

    console.log('Document Ids Array', this.documentIds);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getDateAndYear(dateString) {
    const date = new Date(dateString); // 2009-11-10
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    return `${monthNames[date.getMonth()]}-${date.getFullYear()}`;
  }

  itemChanged(item, event) {
    item.isChecked = event.checked;

    let totalSelected = this.customerDocuments.filter(
      (i) => i.isChecked
    ).length;
    if (totalSelected === 0) {
      this.allSelected = false;
      this.indeterminate = false;
    } else if (
      totalSelected > 0 &&
      totalSelected < this.customerDocuments.length
    ) {
      this.allSelected = false;
      this.indeterminate = true;
    } else if (totalSelected === this.customerDocuments.length) {
      this.allSelected = true;
      this.indeterminate = false;
    }
  }

  toggleSelectAll(event) {
    this.allSelected = event.checked;
    this.customerDocuments.forEach((item) => {
      item.isChecked = event.checked;
    });
  }

  onDownloadAllClick() {
    let zip: JSZip = new JSZip();
    var count = 0;
    var zipFilename = this.parentFolder.createdAt;
    var urls = this.customerDocuments.map((o) => o.link);

    urls.forEach((url) => {
      var str = url;
      var n = str.lastIndexOf('/');
      var urlNew = str.substring(n + 1);

      let filename = urlNew;
      console.log(filename);
      JSZipUtils.getBinaryContent(url, function (err, data) {
        if (err) {
          throw err;
        }
        zip.file(filename, data, { binary: true });
        count++;
        if (count == urls.length) {
          var zipFile = zip
            .generateAsync({ type: 'blob' })
            .then(function (content) {
              saveAs(content, zipFilename + '.zip');
            });
        }
      });
    });
  }

  onDownloadSelectedClick() {
    let zip: JSZip = new JSZip();
    var count = 0;
    var zipFilename = this.parentFolder.createdAt;
    var checkedUrls = this.customerDocuments.filter(
      (u) => u.isChecked === true
    );

    var urls = checkedUrls.map((o) => o.link);

    urls.forEach((url) => {
      var str = url;
      var n = str.lastIndexOf('/');
      var urlNew = str.substring(n + 1);

      let filename = urlNew;
      console.log(filename);
      JSZipUtils.getBinaryContent(url, function (err, data) {
        if (err) {
          throw err;
        }
        zip.file(filename, data, { binary: true });
        count++;
        if (count == urls.length) {
          var zipFile = zip
            .generateAsync({ type: 'blob' })
            .then(function (content) {
              saveAs(content, zipFilename + '.zip');
            });
        }
      });
    });
  }

  openDocumentDialog(item: any) {
    console.log('Item link is', item.link);
    this.dialog.open(CustomerDocumentDocumentviewerComponent, {
      width: '800px',
      height: '90vh',
      data: item.link,
    });
  }
}
