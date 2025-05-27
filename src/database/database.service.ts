import { Injectable } from '@nestjs/common';
import { Pool, PoolConfig, QueryResult } from 'pg';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DatabaseService {
  private pool: Pool;
  constructor(private configService: ConfigService) {
    const poolconfig: PoolConfig = {
      host: this.configService.get<string>('PG_HOST'),
      port: parseInt(this.configService.get<string>('PG_PORT', '5432'), 10),
      user: this.configService.get<string>('PG_USER'),
      password: this.configService.get<string>('PG_PASSWORD'),
      database: this.configService.get<string>('PG_DATABASE'),
      max: 20, // maximum number of clients in the pool
      idleTimeoutMillis: 30000, // close idle clients after 30 seconds
      connectionTimeoutMillis: 5000, // return an error after 5 seconds if connection could not be established
    };

    this.pool = new Pool(poolconfig);

    this.pool.on('connect', () => {
      console.log('Connected to the database');
    });
    this.pool.on('error', (err: Error) => {
      console.error('Database connection error', err);
      process.exit(-1); // Exit the process with failure
    });
  }

  //methiod to execute a query
  public async executeQuery<T extends import('pg').QueryResultRow>(
    text: string,
    params: any[] = [],
  ): Promise<QueryResult<T>> {
    const client = await this.pool.connect();
    try {
      const result = await client.query<T>(text, params);
      return result;
    } catch (error) {
      console.error('Query execution error:', error);
      throw error; // Re-throw the error for handling in the calling code
    } finally {
      client.release();
    }
  }

  //initialize database
  public async initializeDatabase(): Promise<void> {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS Admin (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        email VARCHAR(100) NOT NULL UNIQUE,
        role VARCHAR(20) NOT NULL CHECK (role IN ('admin', 'superadmin', 'moderator')),
        is_active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    try {
      await this.executeQuery(createTableQuery);
      console.log('Database initialized successfully');
    } catch (error) {
      console.log(
        'PG_PASSWORD:',
        this.configService.get<string>('PG_PASSWORD'),
        typeof this.configService.get<string>('PG_PASSWORD'),
      );
      console.error('Error initializing database:', error);
      throw error; // Re-throw the error for handling in the calling code
    }
  }
}

//singleton instance
export const databaseService = new DatabaseService(new ConfigService());
void databaseService.initializeDatabase();
export const executeQuery = (
  text: string,
  params: any[] = [],
): Promise<QueryResult<any>> => databaseService.executeQuery(text, params);
