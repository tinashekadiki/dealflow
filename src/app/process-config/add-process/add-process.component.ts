import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {SingleProcess} from '../../shared/models/process-config/confuguration.model';

@Component({
  selector: 'app-add-process',
  templateUrl: './add-process.component.html',
  styleUrls: ['./add-process.component.scss']
})
export class AddProcessComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
  }
  configurations: any;
  processes: SingleProcess[];
  configTypes: string[];
  type: string;

  get allData(): any {
    return {
      currentConfigurations: this.configurations,
      processes: this.processes
    };
  }

  checkProcess(process: SingleProcess): boolean {
    return this.findProcessIndex(process) > -1;
  }

  findProcessIndex(process): number{
    return this.configurations.findIndex((element) => element.processId === process.processId);
  }

  addProcess(process: SingleProcess): any {
    if (this.checkProcess(process)) {
      const index = this.findProcessIndex(process);
      this.configurations.splice(index, 1);
    } else {
      const newProcess = {
        ...process,
        step: this.configurations.length + 1
      };
      this.configurations.push(newProcess);
    }
    this.configurations.changed = true;
  }

  ngOnInit(): void {
    this.configurations = this.data.currentConfigurations;
    this.processes  = this.data.processes;
    this.configTypes = this.data.configTypes;
    this.type = this.data.type;
  }
}
