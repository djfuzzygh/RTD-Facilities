import { DefaultAzureCredential } from '@azure/identity'
import { SecretClient } from '@azure/keyvault-secrets'

const credential = new DefaultAzureCredential()
const vaultName = process.env.KEY_VAULT_NAME
const url = `https://${vaultName}.vault.azure.net`

const client = new SecretClient(url, credential)

export async function getSecret(secretName: string): Promise<string> {
  try {
    const secret = await client.getSecret(secretName)
    return secret.value || ''
  } catch (error) {
    console.error(`Error fetching secret ${secretName}:`, error)
    throw error
  }
}

export async function setSecret(secretName: string, value: string): Promise<void> {
  try {
    await client.setSecret(secretName, value)
  } catch (error) {
    console.error(`Error setting secret ${secretName}:`, error)
    throw error
  }
} 