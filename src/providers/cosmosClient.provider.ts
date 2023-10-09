import { DefaultAzureCredential } from '@azure/identity'
import { CosmosClient } from '@azure/cosmos'
import { Provider } from '@nestjs/common'

export const CosmosClientFactory: Provider = {
  provide: 'CosmosClient',
  useFactory: () => {
    return new CosmosClient({
      endpoint: process.env.COSMOSDB_ENDPOINT ?? '',
      aadCredentials: new DefaultAzureCredential()
    })
  }
}
