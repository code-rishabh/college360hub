// Database Switcher Utility
// This allows you to easily switch between different database types

import { DatabaseManager as SQLiteManager } from './database'
import { DatabaseManager as VercelPostgresManager } from './database-postgres'
import { DatabaseManager as LocalPostgresManager } from './database-local-postgres'

export type DatabaseType = 'sqlite' | 'vercel-postgres' | 'local-postgres'

export function getDatabaseManager(type: DatabaseType = 'sqlite') {
  switch (type) {
    case 'sqlite':
      console.log('🗄️ Using SQLite database (local development)')
      return new SQLiteManager()
    
    case 'vercel-postgres':
      console.log('☁️ Using Vercel Postgres database (production)')
      return new VercelPostgresManager()
    
    case 'local-postgres':
      console.log('🏠 Using Local Postgres database (testing)')
      return new LocalPostgresManager()
    
    default:
      console.log('🗄️ Defaulting to SQLite database')
      return new SQLiteManager()
  }
}

// Environment-based database selection
export function getDatabaseManagerFromEnv() {
  const dbType = process.env.DATABASE_TYPE || 'sqlite'
  
  if (dbType === 'postgres' && process.env.POSTGRES_URL) {
    return getDatabaseManager('vercel-postgres')
  }
  
  if (dbType === 'local-postgres' && process.env.POSTGRES_HOST) {
    return getDatabaseManager('local-postgres')
  }
  
  return getDatabaseManager('sqlite')
}
