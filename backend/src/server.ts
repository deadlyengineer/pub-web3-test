import 'dotenv/config'
import App from './app'
import ProposalController from './controllers/proposal.controller'
import AuthController from './controllers/auth.controller'

const app = new App([new ProposalController(), new AuthController()])

app.listen()
