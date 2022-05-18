import { exec } from 'child_process';
export class DatabaseHelper {
  async migrateDatabase() {
    return new Promise((resolve) => {
      exec(`dotenv -e .env.test npx prisma migrate deploy`, () => {
        return resolve('done');
      });
    });
  }

  async clearDatabase() {
    return new Promise((resolve) => {
      exec(`dotenv -e .env.test sh ./shell-scripts/reset-db.sh`, () => {
        return resolve('done');
      });
    });
  }
}
