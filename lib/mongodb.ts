// Kết nối MongoDB database
import { MongoClient, Db } from 'mongodb';

// Khai báo biến global để cache connection
let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

// Interface cho MongoDB connection
interface MongoConnection {
  client: MongoClient;
  db: Db;
}

/**
 * Kết nối tới MongoDB database
 * Sử dụng connection pooling để tối ưu hiệu suất
 */
export async function connectToDatabase(): Promise<MongoConnection> {
  // Kiểm tra nếu đã có connection cached
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  // Lấy MongoDB URI từ environment variable
  const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/shop_account_mmo';

  // Tạo MongoDB client mới
  const client = new MongoClient(MONGODB_URI);

  // Kết nối tới database
  await client.connect();
  
  // Lấy database name từ URI hoặc dùng default
  const dbName = MONGODB_URI.split('/').pop()?.split('?')[0] || 'shop_account_mmo';
  const db = client.db(dbName);

  // Cache connection để tái sử dụng
  cachedClient = client;
  cachedDb = db;

  return { client, db };
}

