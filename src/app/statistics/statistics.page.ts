import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { FireState } from '../fire-state';
import { IncidentParticipant } from '../model/detailed-incident';

@Component({
  templateUrl: './statistics.page.html',
  styleUrls: ['./statistics.page.scss']
})
export class StatisticsPage {

  @Select(FireState.sumCurrent) sumCurrent$: Observable<number>;
  @Select(FireState.currentStatisticValue) currentStatisticValue$: Observable<any>;
  @Select(FireState.sum12h) sum12h$: Observable<number>;
  @Select(FireState.statisticValue12h) statisticValue12h$: Observable<any>;
  @Select(FireState.sum24h) sum24h$: Observable<number>;
  @Select(FireState.statisticValue24h) statisticValue24h$: Observable<any>;
  selectedTab = 'actual';
  single: any[];
  view: any[] = [400, 400];
  gradient = false;
  showLegend = true;
  showLabels = false;
  isDoughnut = false;
  legendPosition = 'top';
  maxLabelLength = 20;

  colorScheme = {
    domain: ['#3880ff', '#eb445a', '#2dd36f', '#92949c']
  };

  constructor() {
  }

  segmentChanged($event) {
    this.selectedTab = $event.detail.value;
  }

}
