import { Controller, Get, Param } from '@nestjs/common'
import { CardService } from '~/card/card.service'
import { ICardDto } from './core/dto/card.dto'

type GetParams = {
  userId: string
}

@Controller('cards')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Get(':userId')
  async get(@Param() params: GetParams): Promise<ICardDto[]> {
    return await this.cardService.get(params.userId)
  }
}
