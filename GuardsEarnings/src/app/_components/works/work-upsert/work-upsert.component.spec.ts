import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkUpsertComponent } from './work-upsert.component';

describe('WorkUpsertComponent', () => {
  let component: WorkUpsertComponent;
  let fixture: ComponentFixture<WorkUpsertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkUpsertComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkUpsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
