import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {CustomerRecordsService} from '../../../services/customer-records/customer-records.service';

import {State} from '../../../enums/states.enum';
import {Country} from '../../../enums/countries.enum';
import {EyeColor} from '../../../enums/eye_colors.enum';
import {Sex} from '../../../enums/sexes.enum';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {formatDate} from '@angular/common';
import {environment} from 'src/environments/environment';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer-dialog.component.html',
  styleUrls: ['../shared.dialogs.scss', './add-customer-dialog.component.scss']
})
export class AddCustomerDialogComponent implements OnInit {

  states = State;
  countries = Country;
  eyeColors = EyeColor;
  sexes = Sex;

  ft = 1;
  in = 0;

  isLoading = false;

  newCustomerFrm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    middleName: new FormControl(''),
    lastName: new FormControl('', Validators.required),
    mailingStreetAddress1: new FormControl(''),
    mailingCity: new FormControl(''),
    mailingPostalCode: new FormControl(''),
    dateOfBirth: new FormControl('', Validators.required),
    licenseNumber: new FormControl('', Validators.required),
    phoneNumber: new FormControl('', Validators.required),
    licenseExpirationDate: new FormControl('', Validators.required),
    sex: new FormControl('', Validators.required),
    eyeColor: new FormControl('', Validators.required),
    mailingJurisdictionCode: new FormControl('', Validators.required),
    heightInFtIn: new FormControl(''),
  });

  constructor(public dialogRef: MatDialogRef<AddCustomerDialogComponent>,
              public customerRecordsService: CustomerRecordsService, private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.newCustomerFrm.valueChanges.subscribe(values => {
      Object.keys(values).forEach(k => {
        const elem = this.newCustomerFrm.get(k);
        elem.setValue(elem.value?.toUpperCase(), {emitEvent: false});
      });
    });
  }

  get height_IN(): number {
    return Number(this.ft * 12) + Number(this.in.toString());
  }

  resetHeight_IN(heightIN: number): void {
    this.ft = Math.floor(heightIN / 12);
    this.in = heightIN - this.ft;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  submitRequest(): void {
    this.isLoading = true;

    const formValues = this.newCustomerFrm.value;

    Object.keys(formValues).forEach(val => {
      formValues[val] = formValues[val]?.trim();
    });

    // formValues.dateOfBirth = formatDate(formValues.dateOfBirth, 'MMddyyyy', 'en-US');
    // formValues.licenseExpirationDate = formatDate(formValues.licenseExpirationDate, 'MMddyyyy', 'en-US');

    formValues.heightInFtIn = this.height_IN.toString().padStart(3, '0') + ' IN';
    console.log(formValues);
    this.customerRecordsService.addCustomer(formValues).subscribe(res => {
      console.log(res);
      this.snackBar.open('Customer has been added successfully', 'Dismiss', {
        duration: environment.snackBarTimeout
      });
      this.dialogRef.close({success: true});
    }, (err) => {
      this.isLoading = false;
      this.snackBar.open('Unable to add Customer. Please try again.', 'Dismiss', {
        duration: environment.snackBarTimeout
      });
    });
  }

}
