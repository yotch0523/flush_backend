import { CosmosClient } from '@azure/cosmos'
import { Provider } from '@nestjs/common'

export const CosmosClientProvider: Provider = {
  provide: 'CosmosClient',
  useFactory: () => {
    try {
      return new CosmosClient({
        endpoint: process.env.COSMOS_DB_ENDPOINT || '',
        key: process.env.COSMOS_DB_KEY,
      })
    } catch (error) {
      console.error(error)
    }
  },
}
