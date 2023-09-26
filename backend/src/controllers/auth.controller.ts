import { Router, type Request, type Response } from 'express'
import { generateJwtToken } from '../utils/jwt.til'
import BaseController from '../classes/BaseController'

class AuthController extends BaseController {
  public path = '/api/auth'
  public router = Router()

  constructor () {
    super()
    this.initializeRoutes()
  }

  private readonly initializeRoutes = (): void => {
    this.router.post(`${this.path}/signin`, this.signin)
  }

  public signin = (req: Request, res: Response): Response<any, Record<string, any>> => {
    const { address } = req.body

    const token: string = generateJwtToken(address)

    return res.send({
      data: {
        token,
        address
      }
    })
  }
}

export default AuthController
