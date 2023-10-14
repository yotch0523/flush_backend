import { Injectable } from '@nestjs/common'
import { Card } from '~/card/core/entity/card.entity'

export interface ICardRepository {
  get(userId: string): Promise<Card[]>
}
