import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClusteringPageComponent } from './clustering-page.component';

describe('ClusteringPageComponent', () => {
  let component: ClusteringPageComponent;
  let fixture: ComponentFixture<ClusteringPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClusteringPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClusteringPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
