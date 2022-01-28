import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import type {
  CreateNoteRequest,
  CreateNoteResponse,
  NoteDto,
  NotesDto,
  NotesPaginatedDto,
  NotesPaginatedRequest,
  NotesPaginatedResponse,
  UpdateNoteRequest,
} from '../dtos';
import { IoCTypes } from '../ioc';
import type { Note, Notes } from '../models';
import { ContentType, HttpService, MethodType } from './HttpService';

export interface NotesService {
  create(request: CreateNoteRequest): Promise<CreateNoteResponse<number>>;
  delete(id: number): Promise<boolean>;
  update(id: number, request: UpdateNoteRequest): Promise<boolean>;
  getAll(): Promise<Notes>;
  getById(id: number): Promise<Note>;
  getByPage(request: NotesPaginatedRequest): Promise<NotesPaginatedResponse>;
}

@injectable()
export default class DefaultNotesService implements NotesService {
  @inject(IoCTypes.httpService)
  private readonly httpService!: HttpService;

  public async create(request: CreateNoteRequest): Promise<CreateNoteResponse<number>> {
    const result = await this.httpService.send<CreateNoteResponse<number>>(
      `notes/`,
      MethodType.POST,
      { contentType: ContentType.Json },
      request
    );
    const data = result.data;
    return data;
  }

  public async delete(id: number): Promise<boolean> {
    const result = await this.httpService.send<CreateNoteResponse<number>>(`notes/${id}`, MethodType.DELETE);

    if (result.status === 204) {
      return true;
    } else {
      return false;
    }
  }

  public async update(id: number, request: UpdateNoteRequest): Promise<boolean> {
    const result = await this.httpService.send(
      `notes/${id}`,
      MethodType.PUT,
      { contentType: ContentType.Json },
      request
    );

    if (result.status === 204) {
      return true;
    } else {
      return false;
    }
  }

  public async getAll(): Promise<Notes> {
    const result = await this.httpService.send<NotesDto>(`notes/`, MethodType.GET);
    const data = result.data;
    return data;
  }

  public async getById(id: number): Promise<Note> {
    const result = await this.httpService.send<NoteDto>(`notes/${id}`, MethodType.GET);
    return result.data;
  }

  public async getByPage(request: NotesPaginatedRequest): Promise<NotesPaginatedResponse> {
    const result = await this.httpService.send<NotesPaginatedDto>(
      `notes/paginated/`,
      MethodType.POST,
      { contentType: ContentType.Json },
      request
    );
    const data = result.data.data;
    const total_pages = Math.ceil(result.data.count / request.pageSize);
    return { data: data, total_pages: total_pages };
  }
}
