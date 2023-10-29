import { Inject, Injectable } from '@nestjs/common'
import { convertToTimeZone } from 'date-fns-timezone'
import { ulid } from 'ulid'
import { ConstantToken } from './card.di.constants'
import { ICreateCardDto } from './core/dto/card.create.dto'
import { ICardDto } from './core/dto/card.dto'
import { ICardRepository } from './core/entity/card.repository.interface'

@Injectable()
export class CardService {
  constructor(
    @Inject(ConstantToken.REPOSITORY)
    private readonly cardRepository: ICardRepository,
  ) {}

  async findAll(userId: string, itemCount: number): Promise<ICardDto[]> {
    const cards = await this.cardRepository.findAll(userId, itemCount)
    return cards.map<ICardDto>((entity) => {
      return {
        id: entity.id,
        userId: entity.userId,
        title: entity.title,
        tags: entity.tags ?? [],
        thumbnail: entity.thumbnail,
        description: entity.description,
        createdAt: entity.createdAt,
        updatedAt: entity.updatedAt,
      }
    })
  }

  async create(createDto: ICreateCardDto): Promise<string | null> {
    const now = convertToTimeZone(new Date(), { timeZone: process.env.TIMEZONE ?? 'Asia/Tokyo' })
    const dto: ICardDto = {
      id: ulid(),
      userId: createDto.userId,
      title: createDto.title,
      tags: [],
      thumbnail: createDto.thumbnail,
      description: createDto.description,
      createdAt: now,
      updatedAt: now,
    }
    return await this.cardRepository.create(dto)
  }
}
