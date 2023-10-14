import { CosmosDateTime } from '@nestjs/azure-database'

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
}
