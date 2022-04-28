import { Component, Input, OnInit } from '@angular/core';
import { round } from 'lodash';

@Component({
  selector: 'app-synthetic-fraud-proof',
  templateUrl: './synthetic-fraud-proof.component.html',
  styleUrls: ['./synthetic-fraud-proof.component.scss']
})
export class SyntheticFraudProofComponent implements OnInit {

  @Input('first-party-score') firstPartyScore:number;
  @Input('third-party-score') thirdPartyScore:number;
  @Input('abuse-score') abuseScore:number;

  scoreMax = 999;

  constructor() { }

  ngOnInit(): void {
  }

  scoreToPercentage(score:number){
    return round((100-(score/this.scoreMax)*100),1);
  }

  percentageToColor(percentage:number){
    if(percentage >= 66.7){
      return '#48B295';
    }else if(percentage > 33.3){
      return '#F7941D';
    }else{
      return '#E10600';
    }  
  }

  generateScoreObj(score){
    console.log('Yeyi bakithi, what is the score:', score);
    let pc = this.scoreToPercentage(score);
    pc = (pc>94)?94:pc;
    let color = this.percentageToColor(pc);
    return {score, percentage:pc,color};
  }

  get firstPartyObj(){
    return this.generateScoreObj(this.firstPartyScore);
  }

  get thirdPartyObj(){
    return this.generateScoreObj(this.thirdPartyScore);
  }

  get abuseObj(){
    return this.generateScoreObj(this.abuseScore);
  }


}
