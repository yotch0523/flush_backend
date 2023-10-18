import { Body, Controller, Get, HttpException, HttpStatus, Param, Post } from '@nestjs/common'
import { CardService } from '~/card/card.service'
import { ICreateCardDto } from './core/dto/card.create.dto'
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

  @Post()
  async create(@Body() createDto: ICreateCardDto): Promise<string | null> {
    if (!createDto.userId) throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED)
    return await this.cardService.create(createDto)
  }
}
