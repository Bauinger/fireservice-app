import { LoadBazInfo, LoadDistrictDetail, LoadIncidentDetail } from './../fire-actions';
import { Injectable, OnDestroy } from '@angular/core';
import { Store } from '@ngxs/store';
import { timer, Subject } from 'rxjs';
import { switchMap, retry, takeUntil } from 'rxjs/operators';
import { LoadMainData } from '../fire-actions';

const POLLING_INTERVAL = 30000;


@Injectable({
  providedIn: 'root'
})
export class PollingService implements OnDestroy{
  private stopPolling = new Subject();
  private stopDistrictPolling = new Subject();
  private stopIncidentsPolling = new Subject();

  constructor(private store: Store) {
    timer(1, POLLING_INTERVAL).pipe(
       switchMap(() => this.store.dispatch(new LoadMainData())),
       retry(),
       takeUntil(this.stopPolling)
    ).subscribe();

    timer(1, POLLING_INTERVAL).pipe(
        switchMap(() => this.store.dispatch(new LoadBazInfo())),
        retry(),
        takeUntil(this.stopPolling)
    ).subscribe();
  }

  pollDistrict(districtId: string) {
    timer(1, POLLING_INTERVAL).pipe(
        switchMap(() => this.store.dispatch(new LoadDistrictDetail(districtId))),
        retry(),
        takeUntil(this.stopDistrictPolling)
    ).subscribe();
  }

  pollIncident(incidentId: string) {
    timer(1, POLLING_INTERVAL).pipe(
        switchMap(() => this.store.dispatch(new LoadIncidentDetail(incidentId))),
        retry(),
        takeUntil(this.stopIncidentsPolling)
    ).subscribe();
  }

  stopPollingDistrict() {
    this.stopDistrictPolling.next();
  }

  stopPollingIncident() {
    this.stopIncidentsPolling.next();
  }

  ngOnDestroy() {
     this.stopPolling.next();
  }
}
