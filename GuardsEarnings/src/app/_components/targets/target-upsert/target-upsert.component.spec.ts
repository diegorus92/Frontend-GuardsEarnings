import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TargetUpsertComponent } from './target-upsert.component';

describe('TargetUpsertComponent', () => {
  let component: TargetUpsertComponent;
  let fixture: ComponentFixture<TargetUpsertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TargetUpsertComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TargetUpsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
