import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import type BaseController from './classes/BaseController'

class App {
  public app: express.Application

  constructor (controllers: BaseController[]) {
    this.app = express()
    this.initializeMiddleware()
    this.initializeControllers(controllers)
  }

  private readonly initializeMiddleware = (): void => {
    this.app.use(
      cors({
        origin: (origin, callback) => {
          callback(null, true)
        },
        credentials: true,
        exposedHeaders: ['set-cookie']
      })
    )
    this.app.use(bodyParser.urlencoded({ extended: false }))
    this.app.use(bodyParser.json())
  }

  private readonly initializeControllers = (
    controllers: BaseController[]
  ): void => {
    controllers.forEach(controller => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      this.app.use('/', controller.router!)
    })
  }

  public listen = (): void => {
    const port: number = +(process.env.PORT ?? '8080')
    this.app.listen(port, () => {
      console.log(`App listening on the port ${port}`)
    })
  }
}

export default App
