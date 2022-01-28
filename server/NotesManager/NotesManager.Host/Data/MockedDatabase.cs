using NotesManager.Host.Data.Entities;

namespace NotesManager.Host.Data;

public static class MockedDatabase
{
    public static List<Note> Notes { get; set; } = new List<Note>()
    {
        new Note() { Id = 1, CreatedAt = new DateTime(2022, 01, 28), UpdatedAt = new DateTime(2022, 01, 28), Title = "Note 1", TypeId = 0, Description = "Description for Note 1", PictureFileName = "1.svg" },
        new Note() { Id = 2, CreatedAt = new DateTime(2022, 01, 28), UpdatedAt = new DateTime(2022, 01, 28), Title = "Note 2", TypeId = 1, Description = "Description for Note 2", PictureFileName = "2.svg" },
        new Note() { Id = 3, CreatedAt = new DateTime(2022, 01, 28), UpdatedAt = new DateTime(2022, 01, 28), Title = "Note 3", TypeId = 2, Description = "Description for Note 3", PictureFileName = "3.svg" },
        new Note() { Id = 4, CreatedAt = new DateTime(2022, 01, 28), UpdatedAt = new DateTime(2022, 01, 28), Title = "Note 4", TypeId = 3, Description = "Description for Note 4", PictureFileName = "4.svg" },
        new Note() { Id = 5, CreatedAt = new DateTime(2022, 01, 28), UpdatedAt = new DateTime(2022, 01, 28), Title = "Note 5", TypeId = 0, Description = "Description for Note 5", PictureFileName = "5.svg" },
        new Note() { Id = 6, CreatedAt = new DateTime(2022, 01, 28), UpdatedAt = new DateTime(2022, 01, 28), Title = "Note 6", TypeId = 1, Description = "Description for Note 6", PictureFileName = "6.svg" },
        new Note() { Id = 7, CreatedAt = new DateTime(2022, 01, 28), UpdatedAt = new DateTime(2022, 01, 28), Title = "Note 7", TypeId = 2, Description = "Description for Note 7", PictureFileName = "7.svg" },
        new Note() { Id = 8, CreatedAt = new DateTime(2022, 01, 28), UpdatedAt = new DateTime(2022, 01, 28), Title = "Note 8", TypeId = 3, Description = "Description for Note 8", PictureFileName = "8.svg" },
        new Note() { Id = 9, CreatedAt = new DateTime(2022, 01, 28), UpdatedAt = new DateTime(2022, 01, 28), Title = "Note 9", TypeId = 0, Description = "Description for Note 9", PictureFileName = "9.svg" },
        new Note() { Id = 10, CreatedAt = new DateTime(2022, 01, 28), UpdatedAt = new DateTime(2022, 01, 28), Title = "Note 10", TypeId = 1, Description = "Description for Note 10", PictureFileName = "10.svg" },
        new Note() { Id = 11, CreatedAt = new DateTime(2022, 01, 28), UpdatedAt = new DateTime(2022, 01, 28), Title = "Note 11", TypeId = 2, Description = "Description for Note 11", PictureFileName = "11.svg" },
        new Note() { Id = 12, CreatedAt = new DateTime(2022, 01, 28), UpdatedAt = new DateTime(2022, 01, 28), Title = "Note 12", TypeId = 3, Description = "Description for Note 12", PictureFileName = "12.svg" },
        new Note() { Id = 13, CreatedAt = new DateTime(2022, 01, 28), UpdatedAt = new DateTime(2022, 01, 28), Title = "Note 13", TypeId = 0, Description = "Description for Note 13", PictureFileName = "13.svg" },
        new Note() { Id = 14, CreatedAt = new DateTime(2022, 01, 28), UpdatedAt = new DateTime(2022, 01, 28), Title = "Note 14", TypeId = 1, Description = "Description for Note 14", PictureFileName = "14.svg" },
        new Note() { Id = 15, CreatedAt = new DateTime(2022, 01, 28), UpdatedAt = new DateTime(2022, 01, 28), Title = "Note 15", TypeId = 2, Description = "Description for Note 15", PictureFileName = "15.svg" },
        new Note() { Id = 16, CreatedAt = new DateTime(2022, 01, 28), UpdatedAt = new DateTime(2022, 01, 28), Title = "Note 16", TypeId = 3, Description = "Description for Note 16", PictureFileName = "16.svg" },
    };
}
