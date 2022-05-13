import { switchMap } from 'rxjs/operators';
import { Component } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable, of } from 'rxjs';
import { FireState } from '../fire-state';
import { Router } from '@angular/router';

@Component({
  selector: 'app-overview',
  templateUrl: 'overview.page.html',
  styleUrls: ['overview.page.scss']
})
export class OverviewPage {

  @Select(FireState.departmentCount) departmentCount$: Observable<number>;
  @Select(FireState.incidentCount) incidentCount$: Observable<number>;
  @Select(FireState.districtCount) districtCount$: Observable<number>;
  @Select(FireState.mapColorStates) mapColorStates$: Observable<Map<string, string>>;

  constructor(private router: Router) {}

  navigateTo(id: string) {
    this.router.navigate(['fire/district', id]);
  }

  getFillColor(district: string): Observable<string> {
    return this.mapColorStates$
    .pipe(
      switchMap(colorState => of(colorState.get(district)))
    );
  }

}
