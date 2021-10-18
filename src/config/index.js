import dotenv from 'dotenv';

dotenv.config();
console.log(process.env.MONGO_ATLAS_SRV)
export default {
  MONGO_ATLAS_URL: process.env.MONGO_ATLAS_SRV || 'db',
  PORT: process.env.PORT || 8080,
};
