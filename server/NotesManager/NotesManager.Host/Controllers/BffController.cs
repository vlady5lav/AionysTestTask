using NotesManager.Host.Models.Dtos;
using NotesManager.Host.Models.Requests;
using NotesManager.Host.Models.Responses;
using NotesManager.Host.Services.Interfaces;

namespace NotesManager.Host.Controllers;

[ApiController]
[Route(ComponentDefaults.DefaultRoute)]
public class BffController : ControllerBase
{
    private readonly ILogger<BffController> _logger;

    private readonly INotesService _notesService;

    public BffController(ILogger<BffController> logger, INotesService notesService)
    {
        _logger = logger;
        _notesService = notesService;
    }

    [HttpPost]
    [ProducesResponseType(typeof(CreateNoteResponse<int>), (int)HttpStatusCode.OK)]
    [ProducesResponseType((int)HttpStatusCode.BadRequest)]
    [Route("/notes")]
    public async Task<IActionResult> Create(CreateNoteRequest request)
    {
        var result = await _notesService.AddAsync(
            request.Title,
            request.TypeId,
            request.Description,
            request.PictureFileName);

        if (result != null)
        {
            return Ok(new CreateNoteResponse<int?>() { Id = result });
        }
        else
        {
            return BadRequest();
        }
    }

    [HttpPut]
    [ProducesResponseType((int)HttpStatusCode.NoContent)]
    [ProducesResponseType((int)HttpStatusCode.BadRequest)]
    [Route("/notes/{id}")]
    public async Task<IActionResult> Update(int id, UpdateNoteRequest request)
    {
        var result = await _notesService.UpdateAsync(
            id,
            request.Title,
            request.TypeId,
            request.Description,
            request.PictureFileName);

        if (result != null)
        {
            return NoContent();
        }
        else
        {
            return BadRequest();
        }
    }

    [HttpDelete]
    [ProducesResponseType((int)HttpStatusCode.NoContent)]
    [ProducesResponseType((int)HttpStatusCode.BadRequest)]
    [Route("/notes/{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var result = await _notesService.DeleteAsync(id);

        if (result != null)
        {
            return NoContent();
        }
        else
        {
            return BadRequest();
        }
    }

    [HttpGet]
    [ProducesResponseType(typeof(NotesDto), (int)HttpStatusCode.OK)]
    [ProducesResponseType((int)HttpStatusCode.NotFound)]
    [Route("/notes")]
    public async Task<IActionResult> GetAll()
    {
        var result = new NotesDto() { Data = await _notesService.GetAllAsync() };

        if (result.Data != null && result.Data.Any())
        {
            return Ok(result);
        }
        else
        {
            return NotFound();
        }
    }

    [HttpGet]
    [ProducesResponseType(typeof(NoteDto), (int)HttpStatusCode.OK)]
    [ProducesResponseType((int)HttpStatusCode.NotFound)]
    [Route("/notes/{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var result = await _notesService.GetByIdAsync(id);

        if (result != null)
        {
            return Ok(result);
        }
        else
        {
            return NotFound();
        }
    }

    [HttpPost]
    [ProducesResponseType(typeof(PaginatedItemsResponse<NoteDto>), (int)HttpStatusCode.OK)]
    [ProducesResponseType((int)HttpStatusCode.NotFound)]
    [Route("/notes/paginated")]
    public async Task<IActionResult> GetPaginated(PaginatedItemsRequest request)
    {
        var result = await _notesService.GetPaginatedAsync(request.PageSize, request.PageIndex);

        if (result != null && result.Data.Any())
        {
            return Ok(result);
        }
        else
        {
            return NotFound();
        }
    }
}
