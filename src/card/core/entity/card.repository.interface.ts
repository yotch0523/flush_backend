import { ICardDto } from '~/card/core/dto/card.dto'
import { Card } from '~/card/core/entity/card.entity'

export interface ICardRepository {
  get(userId: string): Promise<Card[]>
  create(dto: ICardDto): Promise<string | null>
}
