import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneFrequencyPageComponent } from './gene-frequency-page.component';

describe('GeneFrequencyPageComponent', () => {
  let component: GeneFrequencyPageComponent;
  let fixture: ComponentFixture<GeneFrequencyPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneFrequencyPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneFrequencyPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
