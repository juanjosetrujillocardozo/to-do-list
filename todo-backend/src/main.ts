import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cors({ origin: 'https://frontend.vercel.app' })); // URL de frontend en Vercel
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
