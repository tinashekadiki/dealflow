import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreditScoreValueComponent } from './credit-score-value.component';

describe('CreditScoreValueComponent', () => {
  let component: CreditScoreValueComponent;
  let fixture: ComponentFixture<CreditScoreValueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreditScoreValueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditScoreValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe("#creditScoreDefinition",()=>{
    it("should return object based on credit score value",()=>{
      component.creditScore = {
        creditRepositorySourceType: "string",
        date: "string",
        value: 400
      };

      expect(component.creditScoreDefinition).toEqual({level: 1, start:300,end:579,remark:"Poor",color:"#E10600"});
    })

    it("should return undefined if credit score value is out of range",()=>{
      component.creditScore = {
        creditRepositorySourceType: "string",
        date: "string",
        value: 100
      };

      expect(component.creditScoreDefinition).toBeUndefined();
    })

    it("should return color object if credit score value is undefined",()=>{
      component.creditScore = undefined;

      expect(component.creditScoreDefinition).toEqual({color:"#ccc"});
    })
  })
});
