using System.Net.Sockets;
using Microsoft.Azure.Cosmos;
using Microsoft.Extensions.DependencyInjection;

namespace FlushBackend.Infrastructure;

class Program
{
    static void Main(string[] args)
    {
        var services = new ServiceCollection();
        services.AddSingleton(provider => 
        {
            return new CosmosClient("connectionString", new CosmosClientOptions
            {
                ConnectionMode = ConnectionMode.Direct,
            });
        });
    }
}