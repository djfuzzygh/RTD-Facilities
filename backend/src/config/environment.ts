export const environment = {
  production: process.env.NODE_ENV === 'production',
  azure: {
    b2c: {
      tenant: process.env.AZURE_AD_B2C_TENANT,
      clientId: process.env.AZURE_AD_B2C_CLIENT_ID,
      policy: process.env.AZURE_AD_B2C_POLICY
    },
    storage: {
      accountName: process.env.STORAGE_ACCOUNT_NAME,
      containerName: 'requests'
    },
    keyVault: {
      name: process.env.KEY_VAULT_NAME
    },
    database: {
      server: process.env.DB_SERVER,
      name: process.env.DB_NAME,
      user: process.env.DB_USER
    }
  },
  cors: {
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000'
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: '1d'
  }
} 