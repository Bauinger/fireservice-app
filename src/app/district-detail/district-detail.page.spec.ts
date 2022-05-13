import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistrictDetailPage } from './district-detail.page';

describe('DistrictDetailPage', () => {
  let component: DistrictDetailPage;
  let fixture: ComponentFixture<DistrictDetailPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DistrictDetailPage ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DistrictDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
