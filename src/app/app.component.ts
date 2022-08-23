import { Component, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { PollingService } from './services/polling.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{

  constructor(private swUpdate: SwUpdate) {
  }

  ngOnInit() {

      if (this.swUpdate.isEnabled) {

          this.swUpdate.available.subscribe(() => {

              if(confirm('Neue Version verfügbar. Neue Version herunterladen?')) {

                  window.location.reload();
              }
          });
      }
  }
}
