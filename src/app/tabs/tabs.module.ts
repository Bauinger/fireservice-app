import { ImprintPage } from './../imprint/imprint.page';
import { IncidentDetailPage } from './../incident-detail/incident-detail.page';
import { StatisticsPage } from './../statistics/statistics.page';
import { DistrictsListPage } from './../districts-list/districts-list.page';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TabsPageRoutingModule } from './tabs-routing.module';
import { TabsPage } from './tabs.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { DistrictDetailPage } from '../district-detail/district-detail.page';
import { OverviewPage } from '../overview/overview.page';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsPageRoutingModule,
    Ng2SearchPipeModule,
    NgxChartsModule
  ],
  declarations: [
    TabsPage,
    DistrictDetailPage,
    OverviewPage,
    DistrictsListPage,
    StatisticsPage,
    IncidentDetailPage,
    ImprintPage
  ]
})
export class TabsPageModule {}
