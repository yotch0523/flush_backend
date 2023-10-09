import { Inject, Injectable } from '@nestjs/common'
import { Card } from '~/card/core/entity/card.entity'
import { ICardRepository } from './core/entity/card.repository.interface'
import { ICardDto } from './core/dto/card.dto'
import { ConstantToken } from './card.di.constants'

@Injectable()
export class CardService {
  constructor(
    @Inject(ConstantToken.REPOSITORY)
    private readonly cardRepository: ICardRepository
  ) {}

  async get(userId: string): Promise<ICardDto[]> {
    const cards = await this.cardRepository.get(userId)
    return cards.map<ICardDto>((entity) => {
      return {
        id: entity.id,
        userId: entity.userId,
        title: entity.title,
        thumbnail: entity.thumbnail,
        description: entity.description,
        createdAt: entity.createdAt,
        updatedAt: entity.updatedAt,
      }
    })
  }
}
