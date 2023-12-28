import { Body, Controller, HttpException, HttpStatus, Post, Req } from '@nestjs/common'
import { ApiResponse } from '@nestjs/swagger'
import { CardService } from '~/card/card.service'
import { CreateCardDto, CreateCardResponseDto, GetCardDto } from './core/dto/card.dto'

@Controller('cards')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Post('/')
  @ApiResponse({
    status: 200,
    description: 'got cards successfully',
  })
  async findAll(@Req() request: Request, @Body('itemCount') itemCount: number): Promise<GetCardDto[]> {
    const userId = request.headers['x-user-id'] as string
    const cards = await this.cardService.findAll(userId, itemCount)
    return cards
  }

  @Post('/create')
  @ApiResponse({
    status: 201,
    description: 'Successful operation',
    type: () => CreateCardResponseDto,
  })
  async create(@Req() request: Request, @Body() createDto: CreateCardDto): Promise<CreateCardResponseDto> {
    const userId = request.headers['x-user-id'] as string
    if (!userId) throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED)
    const id = await this.cardService.create(userId, createDto)
    return { id }
  }
}
