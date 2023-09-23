using System.Text.Json.Serialization;

namespace FlushBackend.Infrastructure.Models;

public abstract class AbstractDocument
{
    [JsonPropertyName("id")]
    public string Id { get; set; }

    [JsonPropertyName("created_at")]
    public DateTime CreatedAt { get; set; }

    [JsonPropertyName("updated_at")]
    public DateTime UpdatedAt { get; set; }
    
    [JsonPropertyName("_etag")]
    public string Etag { get; set; }
}