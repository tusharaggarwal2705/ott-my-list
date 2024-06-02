import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService {
  private client: Redis;

  constructor() {
    const host = process.env.REDIS_HOST;
    const port = parseInt(process.env.REDIS_PORT);
    const password = process.env.REDIS_PASSWORD;
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
