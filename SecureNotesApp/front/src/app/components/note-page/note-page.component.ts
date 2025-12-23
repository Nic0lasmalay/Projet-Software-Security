import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {Note} from '../../model/note';
import {NoteManagerService} from '../../services/noteService/note-manager.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-note-page',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './note-page.component.html',
  styleUrl: './note-page.component.css'
})
export class NotePageComponent {

  constructor(private router: Router,private noteService:NoteManagerService) {
  }
  isButtonGetNotesClicked : boolean=false;
  isButtonAddNoteClicked : boolean=false;

  selectedNote : Note={
    id:0,
    title:"",
    content:""
  };

  myNotes : Note[]=[];


  onGetNotes(){
    this.isButtonGetNotesClicked=true;
    this.noteService.getNotes().subscribe(
      {
        next: listNotes => {
          console.log("Obtention des Notes : ",listNotes);
          this.myNotes=listNotes;

        },
        error: err => {
          console.log("Erreur lors de l'obtention des notes : ",err);
        }
      });
  }
  selectNote(note:Note){
    this.selectedNote = note;
  }


}
