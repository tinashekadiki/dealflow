import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {Configuration, ProcessStep, SingleProcess} from '../../models/process-config/confuguration.model';
import {AuthorizationService} from '../authorization/authorization.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ProcessConfigService {
  public loadingProcesses = false;
  public processes: SingleProcess[] = [];

  constructor(private http: HttpClient, private auth: AuthorizationService,
              public snackBar: MatSnackBar) {
  }

  public loadProcesses(): Promise<SingleProcess[]> {
    this.loadingProcesses = true;
    return this.http.get<SingleProcess[]>(environment.allProcesses).toPromise();
  }

  public loadSalesProcesses(): Promise<SingleProcess[]> {
    this.loadingProcesses = true;
    return this.http.get<SingleProcess[]>(environment.allSalesProcesses).toPromise();
  }

  public getConfigurations(): Promise<Configuration[]> {
    this.loadingProcesses = true;
    return this.http.get<Configuration[]>(`${environment.processListUrl}${this.auth.activeBranch.branchId}`).toPromise();
  }

  public saveConfigurations(configElementList: ProcessStep[], type: string): Promise<string> {
    const requestBody = {
      branchId: this.auth.activeBranch.branchId,
      configElementList,
      type
    };
    return this.http.post(environment.createConfiguration, requestBody, {responseType: 'text'}).toPromise();
  }

  public deleteConfigurations(type: string): Promise<string> {
    return this.http.delete(`${environment.deleteConfiguration}/${this.auth.activeBranch.branchId}/flow/${type}`,
      {responseType: 'text'}).toPromise();
  }

  public mapToHumanReadableTypes(type: string): string{
    switch (type) {
      case 'ENDTOEND':
        return 'End to End';
      case 'INTERNETLEAD':
        return 'Internet Lead';
      case 'SALES':
        return 'Sales';
      case 'CUSTOMER':
        return 'Customer';
      case 'COMPLIANCE':
        return 'Compliance';
    }
    return type;
  }
}
