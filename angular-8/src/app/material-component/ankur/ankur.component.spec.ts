import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnkurComponent } from './ankur.component';

describe('AnkurComponent', () => {
  let component: AnkurComponent;
  let fixture: ComponentFixture<AnkurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnkurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnkurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
