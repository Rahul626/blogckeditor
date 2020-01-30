import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CkComponent } from './ck.component';

describe('CkComponent', () => {
  let component: CkComponent;
  let fixture: ComponentFixture<CkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
