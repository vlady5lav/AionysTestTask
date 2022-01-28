import { Container } from 'inversify';
import type { HttpService } from '../services/HttpService';
import DefaultHttpService from '../services/HttpService';
import type { NotesService } from '../services/NotesService';
import DefaultNotesService from '../services/NotesService';
import { NotesStore, NoteStore } from '../stores';
import { IoCTypes } from './';

export const IoCContainer = new Container();

IoCContainer.bind<NotesService>(IoCTypes.notesService).to(DefaultNotesService).inSingletonScope();
IoCContainer.bind<HttpService>(IoCTypes.httpService).to(DefaultHttpService).inSingletonScope();
IoCContainer.bind<NotesStore>(IoCTypes.notesStore).to(NotesStore).inSingletonScope();
IoCContainer.bind<NoteStore>(IoCTypes.noteStore).to(NoteStore).inTransientScope();

export default IoCContainer;
