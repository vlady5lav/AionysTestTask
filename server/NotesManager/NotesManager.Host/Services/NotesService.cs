using NotesManager.Host.Models.Dtos;
using NotesManager.Host.Models.Responses;
using NotesManager.Host.Repositories.Interfaces;
using NotesManager.Host.Services.Interfaces;

namespace NotesManager.Host.Services;

public class NotesService : BaseDataService, INotesService
{
    private readonly IMapper _mapper;

    private readonly INotesRepository _notesRepository;

    public NotesService(INotesRepository notesRepository, IMapper mapper, ILogger<BaseDataService> logger)
        : base(logger)
    {
        _notesRepository = notesRepository;
        _mapper = mapper;
    }

    public async Task<int?> AddAsync(string title, int? typeId, string? description, string? pictureFileName)
    {
        return await ExecuteSafeAsync(async () => await Task.Run(() => _notesRepository.Add(title, typeId, description, pictureFileName)));
    }

    public async Task<int?> DeleteAsync(int id)
    {
        return await ExecuteSafeAsync(async () => await Task.Run(() => _notesRepository.Delete(id)));
    }

    public async Task<int?> UpdateAsync(int id, string? title, int? typeId, string? description, string? pictureFileName)
    {
        return await ExecuteSafeAsync(async () => await Task.Run(() => _notesRepository.Update(id, title, typeId, description, pictureFileName)));
    }

    public async Task<IEnumerable<NoteDto>?> GetAllAsync()
    {
        return await ExecuteSafeAsync(async () => await Task.Run(() =>
        {
            var result = _notesRepository.GetAll();

            if (result == null || !result.Any())
            {
                return null;
            }

            return result.Select(n => _mapper.Map<NoteDto>(n)).ToList();
        }));
    }

    public async Task<NoteDto?> GetByIdAsync(int id)
    {
        return await ExecuteSafeAsync(async () => await Task.Run(() =>
            {
                var result = _notesRepository.GetById(id);

                if (result == null)
                {
                    return null;
                }

                return _mapper.Map<NoteDto>(result);
            }));
    }

    public async Task<PaginatedItemsResponse<NoteDto>?> GetPaginatedAsync(int pageSize, int pageIndex)
    {
        return await ExecuteSafeAsync(async () => await Task.Run(() =>
        {
            var result = _notesRepository.GetPaginated(pageSize, pageIndex);

            if (result == null || !result.Data.Any())
            {
                return null;
            }

            return new PaginatedItemsResponse<NoteDto>()
            {
                Count = result.TotalCount,
                Data = result.Data.Select(n => _mapper.Map<NoteDto>(n)).ToList(),
                PageIndex = pageIndex,
                PageSize = pageSize,
            };
        }));
    }
}
