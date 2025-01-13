import { Request, Response, NextFunction } from 'express'
import { DefaultAzureCredential } from '@azure/identity'
import jwt from 'jsonwebtoken'
import { getSecret } from '../utils/keyVault'

interface AuthRequest extends Request {
  user?: {
    id: string
    email: string
    roles: string[]
  }
}

export const authenticate = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization
    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    const token = authHeader.split(' ')[1]
    const decodedToken = jwt.verify(token, await getSecret('JWT-PUBLIC-KEY'))
    
    req.user = {
      id: decodedToken.sub as string,
      email: decodedToken.email as string,
      roles: decodedToken.roles as string[]
    }
    
    next()
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' })
  }
} 