using FlushBackend.Infrastructure.Models;
using Microsoft.Azure.Cosmos;
using System.Net;

namespace FlushBackend.Infrastructure.Repositories;

public abstract class AbstractRepository<TDocument> where TDocument : AbstractDocument
{
    protected AbstractRepository(CosmosClient client, string databaseId, string containerId)
    {
        _databaseId = databaseId;
        _containerId = containerId;
        _client = client;
    }

    protected string _databaseId { get; }
    protected string _containerId { get; }
    protected CosmosClient _client { get; }

    public Container GetContainer()
    {
        return _client.GetContainer(_databaseId, _containerId);
    }

    public async Task CreateAsync(TDocument document)
    {
        document.CreatedAt = GetNow();
        var container = GetContainer();
        var response = await container.CreateItemAsync(document);

        document.Id = response.Resource.Id;
    }

    public async Task<TDocument> GetAsync(string id, string partitionKey)
    {
        try
        {
            var container = GetContainer();
            var response = await container.ReadItemAsync<TDocument>(id: id, partitionKey: new PartitionKey(partitionKey));
            return response.Resource;
        }
        catch (CosmosException exception) when (exception.StatusCode == HttpStatusCode.NotFound)
        {
            return default;
        }
    }

    public async Task UpdateAsync(TDocument document)
    {
        try
        {
            document.UpdatedAt = GetNow();
            var container = GetContainer();

            var requestOptions = new ItemRequestOptions
            {
                IfMatchEtag = document.Etag,
            };
            var response = await container.UpsertItemAsync(document, requestOptions: requestOptions);
        }
        catch (CosmosException exception) when (exception.StatusCode == HttpStatusCode.PreconditionFailed)
        {
            // TODO implement optimistic concurrency handler
            throw;
        }
    }

    private DateTime GetNow()
    {
        return DateTime.UtcNow;
    }
}