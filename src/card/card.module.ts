import { forwardRef, Module } from '@nestjs/common'
import { AppModule } from '~/app.module'
import { CardController } from '~/card/card.controller'
import { ConstantToken } from '~/card/card.di.constants'
import { CardService } from '~/card/card.service'
import { CardRepository } from './core/infra/card.repository.cosmosdb'

@Module({
  imports: [forwardRef(() => AppModule)],
  controllers: [CardController],
  providers: [
    CardService,
    {
      provide: ConstantToken.REPOSITORY,
      useClass: CardRepository,
    },
  ],
})
export class CardModule {}
