import { NoteDto } from '.';

export interface NotesPaginatedDto {
  count: number;
  data: NoteDto[];
  pageIndex: number;
  pageSize: number;
}
