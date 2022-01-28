using NotesManager.Host.Data;
using NotesManager.Host.Data.Entities;
using NotesManager.Host.Repositories.Interfaces;

namespace NotesManager.Host.Repositories;

public class NotesRepository : INotesRepository
{
    private readonly ILogger<NotesRepository> _logger;

    private readonly List<Note> _notes;

    public NotesRepository(ILogger<NotesRepository> logger)
    {
        _logger = logger;
        _notes = MockedDatabase.Notes;
    }

    public int? Add(string title, int? typeId, string? description, string? pictureFileName)
    {
        var newId = _notes.LastOrDefault()?.Id + 1 ?? 0;

        var addItem = new Note()
        {
            Id = newId,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow,
            Title = title,
            TypeId = typeId,
            Description = description,
            PictureFileName = pictureFileName,
        };

        try
        {
            _notes.Add(addItem);

            return addItem.Id;
        }
        catch
        {
            return null;
        }
    }

    public int? Delete(int id)
    {
        var deleteItem = _notes.FirstOrDefault(n => n.Id == id);

        if (deleteItem != null)
        {
            _notes.Remove(deleteItem);

            return deleteItem.Id;
        }
        else
        {
            return null;
        }
    }

    public int? Update(int id, string? title, int? typeId, string? description, string? pictureFileName)
    {
        var updateItem = _notes.FirstOrDefault(n => n.Id == id);

        if (updateItem != null)
        {
            updateItem.Title = title ?? updateItem.Title;
            updateItem.UpdatedAt = DateTime.UtcNow;
            updateItem.TypeId = typeId ?? updateItem.TypeId;
            updateItem.Description = description ?? updateItem.Description;
            updateItem.PictureFileName = pictureFileName ?? updateItem.PictureFileName;

            return updateItem.Id;
        }
        else
        {
            return null;
        }
    }

    public IEnumerable<Note>? GetAll()
    {
        var result = _notes
            .OrderBy(n => n.UpdatedAt)
            .ToList();

        if (result != null && result.Any())
        {
            return result;
        }
        else
        {
            return null;
        }
    }

    public Note? GetById(int id)
    {
        var result = _notes.FirstOrDefault(n => n.Id == id);

        return result;
    }

    public PaginatedItems<Note>? GetPaginated(int pageSize, int pageIndex)
    {
        var totalItems = _notes.Count;

        var result = _notes
            .OrderBy(n => n.UpdatedAt)
            .Skip(pageSize * pageIndex)
            .Take(pageSize)
            .ToList();

        if (result != null && result.Any())
        {
            return new PaginatedItems<Note>() { TotalCount = totalItems, Data = result };
        }
        else
        {
            return null;
        }
    }
}
