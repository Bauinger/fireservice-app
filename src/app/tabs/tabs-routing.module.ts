import { DistrictsListPage } from './../districts-list/districts-list.page';
import { OverviewPage } from './../overview/overview.page';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { StatisticsPage } from '../statistics/statistics.page';
import { DistrictDetailPage } from '../district-detail/district-detail.page';
import { IncidentDetailPage } from '../incident-detail/incident-detail.page';
import { ImprintPage } from '../imprint/imprint.page';

const routes: Routes = [
  {
    path: 'fire',
    component: TabsPage,
    children: [
      {
        path: 'overview',
        component: OverviewPage
      },
      {
        path: 'districts',
        component: DistrictsListPage
      },
      {
        path: 'statistics',
        component: StatisticsPage
      },
      {
        path: '',
        redirectTo: '/fire/overview',
        pathMatch: 'full'
      },
      {
        path: 'district/:id',
        component: DistrictDetailPage
      },
      {
        path: 'incidents/:id',
        component: IncidentDetailPage
      },
      {
        path: 'imprint',
        component: ImprintPage
      }
    ]
  },
  {
    path: '',
    redirectTo: '/fire/overview',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
