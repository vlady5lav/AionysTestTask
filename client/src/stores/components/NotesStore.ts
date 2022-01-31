import { inject, injectable } from 'inversify';
import i18n from 'locales/config';
import { makeAutoObservable } from 'mobx';
import 'reflect-metadata';
import { IoCTypes } from '../../ioc';
import type { Note } from '../../models';
import type { NotesService } from '../../services';

@injectable()
export default class NotesStore {
  @inject(IoCTypes.notesService)
  private readonly notesService!: NotesService;

  isLoading = false;
  notes: Note[] = [];
  note: Note | null = null;
  error = '';
  queryString = '';
  count: number | undefined = undefined;
  totalPages = 0;
  currentPage = 1;
  pageLimit = 8;

  constructor() {
    makeAutoObservable(this);
  }

  public init = () => {
    this.error = '';
    this.note = null;
  };

  public getAll = async (): Promise<number | undefined> => {
    this.init();
    try {
      this.isLoading = true;
      const result = await this.notesService.getAll();
      this.notes = result.data;
      this.count = result.data.length;
    } catch (e) {
      if (e instanceof Error) {
        console.log(e.message);
        this.error = e.message;
      }
    }
    this.isLoading = false;
    return this.count;
  };

  public getById = async (id: number): Promise<number | undefined> => {
    this.init();
    try {
      this.isLoading = true;
      const result = await this.notesService.getById(id);
      this.note = { ...result };
    } catch (e) {
      if (e instanceof Error) {
        console.log(e.message);
        this.error = e.message;
      }
    }
    this.isLoading = false;
    return this.note?.id;
  };

  public getPaginated = async (index: number, size = this.pageLimit) => {
    this.init();
    const urlParams = new URLSearchParams(window.location.search);
    const page = urlParams.get('_page');
    this.currentPage = Number(index ?? this.currentPage);
    try {
      this.isLoading = true;
      const result = await this.notesService.getByPage({
        pageIndex: (page ? Number(page) : this.currentPage) - 1,
        pageSize: Number(size),
      });
      this.notes = result.data;
      this.totalPages = result.total_pages;
    } catch (e) {
      if (e instanceof Error) {
        console.log(e.message);
        console.error(e.message);
      }
    }
    this.isLoading = false;
  };

  public search = async () => {
    this.init();
    try {
      this.isLoading = true;
      const id = Number(this.queryString);
      if (isNaN(id)) {
        this.queryString = '';
        this.error = i18n.t('notes:error.input');
        return;
      }
      const result = await this.notesService.getById(id);
      this.note = { ...result };
    } catch (e) {
      if (e instanceof Error) {
        console.log(e.message);
        this.queryString = '';
        this.error = e.message;
      }
    }
    this.queryString = '';
    this.isLoading = false;
  };

  public changePage = async (page: number) => {
    this.currentPage = page;
  };

  public changeQueryString = (query: string): void => {
    this.queryString = query;
  };
}
