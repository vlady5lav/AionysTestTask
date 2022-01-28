namespace NotesManager.Host.Models.Requests;

public class UpdateNoteRequest
{
    public string? Title { get; set; }

    public int? TypeId { get; set; }

    public string? Description { get; set; }

    public string? PictureFileName { get; set; }
}
