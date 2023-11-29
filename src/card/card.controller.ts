import { Body, Controller, HttpException, HttpStatus, Inject, Post, Req } from '@nestjs/common'
import { ApiResponse } from '@nestjs/swagger'
import { TelemetryClient } from 'applicationinsights'
import { CardService } from '~/card/card.service'
import { ICreateCardDto } from './core/dto/card.create.dto'
import { ICardDto } from './core/dto/card.dto'

@Controller('cards')
export class CardController {
  constructor(
    private readonly cardService: CardService,
    @Inject('TelemetryClient') private readonly telemetryClient: TelemetryClient,
  ) {}

  @Post('/')
  @ApiResponse({
    status: 200,
    description: 'got cards successfully',
  })
  async findAll(@Req() request: Request, @Body('itemCount') itemCount: number): Promise<ICardDto[]> {
    try {
      const userId = request.headers['x-user-id'] as string
      const cards = await this.cardService.findAll(userId, itemCount)
      this.telemetryClient.trackEvent({
        name: `cards from cosmosdb id: ${userId}`,
        measurements: {
          cards: cards.length,
        },
      })
      return cards
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message)
        this.telemetryClient.trackException({
          exception: new HttpException(
            {
              status: HttpStatus.INTERNAL_SERVER_ERROR,
              error: error.message,
            },
            HttpStatus.INTERNAL_SERVER_ERROR,
            { cause: error },
          ),
        })
      } else {
        console.error(error)
      }
      return []
    }
  }

  @Post('/create')
  async create(@Body() createDto: ICreateCardDto): Promise<string | null> {
    try {
      if (!createDto.userId) throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED)
      return await this.cardService.create(createDto)
    } catch (error) {
      this.telemetryClient.trackException({
        exception: new HttpException(
          {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            error: 'failed to create card',
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
          { cause: error },
        ),
      })
      return null
    }
  }
}
