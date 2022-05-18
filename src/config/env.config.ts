export const configuration = () => ({
  APP_PORT: process.env.APP_PORT || 3000,
  DATABASE_URL: process.env.DATABSE_URL,
  DB_USER: process.env.DB_USER,
  JWT: {
    SECRET: process.env.JWT_SECRET,
    EXPIRE: process.env.JWT_EXPIRE || '7d',
    REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
    REFRESH_EXPIRE: process.env.JWT_REFRESH_EXPIRE || '7d',
  },
});
