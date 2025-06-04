import { Injectable, Inject } from '@nestjs/common';
import { CreateCachDto } from './dto/create-cach.dto';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';

@Injectable()
export class CachesService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async create(createCachDto: CreateCachDto) {
    const { key, value, ttl } = createCachDto;
    try {
      if (ttl) {
        await this.cacheManager.set(key, value, ttl * 1000);
      } else {
        await this.cacheManager.set(key, value);
      }

      return {
        success: true,
        message: `Cache with key ${key} created successfully`,
        data: {
          key,
          value,
        },
      };
    } catch (error) {
      return {
        success: false,
        message: `Failed to create cache entry: ${JSON.stringify(error)}`,
        data: null,
      };
    }
  }

  async get(key: string) {
    interface CacheResponse {
      key: string;
      value: string;
    }
    try {
      const responseData = await this.cacheManager.get<CacheResponse>(key);

      if (responseData === undefined || responseData === null) {
        return {
          success: false,
          message: `Cache with key ${key} not found`,
          data: null,
        };
      }

      return {
        success: true,
        message: `Cache with key ${key} retrieved successfully`,
        data: {
          key: responseData.key,
          value: responseData.value,
        },
      };
    } catch (error) {
      return {
        success: false,
        message: `Failed to retrieve cache entry: ${JSON.stringify(error)}`,
        data: null,
      };
    }
  }

  async remove(key: string) {
    try {
      await this.cacheManager.del(key);
      return {
        success: true,
        message: `Cache entry with key '${key}' removed successfuly`,
        data: { key },
      };
    } catch (error) {
      return {
        success: false,
        message: `Failed to remove cache entry: ${JSON.stringify(error)}`,
        data: null,
      };
    }
  }
}
