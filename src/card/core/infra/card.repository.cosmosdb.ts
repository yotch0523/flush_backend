import { Container, CosmosClient, Database } from '@azure/cosmos'
import { Get, Inject, Injectable } from '@nestjs/common'
import { Card } from '~/card/core/entity/card.entity'
import { ICardRepository } from '~/card/core/entity/card.repository.interface'

const containerName = 'cards'

@Injectable()
export class CardRepository implements ICardRepository {
  private database: Database
  private container: Container
  constructor(@Inject('CosmosClient') private readonly client: CosmosClient) {
    this.database = this.client.database(process.env.COSMOS_DB_NAME || '')
    this.container = this.database.container(containerName)
  }

  @Get('cards')
  async get(partitionKey: string): Promise<Card[]> {
    const query = 'select * from c'

    const { resources } = await this.container.items
      .query({
        query: 'select * from c where c.userId=@userId',
        parameters: [
          {
            name: '@userId',
            value: partitionKey,
          },
        ],
      })
      .fetchAll()
    return resources
  }
}
