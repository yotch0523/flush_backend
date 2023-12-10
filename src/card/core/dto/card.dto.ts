import { PickType } from '@nestjs/swagger'
import { CardEntity } from '~/card/core/entity/card.entity'

export class GetCardDto extends PickType(CardEntity, [
  'id',
  'userId',
  'title',
  'cardCode',
  'question',
  'answer',
  'tags',
  'thumbnail',
  'description',
  'createdAt',
  'updatedAt',
]) {}

export class CreateCardDto extends PickType(CardEntity, [
  'title',
  'cardCode',
  'question',
  'answer',
  'tags',
  'thumbnail',
  'description',
]) {}

export class CreateCardResponseDto extends PickType(CardEntity, ['id']) {}
