import { ActivateIntervalForLoadIncidentDetail, LoadIncidentDetail } from './../fire-actions';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, of, Subscription } from 'rxjs';
import { FireState } from '../fire-state';
import { IncidentParticipant } from '../model/detailed-incident';
import * as moment from 'moment';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { PollingService } from '../services/polling.service';

@Component({
  templateUrl: './incident-detail.page.html',
  styleUrls: ['./incident-detail.page.css']
})
export class IncidentDetailPage implements OnInit {

  @Select(FireState.nameOfDistrict) nameOfDistrict$: Observable<string>;
  @Select(FireState.alertLevelOfIncident) alertLevelOfIncident$: Observable<string>;
  @Select(FireState.messageOfIncident) messageOfIncident$: Observable<string>;
  @Select(FireState.locationOfIncident) locationOfIncident$: Observable<string>;
  @Select(FireState.secondLocationOfIncident) secondLocationOfIncident$: Observable<string>;
  @Select(FireState.dateTimeOfIncident) dateTimeOfIncident$: Observable<string>;
  @Select(FireState.participantsOfIncident) participantsOfIncident$: Observable<IncidentParticipant[]>;
  selectedIncidentId: string;

  constructor(
    private pollingService: PollingService,
    private route: ActivatedRoute,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.selectedIncidentId = this.route.snapshot.paramMap.get('id');
    this.store.dispatch(new LoadIncidentDetail(this.selectedIncidentId));
    this.pollingService.pollIncident(this.selectedIncidentId);
  }

  ionViewWillLeave(): void {
    this.pollingService.stopPollingIncident();
  }

  getIncidentDuration(): Observable<string> {
    return this.dateTimeOfIncident$
      .pipe(
        switchMap(x => {
          const diff = moment().diff(moment(x, 'DD.MM.YYYY hh:mm:ss'));
          const time = moment.duration(diff);
          const days = time.days();
          const hours = time.hours();
          const minutes = time.minutes();
          // eslint-disable-next-line max-len
          return of(`Im Einsatz seit ${days > 0 ? days === 1 ? '1 Tag, ' : days + ' Tagen, ' : ''} ${hours > 0 ? hours === 1 ? '1 Stunde und ' : hours + ' Stunden und ' : ''} ${minutes === 1 ? '1 Minute.' : minutes + ' Minuten.'}`);
        })
      );
  }

  getAlertLevelColor(incidentAlertLevel: string): string {
    switch(incidentAlertLevel[0]) {
      case 'T':
        return 'primary';
      case 'B':
        return 'danger';
      case 'S':
        return 'success';
      default:
        return 'medium';
    }
  }

}
