import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ContentUserModule } from './modules/content-user/content-user.module';
import { LoggerMiddleware } from './middlewares/logger';
import { RedisModule } from './modules/redis/redis.module';
import { settings } from './utilities/constant';

@Module({
  imports: [
    MongooseModule.forRoot(`mongodb+srv://${settings.DB.USER}:${settings.DB.PASSWORD}@my-cluster.yw89x0n.mongodb.net/`), // Replace with your MongoDB connection string
    ContentUserModule,
    RedisModule,
  ],
  controllers: [AppController],
  providers: [AppService,LoggerMiddleware],
})
export class AppModule {
  configure(consumer:MiddlewareConsumer){
    consumer.apply(LoggerMiddleware).forRoutes('*')
  }
}
