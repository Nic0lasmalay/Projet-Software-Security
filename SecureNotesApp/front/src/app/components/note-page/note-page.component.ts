import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {Note} from '../../model/note';
import {NoteManagerService} from '../../services/noteService/note-manager.service';
import {FormsModule} from '@angular/forms';
import {PopUpAddNoteComponent} from '../pop-up-add-note/pop-up-add-note.component';
import {PopUpShareNoteComponent} from '../pop-up-share-note/pop-up-share-note.component';
import {Invitation} from '../../model/invitation';
import {AuthService} from '../../services/authService/auth-service.service';

@Component({
  selector: 'app-note-page',
  standalone: true,
  imports: [
    FormsModule,
    PopUpAddNoteComponent,
    PopUpShareNoteComponent
  ],
  templateUrl: './note-page.component.html',
  styleUrl: './note-page.component.css'
})
export class NotePageComponent {

  constructor(private router: Router, private noteService:NoteManagerService, protected authService: AuthService) {
  }
  isButtonGetNotesClicked : boolean=false;
  isButtonAddNoteClicked : boolean=false;
  isTitleNotFound:boolean=false;
  isShareModalOpen:boolean=false;

  selectedNote : Note={
    id:-1,
    title:"",
    content:""
  };

  invitation :Invitation={
    noteId: -1,
    username: "",
    canEdit: false
  };

  newNote :Note={
    id:-1,
    title:"",
    content:"",
    user_can_edit:true,
    version: 1
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
      version:1
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
        console.log(id);
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
        this.myNotes.unshift(res)
        console.log("Note ajouté : ",res);
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
      next: res=>{
        console.log("Update Note :", note.title);
        this.selectedNote.version = res.version;
        alert("✅ : Note enregistrée !");
      },
      error:(err)=>{
        console.log("Erreur lors de l'update de la note : ", err);
        if (err.status === 409) {
          alert("⚠️ Conflit de modification ! Une autre personne a enregistré cette note pendant que vous l'éditiez. Veuillez copier vos changements et rafraîchir la page.");
        } else {
          alert("Erreur lors de l'enregistrement.");
        }
      }
    });
  }
  selectNote(note:Note){
    this.isButtonAddNoteClicked=false;
    let isOwner = false;
    if(this.authService.getUserIdFromToken()===note.owner_id){
      isOwner = true;
    }
    if(isOwner){
      note.user_can_edit = true;
    }
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

  onShareNote(note:Note){
    this.invitation.noteId=note.id;
    this.noteService.shareNote(this.invitation).subscribe({
      next : value => {
        console.log("Note partagé ",value);
        this.isShareModalOpen=false;
      },
      error : err => {
        console.log("Invitattion envoyé : ",this.invitation)
        console.log(err);
      }
    })
  }


}
