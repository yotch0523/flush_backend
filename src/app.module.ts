import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { CardModule } from '~/card/card.module'
import { CosmosClientProvider } from '~/providers/cosmosClient.provider'
import { AppController } from './app.controller'
import { AppService } from './app.service'

@Module({
  imports: [ConfigModule.forRoot(), CardModule],
  controllers: [AppController],
  providers: [AppService, CosmosClientProvider],
  exports: [CosmosClientProvider],
})
export class AppModule {}
