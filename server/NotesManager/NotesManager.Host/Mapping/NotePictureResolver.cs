using NotesManager.Host.Configurations;
using NotesManager.Host.Data.Entities;
using NotesManager.Host.Models.Dtos;

namespace NotesManager.Host.Mapping;

public class NotePictureResolver : IMemberValueResolver<Note, NoteDto, string, object>
{
    private readonly NotesManagerConfig _config;

    public NotePictureResolver(IOptionsSnapshot<NotesManagerConfig> config)
    {
        _config = config.Value;
    }

    public object Resolve(Note source, NoteDto destination, string sourceMember, object destMember, ResolutionContext context)
    {
        return $"{_config.CdnHost}/{_config.ImgUrl}/{sourceMember}";
    }
}
