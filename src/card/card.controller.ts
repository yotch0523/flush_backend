import { Body, Controller, HttpException, HttpStatus, Inject, Post, Req } from '@nestjs/common'
import { ApiResponse } from '@nestjs/swagger'
import { TelemetryClient } from 'applicationinsights'
import { CardService } from '~/card/card.service'
import { CreateCardDto, CreateCardResponseDto, GetCardDto } from './core/dto/card.dto'

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
  async findAll(@Req() request: Request, @Body('itemCount') itemCount: number): Promise<GetCardDto[]> {
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
        this.telemetryClient.trackException({
          exception: new HttpException(
            {
              status: HttpStatus.INTERNAL_SERVER_ERROR,
              error: typeof error,
            },
            HttpStatus.INTERNAL_SERVER_ERROR,
            { cause: error },
          ),
        })
      }
      return []
    }
  }

  @Post('/create')
  @ApiResponse({
    status: 201,
    description: 'Successful operation',
    type: () => CreateCardResponseDto,
  })
  async create(@Req() request: Request, @Body() createDto: CreateCardDto): Promise<CreateCardResponseDto> {
    try {
      const userId = request.headers['x-user-id'] as string
      if (!userId) throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED)
      const id = await this.cardService.create(userId, createDto)
      return { id }
    } catch (error) {
      console.error(error)
      if (error instanceof HttpException) throw error

      const exception = new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'failed to create card',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
        { cause: error },
      )
      this.telemetryClient.trackException({
        exception,
      })
      throw exception
    }
  }
}
