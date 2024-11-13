// services/db.ts
import { drizzle } from 'drizzle-orm/node-postgres'; // 使用 node-postgres 适配器
import { Pool } from 'pg';
import dotenv from 'dotenv';

// 加载环境变量
dotenv.config();
console.log(process.env.POSTGRES_URL);
// 在调用 dotenv.config() 之后添加：
console.log('POSTGRES_URL from .env:', process.env.POSTGRES_URL);

const connectionString = process.env.POSTGRES_URL;

if (!connectionString) {
  throw new Error("POSTGRES_URL is not defined in .env");
}

// 创建一个 pg 连接池
const pool = new Pool({
  connectionString,
});

// 使用 drizzle 连接 pg 的 pool
export const db = drizzle(pool);