import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidentDetailPage } from './incident-detail.page';

describe('IncidentDetailPage', () => {
  let component: IncidentDetailPage;
  let fixture: ComponentFixture<IncidentDetailPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncidentDetailPage ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IncidentDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
