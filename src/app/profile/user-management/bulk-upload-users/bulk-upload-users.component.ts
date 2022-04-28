import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import * as XLSX from 'xlsx';
import {UserService} from '../../../shared/services/user/user.service';
import {MatTableDataSource} from '@angular/material/table';
import {SnackBarNotificationService} from '../../../shared/services/snack-bar-notification/snack-bar-notification.service';

@Component({
  selector: 'app-bulk-upload-users',
  templateUrl: './bulk-upload-users.component.html',
  styleUrls: ['./bulk-upload-users.component.scss']
})
export class BulkUploadUsersComponent implements OnInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  uploadForm;
  excelUsers: MatTableDataSource<any>;
  excelDisplayedColumns: string[] = ['First_Name', 'Last_Name', 'Email_Address', 'Role'];
  dataSource = [
    {name: 'First Name', last_name: 'Last Name', email: 'Email', cell_phone: 'Cell Phone', role: 'Role'},
    {name: 'John', last_name: 'Doe', email: 'john.doe@mail.com', cell_phone: '(123) 111-1111', role: 'Manager'},
  ];
  excelData: any;
  displayedColumns: string[] = ['A', 'B', 'C', 'D', 'E'];

  constructor(private formBuilder: FormBuilder, private userService: UserService, private snackBar: SnackBarNotificationService) {
  }

  ngOnInit(): void {
    this.firstFormGroup = this.formBuilder.group({
      firstCtrl: ['']
    });
    this.secondFormGroup = this.formBuilder.group({
      secondCtrl: ['']
    });
    this.uploadForm = this.formBuilder.group({
      profile: File
    });
  }

  onFileChange(ev): void {
    let workBook = null;
    let jsonData = null;
    const reader = new FileReader();
    const file = ev.target.files[0];
    reader.onload = (event) => {
      const data = reader.result;
      workBook = XLSX.read(data, { type: 'binary' });
      jsonData = workBook.SheetNames.reduce((initial, name) => {
        const sheet = workBook.Sheets[name];
        initial[name] = XLSX.utils.sheet_to_json(sheet);
        return initial;
      }, {});
      this.excelData = jsonData;
      this.excelUsers = new MatTableDataSource<any>(jsonData.Sheet1);
    };
    reader.readAsBinaryString(file);
  }

  saveData(): void{
    this.userService.uploadUsers(this.excelData.Sheet1).toPromise().then(response => {
      let message = '';
      response.forEach(element => {
        message += '\n';
        message += element.body;
      });
      this.snackBar.displayMessage(message);
    }).catch(error => {
      this.snackBar.displayError(error.error.error);
    });
  }
}
