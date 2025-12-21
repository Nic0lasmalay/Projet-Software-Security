import { Routes } from '@angular/router';
import {HomePageComponent} from './components/home-page/home-page.component';
import {NotePageComponent} from './components/note-page/note-page.component';

export const routes: Routes = [
  { path: '', component:HomePageComponent},
  { path: 'notes', component: NotePageComponent},
];
