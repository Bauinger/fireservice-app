import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Color, LegendPosition, ScaleType } from '@swimlane/ngx-charts';
import { Observable } from 'rxjs';
import { FireState } from '../fire-state';

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
  view: [number, number] = [400, 400];
  gradient = false;
  showLegend = true;
  showLabels = false;
  isDoughnut = false;
  legendPosition: LegendPosition = LegendPosition.Below;
  maxLabelLength = 20;

  colorScheme: Color = {
    name: 'myScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#3880ff', '#eb445a', '#2dd36f', '#92949c']
  };

  constructor() {
  }

  segmentChanged($event) {
    this.selectedTab = $event.detail.value;
  }

}
