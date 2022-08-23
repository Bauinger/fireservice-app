import { LoadBazInfo, LoadMainData } from './fire-actions';
import { Component, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { PollingService } from './services/polling.service';
import { Store } from '@ngxs/store';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{

  constructor(
    private swUpdate: SwUpdate,
    private pollingService: PollingService,
    private store: Store
  ) { }

  ngOnInit() {
    this.store.dispatch(new LoadMainData());
    this.store.dispatch(new LoadBazInfo());
    if (this.swUpdate.isEnabled) {
        this.swUpdate.available.subscribe(() => {
            if(confirm('Neue Version verfügbar. Neue Version herunterladen?')) {
                window.location.reload();
            }
        });
    }
  }
}
