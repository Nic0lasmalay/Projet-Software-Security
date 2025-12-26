import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpAddNoteComponent } from './pop-up-add-note.component';

describe('PopUpAddNoteComponent', () => {
  let component: PopUpAddNoteComponent;
  let fixture: ComponentFixture<PopUpAddNoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopUpAddNoteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopUpAddNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
