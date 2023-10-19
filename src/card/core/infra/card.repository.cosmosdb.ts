import { Container, CosmosClient, Database } from '@azure/cosmos'
import { Inject, Injectable } from '@nestjs/common'
import { Card } from '~/card/core/entity/card.entity'
import { ICardRepository } from '~/card/core/entity/card.repository.interface'
import { ICardDto } from '../dto/card.dto'

const containerName = 'cards'

@Injectable()
export class CardRepository implements ICardRepository {
  private database: Database
  private container: Container
  constructor(@Inject('CosmosClient') private readonly client: CosmosClient) {
    this.database = this.client.database(process.env.COSMOS_DB_NAME || '')
    this.container = this.database.container(containerName)
  }

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

  async create(dto: ICardDto): Promise<string | null> {
    const entity = new Card(dto)
    const { resource } = await this.container.items.create(dto)

    return resource?.id ?? null
  }
}
