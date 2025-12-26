import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {Note} from '../../model/note';
import {NoteManagerService} from '../../services/noteService/note-manager.service';
import {FormsModule} from '@angular/forms';
import {PopUpAddNoteComponent} from '../pop-up-add-note/pop-up-add-note.component';

@Component({
  selector: 'app-note-page',
  standalone: true,
  imports: [
    FormsModule,
    PopUpAddNoteComponent
  ],
  templateUrl: './note-page.component.html',
  styleUrl: './note-page.component.css'
})
export class NotePageComponent {

  constructor(private router: Router,private noteService:NoteManagerService) {
  }
  isButtonGetNotesClicked : boolean=false;
  isButtonAddNoteClicked : boolean=false;
  isTitleNotFound:boolean=false;

  selectedNote : Note={
    id:-1,
    title:"",
    content:""
  };

  newNote :Note={
    title:"",
    content:""
}
;
  myNotes : Note[]=[];


  onGetNotes(){
    if(this.isButtonGetNotesClicked){
      this.myNotes=[];
      this.isButtonGetNotesClicked=false;
      this.selectedNote.id=-1;
      return;
    }
    this.isButtonAddNoteClicked=false;
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

  onAddNote(){
    this.isButtonAddNoteClicked=!this.isButtonAddNoteClicked;
    this.selectedNote={
      id:-1,
      content:"",
      title:"",
    }
  }

  onDeleteNote(id: number | undefined){
    this.noteService.deleteNote(id).subscribe({
      next:(res)=>{
        console.log("Suppression de la Note : ",res);
        this.myNotes=this.myNotes.filter(note=>note.id !== id);
        this.selectedNote={id:-1,title:"",content:""};
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  onRegisterAddNote(){
    this.isTitleNotFound=false;
    if(this.newNote.title == ""){
      this.isTitleNotFound=true;
      console.warn("Veuillez entrer un titre");
      return;
    }
    this.noteService.addNote(this.newNote).subscribe({
      next: res =>{
        console.log("Note ajouté : ",res.title);
      },
      error: err => {
        console.log("Erreur lors de l'ajout de la note : ", err);
      }
    });
    this.newNote.title="";
    this.newNote.content="";
    this.isButtonAddNoteClicked=false;
  }

  onCancel(){
    this.isButtonAddNoteClicked=false;
  }

  onUpdateNote(note:Note){
    this.noteService.updateNote(note).subscribe({
      next: note=>{
        console.log("Update Note :", note.title);
      },
      error:(err)=>{
        console.log(note);
        console.log("Erreur lors de l'update de la note : ", err);
      }
    });
  }
  selectNote(note:Note){
    this.isButtonAddNoteClicked=false;
    this.selectedNote = note;
    console.log("Note sélectionné : ",this.selectedNote);
  }

  onLogout(){
    const confirmation = confirm("Voulez-vous vraiment vous déconnecter ?");
    if(confirmation){
      localStorage.removeItem('token');
      this.router.navigate(['/']);
    }
  }


}
