namespace NotesManager.Host.Models.Responses;

public class CreateNoteResponse<T>
{
    public T Id { get; set; } = default!;
}
