using FlushBackend.Infrastructure.Models.Card;

namespace FlushBackend.Repositories.Interfaces;

public interface ICardRepository
{
    public Task<Card> ReadItemAsync(id string, partitionKey string)
}