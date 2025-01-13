import { BlobServiceClient } from '@azure/storage-blob'
import { DefaultAzureCredential } from '@azure/identity'

export class BlobService {
  private blobServiceClient: BlobServiceClient

  constructor() {
    const credential = new DefaultAzureCredential()
    this.blobServiceClient = new BlobServiceClient(
      `https://${process.env.STORAGE_ACCOUNT_NAME}.blob.core.windows.net`,
      credential
    )
  }

  async uploadFile(file: any): Promise<string> {
    const containerClient = this.blobServiceClient.getContainerClient('requests')
    const blobName = `${Date.now()}-${file.name}`
    const blockBlobClient = containerClient.getBlockBlobClient(blobName)
    
    await blockBlobClient.upload(file.data, file.data.length)
    
    return blockBlobClient.url
  }

  async deleteFile(url: string): Promise<void> {
    const containerClient = this.blobServiceClient.getContainerClient('requests')
    const blobName = url.split('/').pop()
    if (blobName) {
      await containerClient.deleteBlob(blobName)
    }
  }
} 