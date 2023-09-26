import type { NextFunction, Request, Response } from 'express'
import * as jwt from 'jsonwebtoken'

const authMiddleware = async (
  req: Request & { address: string },
  res: Response,
  next: NextFunction
) => {
  const bearerHeader = req.headers.authorization
  if (bearerHeader == null) {
    return res.status(401).send('Unauthorized')
  }
  try {
    const bearer = bearerHeader.split(' ')
    const token = bearer[1]
    const decode = jwt.verify(token, process.env.JWT_SECRET_KEY ?? '') as {
      address: string
    }

    req.address = decode.address
    next()
  } catch (err) {
    return res.status(401).send('Unauthorized')
  }
}

export default authMiddleware
