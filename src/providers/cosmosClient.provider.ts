import { CosmosClient } from '@azure/cosmos'
import { DefaultAzureCredential } from '@azure/identity'
import { Provider } from '@nestjs/common'

export const CosmosClientProvider: Provider = {
  provide: 'CosmosClient',
  useFactory: () => {
    try {
      const credential = new DefaultAzureCredential()
      return new CosmosClient({
        endpoint: process.env.COSMOS_DB_ENDPOINT || '',
        aadCredentials: credential,
      })
    } catch (error) {
      console.error(error)
    }
  },
}
