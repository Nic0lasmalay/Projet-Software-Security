import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Note} from '../../model/note';
import {HttpClient} from '@angular/common/http';
import {Invitation} from '../../model/invitation';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class NoteManagerService {

  API_URL= `${environment.apiUrl}/notes
  `;

  constructor(private http: HttpClient) { }

  getNotes(): Observable<Note[]> {
    return this.http.get<Note[]>(`${this.API_URL}`);
  }

  addNote(note: Note): Observable<Note> {
    return this.http.post<Note>(`${this.API_URL}`, note);
  }

  deleteNote(id: number | undefined): Observable<Note> {
    return this.http.delete<Note>(`${this.API_URL}/${id}`);
  }

  updateNote(note: Note): Observable<Note> {
    return this.http.put<Note>(`${this.API_URL}/${note.id}`, note);
  }

  shareNote (data:Invitation): Observable<Invitation> {
    return this.http.post<Invitation>(`${this.API_URL}/${data.noteId}/share`, data);
  }

}
