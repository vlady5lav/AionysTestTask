using NotesManager.Host.Data.Entities;
using NotesManager.Host.Models.Dtos;

namespace NotesManager.Host.Mapping;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<Note, NoteDto>()
            .ForMember(
            "PictureUrl",
            p => p.MapFrom<NotePictureResolver, string>(n => n.PictureFileName ?? string.Empty));
    }
}
