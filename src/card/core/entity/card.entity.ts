import { CosmosDateTime } from '@nestjs/azure-database'
import { ApiProperty } from '@nestjs/swagger'
import { IsArray, IsDate, IsString } from 'class-validator'

export class CardEntity {
  id: string

  userId: string

  @ApiProperty({
    example: 'TypeScript',
    maxLength: 50,
    required: true,
  })
  @IsString()
  title: string

  @ApiProperty({
    example: 'TYPESCRIPT_1',
    maxLength: 50,
    required: true,
  })
  @IsString()
  cardCode: string

  @ApiProperty({
    example: 'question sentences.',
    maxLength: 100,
    required: true,
  })
  @IsString()
  question: string

  @ApiProperty({
    example: 'answer',
    maxLength: 100,
    required: true,
  })
  answer: string

  @ApiProperty({
    example: ['tag1', 'tag2'],
    maxLength: 10,
    required: false,
  })
  @IsArray()
  tags: string[]

  @ApiProperty({
    example: 'https://example.storage.com/path/to/blob',
    maxLength: 1000,
    required: false,
  })
  @IsString()
  thumbnail: string

  @ApiProperty({
    example: 'description.',
    maxLength: 1000,
    required: false,
  })
  @IsString()
  description: string

  @CosmosDateTime()
  @ApiProperty()
  @IsDate()
  createdAt: Date

  @CosmosDateTime()
  @ApiProperty()
  @IsDate()
  updatedAt: Date

  constructor(entity: CardEntity) {
    this.id = entity.id
    this.userId = entity.userId
    this.title = entity.title
    this.cardCode = entity.cardCode
    this.question = entity.question
    this.answer = entity.answer
    this.tags = entity.tags
    this.thumbnail = entity.thumbnail
    this.description = entity.description
    this.createdAt = entity.createdAt
    this.updatedAt = entity.updatedAt
  }
}
