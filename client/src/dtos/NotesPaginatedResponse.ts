import { NoteDto } from '.';

export interface NotesPaginatedResponse {
  data: NoteDto[];
  total_pages: number;
}
