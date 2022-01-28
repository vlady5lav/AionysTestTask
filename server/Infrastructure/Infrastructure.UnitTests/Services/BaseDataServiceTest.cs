using Infrastructure.UnitTests.Mocks;

namespace Infrastructure.UnitTests.Services;

public class BaseDataServiceTest
{
    private readonly Mock<ILogger<MockService>> _logger;

    private readonly MockService _mockService;

    public BaseDataServiceTest()
    {
        _logger = new Mock<ILogger<MockService>>();
        _mockService = new MockService(_logger.Object);
    }

    [Fact]
    public async Task ExecuteSafeAsync_Failed()
    {
        // arrange

        // act
        await _mockService.RunWithException();

        // assert
        _logger.Verify(
            x => x.Log(
                LogLevel.Error,
                It.IsAny<EventId>(),
                It.Is<It.IsAnyType>(
                    (o, t) => o.ToString()!
                    .Contains($"action failed")),
                It.IsAny<Exception>(),
                It.IsAny<Func<It.IsAnyType, Exception, string>>()!),
            Times.Once);
    }

    [Fact]
    public async Task ExecuteSafeAsync_Success()
    {
        // arrange

        // act
        await _mockService.RunWithoutException();

        // assert
        _logger.Verify(
            x => x.Log(
                LogLevel.Error,
                It.IsAny<EventId>(),
                It.Is<It.IsAnyType>(
                    (o, t) => o.ToString()!
                    .Contains($"action failed")),
                It.IsAny<Exception>(),
                It.IsAny<Func<It.IsAnyType, Exception, string>>()!),
            Times.Never);
    }
}
