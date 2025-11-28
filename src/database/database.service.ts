import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';


@Injectable()
export class DatabaseService extends PrismaClient implements OnModuleInit {
    constructor(){
        const connectionString:string = process.env.DATABASE_URL as string;
        const pool = new Pool({ connectionString })

        const adapter = new PrismaPg(pool);
        super({adapter});
    }
    onModuleInit() {
        this.$connect()
    }
}
