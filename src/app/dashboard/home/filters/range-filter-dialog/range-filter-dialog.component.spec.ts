import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { RangeFilterDialogComponent } from './range-filter-dialog.component';

describe('RangeFilterDialogComponent', () => {
  let component: RangeFilterDialogComponent;
  let fixture: ComponentFixture<RangeFilterDialogComponent>;
  let matDialogRef: MatDialogRef<RangeFilterDialogComponent>;
  let data:any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RangeFilterDialogComponent ],
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
    fixture = TestBed.createComponent(RangeFilterDialogComponent);
    matDialogRef = TestBed.inject(MatDialogRef);
    component = fixture.componentInstance;
    data = TestBed.inject(MAT_DIALOG_DATA);
  });

  it('should create', () => {
    component.ngOnInit();
    expect(component).toBeTruthy();
  });

  describe("#onNoClick()",()=>{
    it("should call #dialogRef.close()",()=>{

      component.onNoClick();

      expect(matDialogRef.close).toHaveBeenCalled();
    })
  })

  describe("#submitRequest",()=>{
    it("should call #dialogRef.close() if range is valid",()=>{
      spyOnProperty(component,"validRange","get").and.returnValue(true);

      component.submitRequest()

      expect(matDialogRef.close).toHaveBeenCalledOnceWith(component.data);
    })
    it("should not call #dialogRef.close() if range is invalid",()=>{
      spyOnProperty(component,"validRange","get").and.returnValue(false);

      component.submitRequest();

      expect(matDialogRef.close).not.toHaveBeenCalledOnceWith(component.data);
    })
  })

  describe("#validRange",()=>{
    it("should return false if either min or max are not numbers",()=>{

      component.data.value = {min:null, max:null};

      let result  = component.validRange;

      expect(result).toBeFalse();
    })
    it("should return false if the max value is less than the min value",()=>{
      component.data.value = {min:10, max:1};

      let result  = component.validRange;

      expect(result).toBeFalse();
    })
    it("should return true if the max value is greater than min value",()=>{
      component.data.value = {min:1, max:10};

      let result  = component.validRange;

      expect(result).toBeTrue();
    })

  })
});
