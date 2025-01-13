import { Router } from 'express'
import { isAdmin } from '../middleware/isAdmin'
import { getStats, getRequests, updateRequest, assignRequest } from '../controllers/adminController'

const router = Router()

// Apply admin middleware to all routes
router.use(isAdmin)

router.get('/stats', getStats)
router.get('/requests', getRequests)
router.put('/requests/:id', updateRequest)
router.post('/requests/:id/assign', assignRequest)

export default router 