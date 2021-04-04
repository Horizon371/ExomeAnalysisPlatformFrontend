import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterExomesComponentComponent } from './filter-exomes-component.component';

describe('FilterExomesComponentComponent', () => {
  let component: FilterExomesComponentComponent;
  let fixture: ComponentFixture<FilterExomesComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterExomesComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterExomesComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
