import type { Response, Router } from 'express'
interface errorObject {
  msg: string
}

class BaseController {
  path: string | undefined
  router: Router | undefined

  successResponse = (
    res: Response,
    data: any,
    msg?: string
  ): Response<any, Record<string, any>> => {
    return res.status(200).send({
      success: true,
      data,
      msg
    })
  }

  errorResponse = (
    errors: errorObject[],
    res: Response
  ): Response<any, Record<string, any>> => {
    return res.status(400).send({
      success: false,
      errors
    })
  }
}

export default BaseController
