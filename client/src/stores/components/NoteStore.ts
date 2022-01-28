/* eslint-disable @typescript-eslint/no-unused-expressions */
import { inject, injectable } from 'inversify';
import { makeAutoObservable } from 'mobx';
import 'reflect-metadata';
import { NotesStore } from '.';
import { IoCTypes } from '../../ioc';
import type { Note } from '../../models';
import type { NotesService } from '../../services';

@injectable()
export default class NoteStore {
  @inject(IoCTypes.notesService)
  private readonly notesService!: NotesService;
  @inject(IoCTypes.notesStore)
  private readonly notesStore!: NotesStore;

  isLoading = false;
  note: Note | null = null;
  error: string | null = null;
  title = '';
  typeId = 0;
  description = '';
  pictureFileName = '';
  id: number | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  public init = () => {
    this.id = null;
    this.error = null;
    this.note = null;
  };

  public getFields = async (id: number) => {
    this.title = '';
    this.typeId = 0;
    this.description = '';
    this.pictureFileName = '';
    this.init();
    try {
      this.isLoading = true;
      this.note = await this.notesService.getById(id);
      this.title = this.note.title!;
      this.typeId = this.note.typeId!;
      this.description = this.note.description!;
      this.pictureFileName = this.note.pictureUrl?.substring(this.note.pictureUrl?.lastIndexOf('/') + 1)!;
    } catch (e) {
      if (e instanceof Error) {
        this.error = e.message;
      }
    }
    this.isLoading = false;
  };

  public create = async (): Promise<void> => {
    this.init();
    try {
      this.isLoading = true;
      const result = await this.notesService.create({
        Title: this.title,
        TypeId: Number(this.typeId),
        Description: this.description,
        PictureFileName: this.pictureFileName,
      });
      await this.notesStore.getAll();
      this.id = result.id;
    } catch (e) {
      if (e instanceof Error) {
        this.error = e.message;
      }
    }
    this.isLoading = false;
  };

  public update = async (id: number) => {
    this.init();
    try {
      this.isLoading = true;
      await this.notesService.update(id, {
        Title: this.title,
        TypeId: this.typeId,
        Description: this.description,
        PictureFileName: this.pictureFileName,
      });
    } catch (e) {
      if (e instanceof Error) {
        if (e.message.match('JSON')) {
          this.id = id;
        } else {
          this.error = e.message;
        }
      }
    }
    this.isLoading = false;
  };

  public delete = async (id: number) => {
    this.init();
    try {
      this.isLoading = true;
      await this.notesService.delete(id);
      await this.notesStore.getAll();
    } catch (e) {
      if (e instanceof Error) {
        this.error = e.message;
      }
    }
    this.isLoading = false;
  };

  public changeTitle = (text: string): void => {
    this.title = text;
  };

  public changeTypeId = (num: number): void => {
    this.typeId = num;
  };

  public changeDescription = (text: string): void => {
    this.description = text;
  };

  public changePictureFileName = (text: string): void => {
    this.pictureFileName = text;
  };
}
