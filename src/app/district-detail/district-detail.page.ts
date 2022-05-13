import { takeUntil } from 'rxjs/operators';
import { ActivateIntervalForLoadDistrictDetail, LoadDistrictDetail } from './../fire-actions';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { FireState } from '../fire-state';
import { BaseIncident } from '../model/active-incidents-district';
import { PollingService } from '../services/polling.service';

@Component({
  templateUrl: './district-detail.page.html',
  styleUrls: ['./district-detail.page.css']
})
export class DistrictDetailPage implements OnInit {

  @Select(FireState.nameOfDistrict) nameOfDistrict$: Observable<string>;
  @Select(FireState.incidentsOfDistricts) incidentsOfDistricts$: Observable<BaseIncident[]>;
  @Select(FireState.incidentCountOfDistrict) incidentCountOfDistrict$: Observable<number>;
  @Select(FireState.bazOnlineOfDistrict) bazOnlineOfDistrict$: Observable<boolean>;
  selectedDistrictId: string;
  intervalDistrictDetail$: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store,
    private pollingService: PollingService
  ) {}

  ngOnInit() {
    this.selectedDistrictId = this.route.snapshot.paramMap.get('id');
    this.pollingService.pollDistrict(this.selectedDistrictId);
  }

  ionViewWillLeave(): void {
    this.pollingService.stopPollingDistrict();
  }

  navigateTo(incidentId: string) {
    this.router.navigate(['fire/incidents', incidentId]);
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
