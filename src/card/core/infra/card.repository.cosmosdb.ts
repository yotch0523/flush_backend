import { Container } from '@azure/cosmos'
import { Get, Inject, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/azure-database'
import { ICardRepository } from '~/card/core/entity/card.repository.interface'
import { Card } from '~/card/core/entity/card.entity'

@Injectable()
export class CardRepository implements ICardRepository {
  constructor(
    @Inject(Card)
    private readonly container: Container
  ) {}

  @Get('cards')
  async get(partitionKey: string) {
    const query = 'select * from c'

    const { resources } = await this.container.items.query<Card>(query)
      .fetchAll()
    return resources
  }
}
