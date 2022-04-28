import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TextFilterDialogComponent } from './text-filter-dialog.component';

describe('TextFilterDialogComponent', () => {
  let component: TextFilterDialogComponent;
  let fixture: ComponentFixture<TextFilterDialogComponent>;
  let matDialogRef: MatDialogRef<TextFilterDialogComponent>;
  

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextFilterDialogComponent ],
      imports:[NoopAnimationsModule,FormsModule, MatDialogModule],
      schemas:[CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        {provide: MatDialogRef, useFactory: () => jasmine.createSpyObj('MatDialogRef', ['close', 'afterClosed'])},
        {
          provide: MAT_DIALOG_DATA, useValue: {
            name:'testField', 
            displayName:"Filter Field",
            value:''
        }
      }]

    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextFilterDialogComponent);
    matDialogRef = TestBed.inject(MatDialogRef);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe("#submitRequest",()=>{
    it("should call #dialogRef.close() if range is valid",()=>{
      spyOnProperty(component,"validInput","get").and.returnValue(true);

      component.submitRequest()

      expect(matDialogRef.close).toHaveBeenCalledOnceWith(component.data);
    })
    it("should not call #dialogRef.close() if range is invalid",()=>{
      spyOnProperty(component,"validInput","get").and.returnValue(false);

      component.submitRequest();

      expect(matDialogRef.close).not.toHaveBeenCalledOnceWith(component.data);
    })
  })

  describe("#validInput",()=>{
    it("should return true when value is not empty",()=>{
      component.data.value = "Test";

      let result = component.validInput;

      expect(result).toBeTrue();
    })

    it("should return false when value is only spaces",()=>{
      component.data.value = "               ";

      let result = component.validInput;

      expect(result).toBeFalse();
    })
  })

  describe("#onNoClick()",()=>{
    it("should call #dialogRef.close()",()=>{

      component.onNoClick();

      expect(matDialogRef.close).toHaveBeenCalled();
    })
  })
});
