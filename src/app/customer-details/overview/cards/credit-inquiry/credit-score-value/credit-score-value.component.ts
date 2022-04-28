import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-credit-score-value',
  templateUrl: './credit-score-value.component.html',
  styleUrls: ['./credit-score-value.component.scss']
})
export class CreditScoreValueComponent implements OnInit {

  @Input('credit-score') creditScore?: string;

  creditCriterias = [
    {level: 1, start: 300, end: 579, remark: 'Poor', color: '#E10600'},
    {level: 2, start: 580, end: 639, remark: 'Fair', color: '#F15A29'},
    {level: 3, start: 640, end: 699, remark: 'Good', color: '#F7941D'},
    {level: 4, start: 700, end: 749, remark: 'Very Good', color: '#48B295'},
    {level: 5, start: 750, end: 850, remark: 'Excellent', color: '#007987'},
  ];

  constructor() {
  }

  ngOnInit(): void {
  }

  get creditScoreDefinition(): any {
    if (this.creditScore === undefined) {
      return {color: '#ccc'};
    }
    return this.creditCriterias.find(x => x.start <= parseInt(this.creditScore, 10) && x.end >= parseInt(this.creditScore, 10))
  }

  computeScore(): number|string{
    if (this.creditScore){
      while (this.creditScore.charAt(0) === '+')
      {
        this.creditScore = this.creditScore.substring(1);
      }
      return parseInt(this.creditScore, 10);
    }
    return this.creditScore;
  }
}
