import { Inject, Injectable } from '@nestjs/common'
import { convertToTimeZone } from 'date-fns-timezone'
import { ulid } from 'ulid'
import { ConstantToken } from './card.di.constants'
import { CreateCardDto, GetCardDto } from './core/dto/card.dto'
import { ICardRepository } from './core/entity/card.repository.interface'

@Injectable()
export class CardService {
  constructor(
    @Inject(ConstantToken.REPOSITORY)
    private readonly cardRepository: ICardRepository,
  ) {}

  async findAll(userId: string, itemCount: number): Promise<GetCardDto[]> {
    const cards = await this.cardRepository.findAll(userId, itemCount)
    return cards.map<GetCardDto>((entity) => {
      return {
        id: entity.id,
        userId: entity.userId,
        title: entity.title,
        cardCode: entity.cardCode,
        question: entity.question,
        answer: entity.answer,
        tags: entity.tags ?? [],
        thumbnail: entity.thumbnail,
        description: entity.description,
        createdAt: entity.createdAt,
        updatedAt: entity.updatedAt,
      }
    })
  }

  async create(userId: string, createDto: CreateCardDto): Promise<string> {
    const now = convertToTimeZone(new Date(), { timeZone: process.env.TIMEZONE ?? 'Asia/Tokyo' })
    const dto: GetCardDto = {
      id: ulid(),
      userId: userId,
      title: createDto.title,
      cardCode: createDto.cardCode,
      question: createDto.question,
      answer: createDto.answer,
      tags: [],
      thumbnail: createDto.thumbnail,
      description: createDto.description,
      createdAt: now,
      updatedAt: now,
    }
    return await this.cardRepository.create(dto)
  }
}
