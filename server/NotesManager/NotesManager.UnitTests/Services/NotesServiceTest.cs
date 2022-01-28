using Infrastructure.Common.Services;

namespace NotesManager.UnitTests.Services;

public class NotesServiceTest
{
    private readonly Mock<ILogger<BaseDataService>> _logger;

    private readonly Mock<IMapper> _mapper;

    private readonly Mock<INotesRepository> _notesRepository;

    private readonly INotesService _notesService;

    private readonly Note _testNote;

    private readonly NoteDto _testNoteDto;

    public NotesServiceTest()
    {
        _logger = new Mock<ILogger<BaseDataService>>();
        _mapper = new Mock<IMapper>();
        _notesRepository = new Mock<INotesRepository>();

        _testNote = new Note()
        {
            Id = 1,
            CreatedAt = new DateTime(2022, 01, 28),
            UpdatedAt = new DateTime(2022, 01, 29),
            TypeId = 1,
            Title = "Test Note 1",
            Description = "Description",
            PictureFileName = "1.png",
        };

        _testNoteDto = new NoteDto()
        {
            Id = 1,
            CreatedAt = new DateTime(2022, 01, 28),
            UpdatedAt = new DateTime(2022, 01, 29),
            TypeId = 1,
            Title = "Test Note 1",
            Description = "Description",
            PictureUrl = "127.0.0.1:5050/assets/images/1.png",
        };

        _notesService = new NotesService(
            _notesRepository.Object,
            _mapper.Object,
            _logger.Object);
    }

    [Fact]
    public async Task AddAsync_Failed()
    {
        // arrange
        int? testResult = null;

        _notesRepository
            .Setup(
                s =>
                    s.Add(
                        It.Is<string>(i => i == _testNote.Title),
                        It.Is<int>(i => i == _testNote.TypeId),
                        It.Is<string>(i => i == _testNote.Description),
                        It.Is<string>(i => i == _testNote.PictureFileName)))
            .Returns(testResult);

        // act
        var result = await _notesService.AddAsync(
            _testNote.Title,
            _testNote.TypeId,
            _testNote.Description,
            _testNote.PictureFileName);

        // assert
        result.Should().Be(testResult);
    }

    [Fact]
    public async Task AddAsync_Success()
    {
        // arrange
        _notesRepository
            .Setup(
                s =>
                    s.Add(
                        It.Is<string>(i => i == _testNote.Title),
                        It.Is<int>(i => i == _testNote.TypeId),
                        It.Is<string>(i => i == _testNote.Description),
                        It.Is<string>(i => i == _testNote.PictureFileName)))
            .Returns(_testNote.Id);

        // act
        var result = await _notesService.AddAsync(
            _testNote.Title,
            _testNote.TypeId,
            _testNote.Description,
            _testNote.PictureFileName);

        // assert
        result.Should().Be(_testNote.Id);
    }

    [Fact]
    public async Task DeleteAsync_Failed()
    {
        // arrange
        int? testResult = null;

        _notesRepository
            .Setup(s => s.Delete(It.Is<int>(i => i == _testNote.Id)))
            .Returns(testResult);

        // act
        var result = await _notesService.DeleteAsync(_testNote.Id);

        // assert
        result.Should().Be(testResult);
    }

    [Fact]
    public async Task DeleteAsync_Success()
    {
        // arrange
        _notesRepository
            .Setup(s => s.Delete(It.Is<int>(i => i == _testNote.Id)))
            .Returns(_testNote.Id);

        // act
        var result = await _notesService.DeleteAsync(_testNote.Id);

        // assert
        result.Should().Be(_testNote.Id);
    }

    [Fact]
    public async Task UpdateAsync_Failed()
    {
        // arrange
        int? testResult = null;

        _notesRepository
            .Setup(
                s =>
                    s.Update(
                        It.Is<int>(i => i == _testNote.Id),
                        It.Is<string>(i => i == _testNote.Title),
                        It.Is<int>(i => i == _testNote.TypeId),
                        It.Is<string>(i => i == _testNote.Description),
                        It.Is<string>(i => i == _testNote.PictureFileName)))
            .Returns(testResult);

        // act
        var result = await _notesService.UpdateAsync(
            _testNote.Id,
            _testNote.Title,
            _testNote.TypeId,
            _testNote.Description,
            _testNote.PictureFileName);

        // assert
        result.Should().Be(testResult);
    }

    [Fact]
    public async Task UpdateAsync_Success()
    {
        // arrange
        _notesRepository
            .Setup(
                s =>
                    s.Update(
                        It.Is<int>(i => i == _testNote.Id),
                        It.Is<string>(i => i == _testNote.Title),
                        It.Is<int>(i => i == _testNote.TypeId),
                        It.Is<string>(i => i == _testNote.Description),
                        It.Is<string>(i => i == _testNote.PictureFileName)))
            .Returns(_testNote.Id);

        // act
        var result = await _notesService.UpdateAsync(
            _testNote.Id,
            _testNote.Title,
            _testNote.TypeId,
            _testNote.Description,
            _testNote.PictureFileName);

        // assert
        result.Should().Be(_testNote.Id);
    }

    [Fact]
    public async Task GetAllAsync_Failed()
    {
        // arrange
        _notesRepository
            .Setup(s => s.GetAll())
            .Returns((Func<IEnumerable<Note>?>)null!);

        // act
        var result = await _notesService.GetAllAsync();

        // assert
        result?.Should().BeNull();
    }

    [Fact]
    public async Task GetAllAsync_Success()
    {
        // arrange
        var noteSuccess = _testNote;

        var noteDtoSuccess = _testNoteDto;

        IEnumerable<Note> notesSuccess = new List<Note>()
        {
            noteSuccess,
        };

        IEnumerable<NoteDto> notesDtoSuccess = new List<NoteDto>()
        {
            noteDtoSuccess,
        };

        _notesRepository
            .Setup(s => s.GetAll())
            .Returns(notesSuccess);

        _mapper
            .Setup(
                s =>
                    s.Map<NoteDto>(
                        It.Is<Note>(i => i.Equals(noteSuccess))))
            .Returns(noteDtoSuccess);

        // act
        var result = await _notesService.GetAllAsync();

        // assert
        result?.Should().BeEquivalentTo(notesDtoSuccess);
    }

    [Fact]
    public async Task GetByIdAsync_Failed()
    {
        // arrange
        var noteFailed = new Note() { };

        var noteDtoFailed = new NoteDto() { };

        _notesRepository
            .Setup(s => s.GetById(It.Is<int>(i => i == noteFailed.Id)))
            .Returns((Func<Note>)null!);

        // act
        var result = await _notesService.GetByIdAsync(noteFailed.Id);

        // assert
        result?.Should().BeNull();
    }

    [Fact]
    public async Task GetByIdAsync_Success()
    {
        // arrange
        var noteSuccess = _testNote;

        var noteDtoSuccess = _testNoteDto;

        _notesRepository
            .Setup(s => s.GetById(It.Is<int>(i => i == noteSuccess.Id)))
            .Returns(noteSuccess);

        // act
        var result = await _notesService.GetByIdAsync(noteSuccess.Id);

        // assert
        result?.Should().BeSameAs(noteDtoSuccess);
    }

    [Fact]
    public async Task GetPaginatedAsync_Failed()
    {
        // arrange
        var testPageIndex = 1000;
        var testPageSize = 10000;

        _notesRepository
            .Setup(
                s =>
                    s.GetPaginated(
                        It.Is<int>(i => i == testPageSize),
                        It.Is<int>(i => i == testPageIndex)))
            .Returns((Func<PaginatedItems<Note>>)null!);

        // act
        var result = await _notesService.GetPaginatedAsync(testPageSize, testPageIndex);

        // assert
        result.Should().BeNull();
    }

    [Fact]
    public async Task GetPaginatedAsync_Success()
    {
        // arrange
        var testPageIndex = 0;
        var testPageSize = 4;
        var testTotalCount = 12;

        var noteSuccess = _testNote;

        var noteDtoSuccess = _testNoteDto;

        var paginatedNotesSuccess = new PaginatedItems<Note>()
        {
            Data = new List<Note>() { noteSuccess, },
            TotalCount = testTotalCount,
        };

        _notesRepository
            .Setup(
                s =>
                    s.GetPaginated(
                        It.Is<int>(i => i == testPageSize),
                        It.Is<int>(i => i == testPageIndex)))
            .Returns(paginatedNotesSuccess);

        _mapper
            .Setup(
                s =>
                    s.Map<NoteDto>(
                        It.Is<Note?>(i => i!.Equals(noteSuccess))))
            .Returns(noteDtoSuccess);

        // act
        var result = await _notesService.GetPaginatedAsync(testPageSize, testPageIndex);

        // assert
        result.Should().NotBeNull();
        result?.Data.Should().BeEquivalentTo(new List<NoteDto>() { noteDtoSuccess });
        result?.Count.Should().Be(testTotalCount);
        result?.PageIndex.Should().Be(testPageIndex);
        result?.PageSize.Should().Be(testPageSize);
    }
}
