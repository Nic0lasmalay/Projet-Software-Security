import {Component, EventEmitter, Input, Output} from '@angular/core';
@Component({
  selector: 'app-pop-up-add-note',
  standalone: true,
  imports: [],
  templateUrl: './pop-up-add-note.component.html',
  styleUrl: './pop-up-add-note.component.css'
})
export class PopUpAddNoteComponent {

  @Input() title: string ="";
  @Output() titleChanged = new EventEmitter<string>();
  @Input() content: string ="";
  @Output() contentChanged = new EventEmitter<string>();

   constructor() {
  }

  onTitleChanged(event : Event){
    const value = (event.target as HTMLInputElement).value;
    this.titleChanged.emit(value);
  }

  onTextChanged(event : Event){
    const value = (event.target as HTMLInputElement).value;
    this.contentChanged.emit(value);
  }


}
