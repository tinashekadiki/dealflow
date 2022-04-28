import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { ArchiveSearchDialogComponent } from './archive-search-dialog.component';

describe('ArchiveSearchDialogComponent', () => {
  let component: ArchiveSearchDialogComponent;
  let fixture: ComponentFixture<ArchiveSearchDialogComponent>;
  let matDialogRef: MatDialogRef<ArchiveSearchDialogComponent>;
  let data:any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArchiveSearchDialogComponent ],
      imports:[NoopAnimationsModule,FormsModule, MatDialogModule],
      schemas:[CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        {provide: MatDialogRef, useFactory: () => jasmine.createSpyObj('MatDialogRef', ['close', 'afterClosed'])},
        {
          provide: MAT_DIALOG_DATA, useValue: {
            name:'testField', 
            displayName:"Filter Field",
            value:{min:null,max:null}
        }
      }]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchiveSearchDialogComponent);
    component = fixture.componentInstance;
    matDialogRef = TestBed.inject(MatDialogRef);
    fixture.detectChanges();
    data = TestBed.inject(MAT_DIALOG_DATA);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe("#onNoClick()",()=>{
    it("should call #dialogRef.close()",()=>{

      component.onNoClick();

      expect(matDialogRef.close).toHaveBeenCalled();
    })
  })

  describe("#validInput",()=>{
    it("should return false if either min or max are not dates",()=>{

      component.data.value = {min:null, max:null};

      let result  = component.validInput;

      expect(result).toBeFalse();
    })
    it("should return false if the max date is less than the min date",()=>{
      component.data.value = {min:"2021-10-10", max:"2021-01-01"};

      let result  = component.validInput;

      expect(result).toBeFalse();
    })
    it("should return true if the max date is greater than min date",()=>{
      component.data.value = {min:"2021-01-01", max:"2021-10-10"};

      let result  = component.validInput;

      expect(result).toBeTrue();
    })

  })
});
