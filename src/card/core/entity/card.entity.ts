import { CosmosPartitionKey, CosmosDateTime } from '@nestjs/azure-database'

@CosmosPartitionKey('userId')
export class Card {
  id: string
  userId: string
  title: string
  thumbnail: string
  description: string
  @CosmosDateTime()
  createdAt: Date
  @CosmosDateTime()
  updatedAt: Date
}
