import { Component } from '@angular/core';
import { PollingService } from './services/polling.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  constructor(private pollingService: PollingService) {
  }
}
