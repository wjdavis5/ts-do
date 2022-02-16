import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FfioComponent } from './ffio.component';

describe('FfioComponent', () => {
  let component: FfioComponent;
  let fixture: ComponentFixture<FfioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FfioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FfioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
