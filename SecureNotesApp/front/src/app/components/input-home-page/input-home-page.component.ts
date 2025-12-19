import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-input-home-page',
  standalone: true,
  imports: [],
  templateUrl: './input-home-page.component.html',
  styleUrl: './input-home-page.component.css'
})
export class InputHomePageComponent {

  @Input() type : string = "default";
  @Output() valueChanged = new EventEmitter<string>();
  constructor() {
  }

  getType(): string {
    return this.type;
  }

  onInput(event : Event){
    const value = (event.target as HTMLInputElement).value;
    this.valueChanged.emit(value);
  }


}
