using NotesManager.Host.Configurations;
using NotesManager.Host.Repositories;
using NotesManager.Host.Repositories.Interfaces;
using NotesManager.Host.Services;
using NotesManager.Host.Services.Interfaces;

var configuration = GetConfiguration();

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers(
    options => options
    .Filters
    .Add(typeof(HttpGlobalExceptionFilter)))
    .AddJsonOptions(
    options => options
    .JsonSerializerOptions.WriteIndented = true);

builder.Services.Configure<NotesManagerConfig>(configuration);

builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen();

builder.Services.AddAutoMapper(typeof(Program));

builder.Services.AddTransient<INotesRepository, NotesRepository>();
builder.Services.AddTransient<INotesService, NotesService>();

builder.Services.AddCors(
    options => options
    .AddPolicy(
        "CorsPolicy",
        builder => builder
        .SetIsOriginAllowed((host) => true)
        .AllowAnyMethod()
        .AllowAnyHeader()
        .AllowCredentials()));

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();

app.UseRouting();

app.MapControllers();

app.UseCors("CorsPolicy");

app.UseEndpoints(
    endpoints =>
    {
        endpoints.MapDefaultControllerRoute();
        endpoints.MapControllers();
    });

app.Run();

IConfiguration GetConfiguration()
{
    var builder = new ConfigurationBuilder()
        .SetBasePath(Directory.GetCurrentDirectory())
        .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
        .AddEnvironmentVariables();

    return builder.Build();
}
