using System.Text.Json.Serialization;

namespace FlushBackend.Infrastructure.Models.Card;

public class Card : AbstractDocument
{
    [JsonPropertyName("title")]
    public string Title { get; set; }

    [JsonPropertyName("thumbnail")]
    public string? Thumbnail { get; set; }

    [JsonPropertyName("description")]
    public string? Description { get; set; }
}