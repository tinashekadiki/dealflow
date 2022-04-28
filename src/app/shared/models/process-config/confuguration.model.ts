import {Branch} from '../profile/profiles.model';

export interface SingleProcess{
  processId: number;
  name: string;
  description: string;
}

export interface ProcessStep {
  processId: number;
  name?: string;
  description?: string;
  step?: number;
}

export interface Configuration {
  configurationId?: number;
  branch?: Branch;
  process?: SingleProcess;
  flow?: Flow;
  step?: number;
}

export interface Flow {
  type?: string;
  description?: string;
}




