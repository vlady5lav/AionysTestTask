namespace Infrastructure.Common.Services;

public abstract class BaseDataService
{
    private readonly ILogger<BaseDataService> _logger;

    protected BaseDataService(ILogger<BaseDataService> logger)
    {
        _logger = logger;
    }

    protected Task ExecuteSafeAsync(Func<Task> action, CancellationToken cancellationToken = default)
    {
        return ExecuteSafeAsync(token => action(), cancellationToken);
    }

    protected Task<TResult> ExecuteSafeAsync<TResult>(Func<Task<TResult>> action, CancellationToken cancellationToken = default)
    {
        return ExecuteSafeAsync(token => action(), cancellationToken);
    }

    private async Task ExecuteSafeAsync(Func<CancellationToken, Task> action, CancellationToken cancellationToken = default)
    {
        try
        {
            await action(cancellationToken);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, $"action failed");

            return;
        }
    }

    private async Task<TResult> ExecuteSafeAsync<TResult>(Func<CancellationToken, Task<TResult>> action, CancellationToken cancellationToken = default)
    {
        try
        {
            var result = await action(cancellationToken);

            return result;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, $"action failed");

            return default!;
        }
    }
}
