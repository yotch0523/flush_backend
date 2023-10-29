import { CosmosDateTime } from '@nestjs/azure-database'
import { ICardDto } from '~/card/core/dto/card.dto'

export class Card {
  id: string
  userId: string
  title: string
  tags: string[]
  thumbnail: string
  description: string
  @CosmosDateTime()
  createdAt: Date
  @CosmosDateTime()
  updatedAt: Date

  constructor(dto: ICardDto) {
    this.id = dto.id
    this.userId = dto.userId
    this.title = dto.title
    this.tags = []
    this.thumbnail = dto.thumbnail
    this.description = dto.description
    this.createdAt = dto.createdAt
    this.updatedAt = dto.updatedAt
  }
}
