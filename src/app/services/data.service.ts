import { DetailedIncident } from './../model/detailed-incident';
import { ActiveIncidentsPerDistrict } from './../model/active-incidents-district';
/* eslint-disable quote-props */
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, timeout } from 'rxjs/operators';
import { MainData } from '../model/main-data';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  config = {
    wastlMobileBaseUrl: 'https://infoscreen.florian10.info/OWS/wastlMobile/',
    bazInfoUrl: 'http://atlas.feuerwehr-krems.at/CodePages/Wastl/GetDaten/GetWastlMainS3.asp?Time',
    httpTimeout: 60000 // 60 seconds maximum request time
  };

  constructor(
    private http: HttpClient
  ) { }

  getMainData(): Observable<MainData> {
    return this.http.get<MainData>(`${this.config.wastlMobileBaseUrl}getMainData.ashx`)
    .pipe(
      timeout(this.config.httpTimeout),
      catchError(this.handleError)
    );
  }

  getActiveIncidents(districtId: string): Observable<ActiveIncidentsPerDistrict> {
    let params = new HttpParams();
    params = params.append('id', `bezirk_${districtId}`);
    return this.http.get<ActiveIncidentsPerDistrict>(`${this.config.wastlMobileBaseUrl}getEinsatzAktiv.ashx`, {params})
    .pipe(
      timeout(this.config.httpTimeout),
      catchError(this.handleError)
    );
  }

  getIncidentData(incidentId: string): Observable<DetailedIncident> {
    let params = new HttpParams();
    params = params.append('id', incidentId);
    return this.http.get<DetailedIncident>(`${this.config.wastlMobileBaseUrl}geteinsatzdata.ashx`, {params})
    .pipe(
      timeout(this.config.httpTimeout),
      catchError(this.handleError)
    );
  }

  getBazInfo() {
    return this.http.get(`${this.config.bazInfoUrl}`, { responseType: 'text' })
    .pipe(
      timeout(this.config.httpTimeout),
      catchError(this.handleError)
    );
  }


  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}