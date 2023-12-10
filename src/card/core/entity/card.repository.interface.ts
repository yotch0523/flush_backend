import { GetCardDto } from '~/card/core/dto/card.dto'
import { CardEntity } from '~/card/core/entity/card.entity'

export interface ICardRepository {
  findAll(userId: string, itemCount?: number): Promise<CardEntity[]>
  create(dto: GetCardDto): Promise<string>
}
