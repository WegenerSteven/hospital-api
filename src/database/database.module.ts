import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (ConfigService: ConfigService) => ({
        type: 'postgres',
        host: ConfigService.getOrThrow<string>('PG_HOST'),
        port: ConfigService.getOrThrow<number>('PG_PORT'),
        username: ConfigService.getOrThrow<string>('PG_USER'),
        password: ConfigService.getOrThrow<string>('PG_PASSWORD'),
        database: ConfigService.getOrThrow<string>('PG_DATABASE'),
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: ConfigService.getOrThrow<boolean>('PG_SYNC'),
        logging: ConfigService.getOrThrow<boolean>('PG_LOGGING'),
        migrations: [__dirname + '/../migrations/**/*{.ts,.js}'],
        // ssl: true,
        // extra: {
        //   ssl: {
        //     rejectUnauthorized: false,
        //   },
        // },
        autoLoadEntities: true,
        keepConnectionAlive: true,
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [],
  providers: [],
})
export class DatabaseModule {}
