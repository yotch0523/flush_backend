import { Param, Controller, Get } from '@nestjs/common'
import { Card } from '~/card/core/entity/card.entity'
import { CardService } from '~/card/card.service'
import { ICardDto } from './core/dto/card.dto';

@Controller()
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Get(':userId')
  async get(@Param('userId') params): Promise<ICardDto[]> {
    return await this.cardService.get(params.userId);
  }
}
