import { Request, Response } from 'express'
import { RequestService } from '../services/requestService'
import { NotificationService } from '../services/notificationService'

export const getStats = async (req: Request, res: Response) => {
  try {
    const requestService = new RequestService()
    
    const [
      totalRequests,
      pendingRequests,
      completedRequests,
      requestsByCategory,
      requestsByStatus
    ] = await Promise.all([
      requestService.count(),
      requestService.count({ status: 'pending' }),
      requestService.count({ status: 'completed' }),
      requestService.getRequestsByCategory(),
      requestService.getRequestsByStatus()
    ])

    res.json({
      totalRequests,
      pendingRequests,
      completedRequests,
      requestsByCategory,
      requestsByStatus
    })
  } catch (error) {
    res.status(500).json({ message: 'Error fetching stats', error })
  }
}

export const getRequests = async (req: Request, res: Response) => {
  try {
    const requestService = new RequestService()
    const requests = await requestService.getAllWithDetails()
    res.json(requests)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching requests', error })
  }
}

export const updateRequest = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const requestService = new RequestService()
    const notificationService = new NotificationService()
    
    const request = await requestService.update(id, req.body)
    
    // Notify relevant users
    await notificationService.notifyRequestUpdate(request)
    
    res.json(request)
  } catch (error) {
    res.status(500).json({ message: 'Error updating request', error })
  }
}

export const assignRequest = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { userId } = req.body
    
    const requestService = new RequestService()
    const notificationService = new NotificationService()
    
    const request = await requestService.assign(id, userId)
    
    // Notify assigned user
    await notificationService.notifyAssignment(request)
    
    res.json(request)
  } catch (error) {
    res.status(500).json({ message: 'Error assigning request', error })
  }
} 