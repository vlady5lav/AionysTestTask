namespace NotesManager.Host.Models.Requests;

public class CreateNoteRequest
{
    public string Title { get; set; } = null!;

    public int? TypeId { get; set; } = 0;

    public string? Description { get; set; }

    public string? PictureFileName { get; set; }
}
