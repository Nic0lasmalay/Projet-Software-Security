import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpShareNoteComponent } from './pop-up-share-note.component';

describe('PopUpShareNoteComponent', () => {
  let component: PopUpShareNoteComponent;
  let fixture: ComponentFixture<PopUpShareNoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopUpShareNoteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopUpShareNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
