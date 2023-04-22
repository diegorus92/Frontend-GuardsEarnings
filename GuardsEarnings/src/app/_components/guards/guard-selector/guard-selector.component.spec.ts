import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuardSelectorComponent } from './guard-selector.component';

describe('GuardSelectorComponent', () => {
  let component: GuardSelectorComponent;
  let fixture: ComponentFixture<GuardSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuardSelectorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuardSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
