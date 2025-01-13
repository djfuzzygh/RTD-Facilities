import { Router } from 'express'
import { body } from 'express-validator'
import { authenticate } from '../middleware/auth'
import { createRequest, getRequests, updateRequest } from '../controllers/requestController'

const router = Router()

router.use(authenticate)

router.get('/', getRequests)

router.post('/',
  [
    body('category').isIn(['Vehicle', 'Flight', 'Maintenance', 'General']),
    body('description').notEmpty(),
    body('priority').isIn(['Low', 'Medium', 'High']),
    body('contactPerson').notEmpty()
  ],
  createRequest
)

router.put('/:id', updateRequest)

export = router 