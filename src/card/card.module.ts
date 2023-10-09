import { AzureCosmosDbModule } from '@nestjs/azure-database'
import { Module } from '@nestjs/common';
import { CardController } from '~/card/card.controller';
import { Card } from '~/card/core/entity/card.entity'
import { CardService } from '~/card/card.service';
import { AppModule } from '~/app.module';
import { ConstantToken } from '~/card/card.di.constants'
import { CardRepository } from './core/infra/card.repository.cosmosdb';

@Module({
  imports: [
    AppModule,
    AzureCosmosDbModule.forFeature([{ dto: Card }]),
  ],
  controllers: [CardController],
  providers: [
    CardService,
    {
      provide: ConstantToken.REPOSITORY,
      useClass: CardRepository,
    }
  ],
})
export class CardModule {}
