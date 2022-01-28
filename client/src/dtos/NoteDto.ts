export interface NoteDto {
  id: number;
  createdAt?: Date;
  updatedAt?: Date;
  title?: string;
  typeId?: number;
  description?: string;
  pictureUrl?: string;
}
