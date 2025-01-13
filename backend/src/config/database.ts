import { ConnectionPool } from 'mssql'
import { DefaultAzureCredential } from '@azure/identity'

const credential = new DefaultAzureCredential()

const config = {
  server: process.env.DB_SERVER || '',
  database: process.env.DB_NAME || '',
  authentication: {
    type: 'azure-active-directory-default',
    options: {
      credential
    }
  },
  options: {
    encrypt: true
  }
}

export const pool = new ConnectionPool(config)
