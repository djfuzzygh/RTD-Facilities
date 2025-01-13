import dotenv from 'dotenv'
import { getSecret } from '../utils/keyVault'

dotenv.config()

interface Config {
  nodeEnv: string
  port: number
  database: {
    host: string
    name: string
    user: string
    password: string
  }
  azure: {
    keyVaultName: string
    storageAccountName: string
    pubsubConnectionString: string
  }
}

const loadConfig = async (): Promise<Config> => {
  return {
    nodeEnv: process.env.NODE_ENV || 'development',
    port: parseInt(process.env.PORT || '3001'),
    database: {
      host: process.env.DB_HOST || '',
      name: process.env.DB_NAME || '',
      user: process.env.DB_USER || '',
      password: await getSecret('DB-PASSWORD')
    },
    azure: {
      keyVaultName: process.env.KEY_VAULT_NAME || '',
      storageAccountName: process.env.STORAGE_ACCOUNT_NAME || '',
      pubsubConnectionString: await getSecret('PUBSUB-CONNECTION-STRING')
    }
  }
}

export default loadConfig 