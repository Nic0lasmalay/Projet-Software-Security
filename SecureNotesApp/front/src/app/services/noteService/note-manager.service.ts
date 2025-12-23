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

}
