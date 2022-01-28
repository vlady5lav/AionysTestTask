namespace NotesManager.Host.Data.Entities;

public class Note
{
    public int Id { get; set; }

    public DateTime CreatedAt { get; set; }

    public DateTime UpdatedAt { get; set; }

    public string Title { get; set; } = null!;

    public int? TypeId { get; set; } = 0;

    public string? Description { get; set; }

    public string? PictureFileName { get; set; }
}
