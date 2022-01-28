using NotesManager.Host.Data;
using NotesManager.Host.Data.Entities;

namespace NotesManager.Host.Repositories.Interfaces;

public interface INotesRepository
{
    int? Add(string title, int? typeId, string? description, string? pictureFileName);

    int? Delete(int id);

    int? Update(int id, string? title, int? typeId, string? description, string? pictureFileName);

    IEnumerable<Note>? GetAll();

    Note? GetById(int id);

    PaginatedItems<Note>? GetPaginated(int pageSize, int pageIndex);
}
