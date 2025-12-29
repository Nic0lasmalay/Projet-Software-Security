import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-pop-up-share-note',
  standalone: true,
  imports: [],
  templateUrl: './pop-up-share-note.component.html',
  styleUrl: './pop-up-share-note.component.css'
})
export class PopUpShareNoteComponent {

  @Input() noteTitle: string ="";
  @Input() username: string ="";
@Output() userNameChanged = new EventEmitter<string>();
@Output() permissionChanged = new EventEmitter<boolean>();
@Output() close = new EventEmitter();
@Output() share = new EventEmitter();

  onUserChange(event:Event) {
    const value = (event.target as HTMLInputElement).value;
    this.userNameChanged.emit(value);
  }
  onPermissionChange(event:Event) {
    const value = (event.target as HTMLInputElement).value;
    this.permissionChanged.emit(value==='true');

  }
}
