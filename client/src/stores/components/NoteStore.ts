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
  error = '';
  title = '';
  description = '';
  pictureFileName = '';
  typeId: number | undefined = undefined;
  id: number | undefined = undefined;

  constructor() {
    makeAutoObservable(this);
  }

  public init = () => {
    this.id = undefined;
    this.error = '';
    this.note = null;
  };

  public getFields = async (id: number) => {
    this.init();
    this.title = '';
    this.typeId = undefined;
    this.description = '';
    this.pictureFileName = '';
    try {
      this.isLoading = true;
      this.note = await this.notesService.getById(id);
      this.title = this.note.title!;
      this.typeId = this.note.typeId!;
      this.description = this.note.description!;
      this.pictureFileName = this.note.pictureUrl?.substring(this.note.pictureUrl?.lastIndexOf('/') + 1)!;
    } catch (e) {
      if (e instanceof Error) {
        console.log(e.message);
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
      this.id = result.id;
    } catch (e) {
      if (e instanceof Error) {
        console.log(e.message);
        this.error = e.message;
      }
    }
    this.notesStore.count !== undefined ? (this.notesStore.count += 1) : (this.notesStore.count = 1);
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
        console.log(e.message);
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
    } catch (e) {
      if (e instanceof Error) {
        console.log(e.message);
        if (e.message.match('JSON')) {
          this.notesStore.count !== undefined ? (this.notesStore.count -= 1) : null;
        } else {
          this.error = e.message;
        }
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
