import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { District } from '../model/main-data';
import { Select } from '@ngxs/store';
import { FireState } from '../fire-state';

@Component({
  selector: 'app-districts-list',
  templateUrl: 'districts-list.page.html',
  styleUrls: ['districts-list.page.scss']
})
export class DistrictsListPage {

  @Select(FireState.districts) districts$: Observable<District[]>;
  @Select(FireState.bazOnline) bazOnline$: Observable<any>;
  filterTerm: string;

  constructor(private router: Router) {}

  navigateTo(id: string) {
    this.router.navigate(['fire/district', id]);
  }

  bazOnline(keyOfStation: string): Observable<boolean> {
    return this.bazOnline$
      .pipe(
        switchMap(entry => entry[keyOfStation] ? of(true) : of(false))
      );
  }

  getWarnStateClass(warnstate: number) {
    switch(warnstate) {
      case 1:
        return 'warn-low';
      case 2:
        return 'warn-medium';
      case 3:
        return 'warn-high';
      default:
        return 'warn-none';
    }
  }

}

