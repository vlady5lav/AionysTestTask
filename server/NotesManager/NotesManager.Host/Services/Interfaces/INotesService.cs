using NotesManager.Host.Models.Dtos;
using NotesManager.Host.Models.Responses;

namespace NotesManager.Host.Services.Interfaces;

public interface INotesService
{
    Task<int?> AddAsync(string title, int? typeId, string? description, string? pictureFileName);

    Task<int?> DeleteAsync(int id);

    Task<int?> UpdateAsync(int id, string? title, int? typeId, string? description, string? pictureFileName);

    Task<IEnumerable<NoteDto>?> GetAllAsync();

    Task<NoteDto?> GetByIdAsync(int id);

    Task<PaginatedItemsResponse<NoteDto>?> GetPaginatedAsync(int pageSize, int pageIndex);
}
