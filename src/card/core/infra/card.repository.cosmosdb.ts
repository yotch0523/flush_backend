import { Container, CosmosClient, Database } from '@azure/cosmos'
import { Inject, Injectable } from '@nestjs/common'
import { ICardDto } from '~/card/core/dto/card.dto'
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

  async findAll(partitionKey: string, itemCount: number = 20): Promise<Card[]> {
    const { resources } = await this.container.items
      .query<Card>(
        {
          query: 'select * from c where c.userId=@userId',
          parameters: [
            {
              name: '@userId',
              value: partitionKey,
            },
          ],
        },
        {
          maxItemCount: itemCount,
        },
      )
      .fetchAll()
    return resources
  }

  async create(dto: ICardDto): Promise<string | null> {
    const entity = new Card(dto)
    const { resource } = await this.container.items.create(entity)

    return resource?.id ?? null
  }
}
