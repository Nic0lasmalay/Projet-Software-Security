import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Note} from '../../model/note';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NoteManagerService {

  API_URL="http://localhost:3000/api/notes";
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

}
