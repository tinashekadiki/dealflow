import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SyntheticFraudProofComponent } from './synthetic-fraud-proof.component';

describe('SyntheticFraudProofComponent', () => {
  let component: SyntheticFraudProofComponent;
  let fixture: ComponentFixture<SyntheticFraudProofComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SyntheticFraudProofComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SyntheticFraudProofComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe("#scoreToPercentage",()=>{
    it("should return percentage from given value",()=>{
      let p = component.scoreToPercentage(100);

      expect(p).toEqual(90.0)
    })
  })

  describe("#percentageToColor",()=>{
    it("should return #48B295 when the value is greater than or equal to 66.7",()=>{
      let p = component.percentageToColor(77);

      expect(p).toEqual("#48B295")
    });

    it("should return #F7941D when the value is greater than 33.3",()=>{
      let p = component.percentageToColor(45);

      expect(p).toEqual("#F7941D")
    });
    
    it("should return #E10600 when the value is less than or equal to 33.3",()=>{
      let p = component.percentageToColor(22);

      expect(p).toEqual("#E10600")
    })
  })

  describe("#generateScoreObj",()=>{
    it("should call #scoreToPercentage and #percentageToColor and generate an object",()=>{
      spyOn(component,"scoreToPercentage").and.returnValue(90);
      spyOn(component,"percentageToColor").and.returnValue("#48B295");

      let p = component.generateScoreObj(100);

      expect(p).toEqual({score:100,percentage:90,color:"#48B295"});
    })
    it("should call #scoreToPercentage and #percentageToColor and generate an object but if a value is greater than 94% should end at 94%",()=>{
      spyOn(component,"scoreToPercentage").and.returnValue(98);
      spyOn(component,"percentageToColor").and.returnValue("#48B295");

      let p = component.generateScoreObj(1);

      expect(p).toEqual({score:1,percentage:94,color:"#48B295"});
    })
  })

  describe("#firstPartyObj",()=>{
    it("should call #generateScoreObj",()=>{
      spyOn(component,"generateScoreObj");
      component.firstPartyScore = 200

      component.firstPartyObj;

      expect(component.generateScoreObj).toHaveBeenCalledWith(200);
    })
  })

  describe("#thirdPartyObj",()=>{
    it("should call #generateScoreObj",()=>{
      spyOn(component,"generateScoreObj");
      component.thirdPartyScore = 200

      component.thirdPartyObj;

      expect(component.generateScoreObj).toHaveBeenCalledWith(200);
    })
  })

  describe("#abuseObj",()=>{
    it("should call #generateScoreObj",()=>{
      spyOn(component,"generateScoreObj");
      component.abuseScore = 200

      component.abuseObj;

      expect(component.generateScoreObj).toHaveBeenCalledWith(200);
    })
  })

});
