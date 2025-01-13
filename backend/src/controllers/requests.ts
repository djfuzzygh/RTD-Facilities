import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import { RequestService } from '../services/requestService'
import { BlobService } from '../services/blobService'

export const createRequest = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const requestService = new RequestService()
    const blobService = new BlobService()
    
    // Handle file upload if present
    let attachmentUrl = null
    if (req.files?.attachment) {
      const file = req.files.attachment
      attachmentUrl = await blobService.uploadFile(file)
    }

    const request = await requestService.create({
      ...req.body,
      attachmentUrl,
      createdBy: req.user?.id
    })

    res.status(201).json(request)
  } catch (error) {
    res.status(500).json({ message: 'Error creating request', error })
  }
}

export const getRequests = async (req: Request, res: Response) => {
  try {
    const requestService = new RequestService()
    const filters = req.query
    const requests = await requestService.getAll(filters)
    res.json(requests)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching requests', error })
  }
}

export const updateRequest = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const requestService = new RequestService()
    const request = await requestService.update(id, req.body)
    res.json(request)
  } catch (error) {
    res.status(500).json({ message: 'Error updating request', error })
  }
} 