import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import { settings } from 'src/utilities/constant';

@Injectable()
export class RedisService {
  private client: Redis;

  constructor() {
    const host = settings.REDIS.HOST;
    const port = settings.REDIS.PORT;
    const password = settings.REDIS.PASSWORD;
    this.client = new Redis({
      host,
      port,
      password,
    });
  }

  getClient(): Redis {
    return this.client;
  }

  set(key: string, value: string) {
    this.client.set(key, value);
  }

  get(key: string) {
    return this.client.get(key);
  }
}
