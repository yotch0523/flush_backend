import { Module } from '@nestjs/common'
import { AzureCosmosDbModule } from '@nestjs/azure-database'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule } from '@nestjs/config'

console.info('process.env.COSMOS_DB_NAME :', process.env.COSMOS_DB_NAME)
console.info('process.env.COSMOS_DB_ENDPOINT :', process.env.COSMOS_DB_ENDPOINT)
console.info('process.env.COSMOS_DB_KEY :', process.env.COSMOS_DB_KEY)
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
    }),
    AzureCosmosDbModule.forRoot({
      dbName: process.env.COSMOS_DB_NAME ?? '',
      endpoint: process.env.COSMOS_DB_ENDPOINT ?? '',
      key: process.env.COSMOS_DB_KEY,
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
  ],
})
export class AppModule {}
