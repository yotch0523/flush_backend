import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import * as appInsights from 'applicationinsights'
import * as bodyParser from 'body-parser'
import helmet from 'helmet'
import { AppModule } from './app.module'

async function bootstrap() {
  appInsights.setup(process.env.APPLICATIONINSIGHTS_CONNECTION_STRING).start()
  // appInsights.defaultClient.config.samplingPercentage = 33
  appInsights.defaultClient.context.tags[appInsights.defaultClient.context.keys.cloudRole] = 'flush-api'

  const app = await NestFactory.create(AppModule)
  app.enableCors({
    origin: process.env.ALLOW_ORIGINS?.split(','),
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  })

  // app.useGlobalInterceptors(new RequestInterceptor()) OFF
  app.use(helmet())
  app.use(bodyParser.json({ limit: '50mb' }))
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))

  const config = new DocumentBuilder()
    .setTitle('My Swagger')
    .setDescription('The flush API description')
    .setVersion('1.0')
    .addTag('flush')
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

  const port = process.env.PORT || 3000
  await app.listen(port)
}
void bootstrap()
