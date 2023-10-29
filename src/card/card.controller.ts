import { Body, Controller, HttpException, HttpStatus, Post, Req } from '@nestjs/common'
import { CardService } from '~/card/card.service'
import { ICreateCardDto } from './core/dto/card.create.dto'
import { ICardDto } from './core/dto/card.dto'

@Controller('cards')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Post('/')
  async findAll(@Req() request: Request, @Body('itemCount') itemCount: number): Promise<ICardDto[]> {
    const userId = request.headers['x-user-id'] as string
    return await this.cardService.findAll(userId, itemCount)
  }

  @Post('/create')
  async create(@Body() createDto: ICreateCardDto): Promise<string | null> {
    if (!createDto.userId) throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED)
    return await this.cardService.create(createDto)
  }
}
