import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectFilterDialogComponent } from './select-filter-dialog.component';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';


describe('SelectFilterDialogComponent', () => {
  let component: SelectFilterDialogComponent;
  let fixture: ComponentFixture<SelectFilterDialogComponent>;
  let matDialogRef: MatDialogRef<SelectFilterDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectFilterDialogComponent ],
      imports:[NoopAnimationsModule,MatDialogModule],
      schemas:[CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        {provide:MatDialogRef,  useFactory: () => jasmine.createSpyObj('MatDialogRef', ['close', 'afterClosed'])},
        {provide:MAT_DIALOG_DATA, useValue:{}},
        {provide:MatSnackBar}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectFilterDialogComponent);
    matDialogRef = TestBed.inject(MatDialogRef);
    component = fixture.componentInstance;
    component.data = {
      name:'testField', 
      displayName:"Filter Field",
      value:''
    }
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
