import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MosaicosComponent } from './mosaicos.component';

describe('MosaicosComponent', () => {
  let component: MosaicosComponent;
  let fixture: ComponentFixture<MosaicosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MosaicosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MosaicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
