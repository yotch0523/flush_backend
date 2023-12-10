import { Container, CosmosClient, Database } from '@azure/cosmos'
import { Inject, Injectable } from '@nestjs/common'
import { GetCardDto } from '~/card/core/dto/card.dto'
import { CardEntity } from '~/card/core/entity/card.entity'
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

  async findAll(partitionKey: string, itemCount: number = 20): Promise<CardEntity[]> {
    const { resources } = await this.container.items
      .query<CardEntity>(
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

  async create(dto: GetCardDto): Promise<string> {
    const entity = new CardEntity(dto)
    const { resource } = await this.container.items.create(entity)

    if (!resource?.id) throw new Error('failed to create document')

    return resource?.id
  }
}
