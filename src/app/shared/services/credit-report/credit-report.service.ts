import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CreditResponse, PreviousCredit } from '../../models/credit-report/credit_response';
import { ProfileService } from '../profile/profile.service';
import { XmlJsonProcessorService } from '../xml-json/xml-json-processor.service';
import { ActualCreditReport } from '../../models/credit-report/actual_credit_response';

@Injectable({
  providedIn: 'root'
})
export class CreditReportService {


  constructor(private http: HttpClient, private profileService: ProfileService, private xmlProcessorService: XmlJsonProcessorService) {
  }

  getExistingReport(customerId: string): Observable<PreviousCredit[]> {
    return this.http.post<PreviousCredit[]>(environment.retrieveExistingCreditReport + customerId, {});
  }

  findLatestReportUrl(previousCreditList: PreviousCredit[], type = 'json'): string {
    previousCreditList.sort((firstEl, secondEl) => {
      return secondEl.id - firstEl.id;
    });
    const jsonList = previousCreditList.find(prevCredit =>
      (prevCredit.creditDocumentLink.substr(prevCredit.creditDocumentLink.length - 4, 4) === type) && (prevCredit.reportType === 'CREDIT_REPORT'));
    return jsonList.creditDocumentLink;
  }

  getActualReport(previousCreditList: PreviousCredit[]): Observable<ActualCreditReport> {
    const callbackUrl = this.findLatestReportUrl(previousCreditList, 'json');
    return this.http.get<ActualCreditReport>(callbackUrl);
  }

  getPDFReport(previousCreditList: PreviousCredit[]): string {
    return this.findLatestReportUrl(previousCreditList, '/pdf');
  }

  sendDigitalApp(borrower_payload: any): Observable<any> {
    return this.http.post(environment.sendDigitalApplicationRequestUrl, borrower_payload)
      .pipe(retry(1));
  }

  requestCreditInformation(borrower_payload: any): Promise<CreditResponse> {
    return this.profileService.fetchGeneralSettings().then(res => {
      const generalSettings = this.xmlProcessorService.xmlToJson(res?.settingsToken);
      borrower_payload.ficoScoreModel = generalSettings.settings.ficoScoreModel['#text'];
      return this.http.post<CreditResponse>(environment.sendCreditScoreRequestUrl, borrower_payload)
        .toPromise();
    });
  }

}
