import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputHomePageComponent } from './input-home-page.component';

describe('InputHomePageComponent', () => {
  let component: InputHomePageComponent;
  let fixture: ComponentFixture<InputHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputHomePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
