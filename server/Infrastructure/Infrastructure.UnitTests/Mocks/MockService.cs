namespace Infrastructure.UnitTests.Mocks;

public class MockService : BaseDataService
{
    public MockService(ILogger<MockService> logger)
        : base(logger)
    {
    }

    public async Task RunWithException()
    {
        await ExecuteSafeAsync<bool>(() => throw new Exception());
    }

    public async Task RunWithoutException()
    {
        await ExecuteSafeAsync<bool>(() => Task.FromResult(true));
    }
}
